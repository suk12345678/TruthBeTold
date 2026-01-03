import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { COLORS, SPACING, getVerdictMeta } from '../constants/designTokens';

export default function VerdictScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const score = parseInt(params.score as string);
  const verdict = params.verdict as string;
  const rent = parseFloat(params.rent as string);
  const income = parseFloat(params.income as string);
  const market_rent = parseFloat(params.market_rent as string);
  const unit_quality = parseInt(params.unit_quality as string);

  const verdictMeta = getVerdictMeta(verdict);

  // Animation values
  const headerFade = useSharedValue(0);
  const headerTranslateY = useSharedValue(-12);
  const cardFade = useSharedValue(0);
  const cardTranslateY = useSharedValue(12);

  useEffect(() => {
    // Stagger animations
    headerFade.value = withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) });
    headerTranslateY.value = withTiming(0, { duration: 380, easing: Easing.out(Easing.cubic) });

    cardFade.value = withDelay(
      120,
      withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) })
    );
    cardTranslateY.value = withDelay(
      120,
      withTiming(0, { duration: 380, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: headerFade.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardFade.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Animated.View style={[styles.headerSection, headerAnimStyle]}>
        <Text style={styles.appNameTop}>TruthBeTold</Text>
        <Text style={styles.pageTitle}>Full Breakdown</Text>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreOutOf}>/100</Text>
        </View>

        <View
          style={[
            styles.verdictBadge,
            { backgroundColor: verdictMeta.bg, borderColor: verdictMeta.color },
          ]}
        >
          <View style={[styles.verdictDot, { backgroundColor: verdictMeta.color }]} />
          <Text style={[styles.verdictBadgeText, { color: verdictMeta.color }]}>
            {verdictMeta.label}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={cardAnimStyle}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How We Scored This</Text>

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{breakdown.incomeRatio.label}</Text>
              <Text
                style={[
                  styles.breakdownPoints,
                  { color: breakdown.incomeRatio.passed ? COLORS.success : COLORS.danger },
                ]}
              >
                {breakdown.incomeRatio.points > 0 ? '+' : ''}
                {breakdown.incomeRatio.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.incomeRatio.sublabel}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{breakdown.marketComparison.label}</Text>
              <Text
                style={[
                  styles.breakdownPoints,
                  { color: breakdown.marketComparison.passed ? COLORS.success : COLORS.danger },
                ]}
              >
                {breakdown.marketComparison.points > 0 ? '+' : ''}
                {breakdown.marketComparison.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.marketComparison.sublabel}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{breakdown.quality.label}</Text>
              <Text style={[styles.breakdownPoints, { color: COLORS.success }]}>
                +{breakdown.quality.points}
              </Text>
            </View>
            <Text style={styles.breakdownSublabel}>{breakdown.quality.sublabel}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What This Means</Text>
          <Text style={styles.explanationText}>
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

        <View style={styles.actionArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={handleTryAnother}
          >
            <Text style={styles.primaryButtonText}>Check Another Place</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  appNameTop: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.md,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scoreOutOf: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  verdictDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  verdictBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  breakdownItem: {
    paddingVertical: SPACING.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  breakdownLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  breakdownPoints: {
    fontSize: 18,
    fontWeight: '700',
  },
  breakdownSublabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: SPACING.xs,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  actionArea: {
    marginTop: SPACING.md,
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

