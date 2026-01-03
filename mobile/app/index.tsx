import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function InputScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      // Call the scoring function
      console.log('Calling score function with:', {
        rent: parseFloat(formData.rent),
        income: parseFloat(formData.income),
        market_rent: parseFloat(formData.market_rent),
        unit_quality: parseInt(formData.unit_quality),
      });

      const { data, error: functionError } = await supabase.functions.invoke('score', {
        body: {
          rent: parseFloat(formData.rent),
          income: parseFloat(formData.income),
          market_rent: parseFloat(formData.market_rent),
          unit_quality: parseInt(formData.unit_quality),
        }
      });

      console.log('Function response:', { data, error: functionError });

      if (functionError) {
        console.error('Function error:', functionError);
        throw functionError;
      }

      // Save to database
      const { data: rentInput, error: dbError } = await supabase
        .from('rent_inputs')
        .insert({
          rent: parseFloat(formData.rent),
          income: parseFloat(formData.income),
          market_rent: parseFloat(formData.market_rent),
          unit_quality: parseInt(formData.unit_quality),
          zip_code: formData.zip_code,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Save score
      await supabase.from('scores').insert({
        rent_input_id: rentInput.id,
        score: data.score,
        verdict: data.verdict,
      });

      // Navigate to score screen
      router.push({
        pathname: '/score',
        params: {
          score: data.score,
          verdict: data.verdict,
          rent: formData.rent,
          income: formData.income,
          market_rent: formData.market_rent,
          unit_quality: formData.unit_quality,
          zip_code: formData.zip_code,
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>What's the truth about your rent?</Text>
        <Text style={styles.subtitle}>Enter your details below</Text>

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

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Rent ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="2000"
              keyboardType="numeric"
              value={formData.rent}
              onChangeText={(text) => setFormData({ ...formData, rent: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Income ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="6000"
              keyboardType="numeric"
              value={formData.income}
              onChangeText={(text) => setFormData({ ...formData, income: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Market Rent ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="1800"
              keyboardType="numeric"
              value={formData.market_rent}
              onChangeText={(text) => setFormData({ ...formData, market_rent: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Unit Quality (0-10)</Text>
            <TextInput
              style={styles.input}
              placeholder="7"
              keyboardType="numeric"
              value={formData.unit_quality}
              onChangeText={(text) => setFormData({ ...formData, unit_quality: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.input}
              placeholder="90210"
              keyboardType="numeric"
              value={formData.zip_code}
              onChangeText={(text) => setFormData({ ...formData, zip_code: text })}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCalculate}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Calculating...' : 'Calculate My Score'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: -8,
  },
  devTools: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  devLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
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
    backgroundColor: '#10b981',
  },
  devButtonBorderline: {
    backgroundColor: '#f59e0b',
  },
  devButtonOverpriced: {
    backgroundColor: '#f97316',
  },
  devButtonPredatory: {
    backgroundColor: '#ef4444',
  },
  devButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

