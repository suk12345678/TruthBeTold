import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { getUserId } from '../lib/userId';
import { calculateScore } from '../lib/scoring';
import { COLORS, SPACING, PERSONAS } from '../constants/designTokens';
import { getMarketRentForZip } from '../lib/zipCodeLookup';
import { getCachedFMR, setCachedFMR } from '../lib/fmrCache';

export default function InputScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('empath');
  const [fetchingMarketRent, setFetchingMarketRent] = useState(false);
  const [marketRentSource, setMarketRentSource] = useState<'auto' | 'manual' | null>(null);
  const zipDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('InputScreen mounted - Home page loaded successfully');
  }, []);

  const [formData, setFormData] = useState({
    rent: '',
    income: '',
    market_rent: '',
    unit_quality: '',
    zip_code: '',
  });

  // Auto-fetch market rent when zip code is entered
  useEffect(() => {
    // Clear previous debounce
    if (zipDebounceRef.current) {
      clearTimeout(zipDebounceRef.current);
    }

    const zipCode = formData.zip_code.trim();

    // Only fetch if:
    // 1. Zip code is 5 digits
    // 2. Market rent is empty OR was previously auto-filled (not manually edited)
    // 3. Not currently fetching
    if (zipCode.length === 5 &&
        (!formData.market_rent || marketRentSource === 'auto') &&
        !fetchingMarketRent) {
      zipDebounceRef.current = setTimeout(async () => {
        await fetchMarketRent(zipCode);
      }, 800); // Wait 800ms after user stops typing
    }

    return () => {
      if (zipDebounceRef.current) {
        clearTimeout(zipDebounceRef.current);
      }
    };
  }, [formData.zip_code, marketRentSource, fetchingMarketRent]);

  const fetchMarketRent = async (zipCode: string) => {
    // Don't fetch if user has manually edited the market rent
    if (marketRentSource === 'manual') {
      return;
    }

    setFetchingMarketRent(true);
    setError('');

    try {
      // Check cache first
      const cachedRent = await getCachedFMR(zipCode);
      if (cachedRent) {
        setFormData(prev => ({ ...prev, market_rent: Math.round(cachedRent).toString() }));
        setMarketRentSource('auto');
        setFetchingMarketRent(false);
        return;
      }

      // Fetch from API
      const result = await getMarketRentForZip(zipCode);

      if (result.marketRent && result.location) {
        const marketRent = Math.round(result.marketRent);
        setFormData(prev => ({ ...prev, market_rent: marketRent.toString() }));
        setMarketRentSource('auto');

        // Cache the result
        if (result.location.stateCode) {
          await setCachedFMR(zipCode, marketRent, result.location.stateCode);
        }
      } else {
        // If API fails, don't show error - user can still enter manually
        console.warn('Could not fetch market rent for zip code:', zipCode);
      }
    } catch (err) {
      console.error('Error fetching market rent:', err);
      // Don't show error to user - they can enter manually
    } finally {
      setFetchingMarketRent(false);
    }
  };

  // Dev helper: prepopulate with test data
  const fillTestData = (scenario: 'fair' | 'borderline' | 'overpriced' | 'predatory') => {
    const testData = {
      fair: {
        rent: '1800',
        income: '6000',
        market_rent: '1900',
        unit_quality: '8',
        zip_code: '90210',
      },
      borderline: {
        rent: '2200',
        income: '6000',
        market_rent: '2000',
        unit_quality: '6',
        zip_code: '90210',
      },
      overpriced: {
        rent: '2800',
        income: '6000',
        market_rent: '2000',
        unit_quality: '5',
        zip_code: '90210',
      },
      predatory: {
        rent: '3500',
        income: '6000',
        market_rent: '2000',
        unit_quality: '3',
        zip_code: '90210',
      },
    };
    setFormData(testData[scenario]);
    setError('');
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    return (
      formData.rent.trim() !== '' &&
      formData.income.trim() !== '' &&
      formData.market_rent.trim() !== '' &&
      formData.unit_quality.trim() !== '' &&
      formData.zip_code.trim() !== ''
    );
  };

  const validateForm = () => {
    // Trim whitespace from all fields
    const trimmedData = {
      rent: formData.rent.trim(),
      income: formData.income.trim(),
      market_rent: formData.market_rent.trim(),
      unit_quality: formData.unit_quality.trim(),
      zip_code: formData.zip_code.trim(),
    };

    if (!trimmedData.rent || !trimmedData.income || !trimmedData.market_rent || !trimmedData.unit_quality || !trimmedData.zip_code) {
      setError('All fields are required');
      return false;
    }

    const quality = parseInt(trimmedData.unit_quality);
    if (isNaN(quality) || quality < 0 || quality > 10) {
      setError('Unit quality must be between 0 and 10');
      return false;
    }

    setError('');
    return true;
  };

  const handleCalculate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Get or create anonymous user ID
      const userId = await getUserId();
      console.log('User ID:', userId);

      const scoreInput = {
        rent: parseFloat(formData.rent),
        income: parseFloat(formData.income),
        market_rent: parseFloat(formData.market_rent),
        unit_quality: parseInt(formData.unit_quality),
      };

      let scoreResult;

      // Try to call the Supabase Edge Function first
      try {
        console.log('Calling Supabase score function with:', scoreInput);

        const { data, error: functionError } = await supabase.functions.invoke('score', {
          body: scoreInput
        });

        if (functionError) {
          console.warn('Edge Function error, falling back to local calculation:', functionError);
          throw functionError;
        }

        console.log('Edge Function response:', data);
        scoreResult = data;
      } catch (functionError) {
        // Fallback to local calculation if Edge Function fails
        console.log('Using local scoring calculation as fallback');
        scoreResult = calculateScore(scoreInput);
        console.log('Local calculation result:', scoreResult);
      }

      // Save to database with user_id
      const { data: rentInput, error: dbError } = await supabase
        .from('rent_inputs')
        .insert({
          rent: parseFloat(formData.rent),
          income: parseFloat(formData.income),
          market_rent: parseFloat(formData.market_rent),
          unit_quality: parseInt(formData.unit_quality),
          zip_code: formData.zip_code,
          user_id: userId,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Save score with persona and user_id for analytics
      await supabase.from('scores').insert({
        rent_input_id: rentInput.id,
        score: scoreResult.score,
        verdict: scoreResult.verdict,
        persona: selectedPersona,
        user_id: userId,
      });

      // Navigate to score screen
      router.push({
        pathname: '/score',
        params: {
          score: scoreResult.score,
          verdict: scoreResult.verdict,
          rent: formData.rent,
          income: formData.income,
          market_rent: formData.market_rent,
          unit_quality: formData.unit_quality,
          zip_code: formData.zip_code,
          persona: selectedPersona,
        },
      });
    } catch (err: any) {
      console.error('Error calculating score:', err);
      setError(err.message || 'Failed to calculate score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerArea}>
          <Text style={styles.appName}>TruthBeTold</Text>
          <Text style={styles.appSubtitle}>
            See if this rent truly respects your budget.
          </Text>
        </View>

        {/* Dev Tools - Quick Fill Buttons */}
        <View style={styles.devTools}>
          <Text style={styles.devLabel}>🛠️ Dev Quick Fill:</Text>
          <View style={styles.devButtons}>
            <TouchableOpacity
              style={[styles.devButton, styles.devButtonFair]}
              onPress={() => fillTestData('fair')}
            >
              <Text style={styles.devButtonText}>Fair</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.devButton, styles.devButtonBorderline]}
              onPress={() => fillTestData('borderline')}
            >
              <Text style={styles.devButtonText}>Borderline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.devButton, styles.devButtonOverpriced]}
              onPress={() => fillTestData('overpriced')}
            >
              <Text style={styles.devButtonText}>Overpriced</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.devButton, styles.devButtonPredatory]}
              onPress={() => fillTestData('predatory')}
            >
              <Text style={styles.devButtonText}>Predatory</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Persona Selection */}
        <View style={styles.personaSection}>
          <Text style={styles.personaSectionTitle}>Who should review this rent?</Text>
          <View style={styles.personaGrid}>
            {Object.values(PERSONAS).map((persona) => (
              <TouchableOpacity
                key={persona.id}
                style={[
                  styles.personaCard,
                  selectedPersona === persona.id && styles.personaCardSelected,
                ]}
                onPress={() => setSelectedPersona(persona.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.personaEmoji}>{persona.emoji}</Text>
                <Text style={styles.personaName}>{persona.name}</Text>
                <Text style={styles.personaTagline}>{persona.tagline}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Monthly Rent</Text>
            <TextInput
              style={styles.input}
              placeholder="$2,400"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={formData.rent}
              onChangeText={(text) => setFormData({ ...formData, rent: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Monthly Take-Home Income</Text>
            <TextInput
              style={styles.input}
              placeholder="$7,200"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={formData.income}
              onChangeText={(text) => setFormData({ ...formData, income: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>Market Rent</Text>
              {fetchingMarketRent && (
                <ActivityIndicator size="small" color={COLORS.primary} style={styles.loadingIndicator} />
              )}
              {marketRentSource === 'auto' && !fetchingMarketRent && (
                <Text style={styles.autoFillBadge}>Auto-filled</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder={fetchingMarketRent ? "Fetching..." : "$2,200"}
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={formData.market_rent}
              onChangeText={(text) => {
                setFormData({ ...formData, market_rent: text });
                setMarketRentSource('manual'); // User is manually editing
              }}
              editable={!fetchingMarketRent}
            />
            {marketRentSource === 'auto' && formData.market_rent && (
              <Text style={styles.helperText}>
                Based on HUD Fair Market Rent data for your area. You can edit this.
              </Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Unit Quality (0–10)</Text>
            <TextInput
              style={styles.input}
              placeholder="7"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={formData.unit_quality}
              onChangeText={(text) => setFormData({ ...formData, unit_quality: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Zip Code</Text>
            <TextInput
              style={styles.input}
              placeholder="90210"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={formData.zip_code}
              onChangeText={(text) => setFormData({ ...formData, zip_code: text })}
            />
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.primaryActionArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.primaryButton,
              (loading || !isFormComplete()) && styles.primaryButtonDisabled
            ]}
            onPress={handleCalculate}
            disabled={loading || !isFormComplete()}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Scoring...' : 'Get My Rent Score'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            We never judge you. We judge the deal.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  headerArea: {
    marginBottom: SPACING.xl,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  appSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: '#FBFBFB',
  },
  primaryActionArea: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    marginTop: SPACING.sm,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  error: {
    color: COLORS.danger,
    fontSize: 14,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  devTools: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  devLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  devButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  devButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  devButtonFair: {
    backgroundColor: COLORS.success,
  },
  devButtonBorderline: {
    backgroundColor: COLORS.warning,
  },
  devButtonOverpriced: {
    backgroundColor: COLORS.pushed,
  },
  devButtonPredatory: {
    backgroundColor: COLORS.danger,
  },
  devButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  personaSection: {
    marginBottom: SPACING.lg,
  },
  personaSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  personaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  personaCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.divider,
    padding: SPACING.md,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  personaCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F8F8FF',
  },
  personaEmoji: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  personaName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  personaTagline: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  loadingIndicator: {
    marginLeft: SPACING.xs,
  },
  autoFillBadge: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
});

