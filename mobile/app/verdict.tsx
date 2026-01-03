import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function VerdictScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const score = parseInt(params.score as string);
  const verdict = params.verdict as string;
  const rent = parseFloat(params.rent as string);
  const income = parseFloat(params.income as string);
  const market_rent = parseFloat(params.market_rent as string);
  const unit_quality = parseInt(params.unit_quality as string);

  const getScoreColor = () => {
    if (verdict === 'Fair') return '#10b981';
    if (verdict === 'Borderline') return '#f59e0b';
    if (verdict === 'Overpriced') return '#f97316';
    return '#ef4444';
  };

  const calculateBreakdown = () => {
    const rentToIncomeRatio = ((rent / income) * 100).toFixed(1);
    const rentToMarketRatio = (((rent / market_rent) - 1) * 100).toFixed(1);
    
    const incomeRatioPoints = rent / income > 0.35 ? -20 : 20;
    const marketComparisonPoints = rent > market_rent * 1.1 ? -30 : 30;
    const qualityPoints = unit_quality * 5;

    return {
      incomeRatio: {
        value: rentToIncomeRatio,
        points: incomeRatioPoints,
        label: `Rent is ${rentToIncomeRatio}% of income`,
        sublabel: incomeRatioPoints > 0 ? 'Good! Under 35% threshold' : 'Too high! Over 35% threshold',
        passed: incomeRatioPoints > 0,
      },
      marketComparison: {
        value: rentToMarketRatio,
        points: marketComparisonPoints,
        label: `${Number(rentToMarketRatio) >= 0 ? '+' : ''}${rentToMarketRatio}% vs market rate`,
        sublabel: marketComparisonPoints > 0 ? 'Fair pricing' : 'Overpriced vs market',
        passed: marketComparisonPoints > 0,
      },
      quality: {
        value: unit_quality,
        points: qualityPoints,
        label: `Unit quality: ${unit_quality}/10`,
        sublabel: `+${qualityPoints} points`,
        passed: true,
      },
    };
  };

  const breakdown = calculateBreakdown();



  const handleTryAnother = () => {
    router.push('/');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.scoreNumber, { color: getScoreColor() }]}>
          {score}/100
        </Text>
        <Text style={[styles.verdict, { color: getScoreColor() }]}>
          {verdict}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Score Breakdown</Text>
        
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>{breakdown.incomeRatio.label}</Text>
              <Text style={[
                styles.breakdownPoints,
                { color: breakdown.incomeRatio.passed ? '#10b981' : '#ef4444' }
              ]}>
                {breakdown.incomeRatio.points > 0 ? '+' : ''}{breakdown.incomeRatio.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.incomeRatio.sublabel}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>{breakdown.marketComparison.label}</Text>
              <Text style={[
                styles.breakdownPoints,
                { color: breakdown.marketComparison.passed ? '#10b981' : '#ef4444' }
              ]}>
                {breakdown.marketComparison.points > 0 ? '+' : ''}{breakdown.marketComparison.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.marketComparison.sublabel}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>{breakdown.quality.label}</Text>
              <Text style={[styles.breakdownPoints, { color: '#10b981' }]}>
                +{breakdown.quality.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.quality.sublabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What This Means</Text>
        <Text style={styles.explanation}>
          {verdict === 'Fair' &&
            "Your rent sits comfortably within affordability guidelines and aligns well with local market conditions. You're not overpaying, and this deal supports long‑term financial stability."}
          {verdict === 'Borderline' &&
            "You're close to the upper edge of what's considered sustainable. It's not a bad deal, but it leaves less room for savings, emergencies, or lifestyle flexibility. Negotiate if you can."}
          {verdict === 'Overpriced' &&
            "The rent exceeds typical affordability guidelines and is higher than comparable units in your area. You're not being exploited, but you're definitely overpaying. Explore alternatives or negotiate aggressively."}
          {verdict === 'Predatory' &&
            "The rent severely exceeds affordability standards and is far above what similar units cost. This level of strain can lead to long‑term financial harm. You deserve better — consider other options immediately."}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleTryAnother}
        >
          <Text style={styles.secondaryButtonText}>Try Another Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  verdict: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  breakdownCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  breakdownItem: {
    paddingVertical: 12,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  breakdownPoints: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  breakdownSublabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

