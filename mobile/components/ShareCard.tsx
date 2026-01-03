import { View, Text, StyleSheet } from 'react-native';
import { forwardRef } from 'react';
import ScoreDial from './ScoreDial';

interface ShareCardProps {
  score: number;
  verdict: string;
  rent: number;
  income: number;
}

export const ShareCard = forwardRef<View, ShareCardProps>(
  ({ score, verdict, rent, income }, ref) => {
    const getScoreColor = () => {
      if (verdict === 'Fair') return '#10b981';
      if (verdict === 'Borderline') return '#f59e0b';
      if (verdict === 'Overpriced') return '#f97316';
      return '#ef4444';
    };

    const getEmoji = () => {
      if (verdict === 'Fair') return '✅';
      if (verdict === 'Borderline') return '⚠️';
      if (verdict === 'Overpriced') return '🚨';
      return '🔴';
    };

    const getHeadline = () => {
      if (verdict === 'Fair') {
        return "This rent respects your budget.";
      }
      if (verdict === 'Borderline') {
        return "You can make this work, but it'll squeeze you.";
      }
      if (verdict === 'Overpriced') {
        return "This landlord is pushing it.";
      }
      return "This deal is dangerous.";
    };

    const getMessage = () => {
      if (verdict === 'Fair') {
        return "You're in a healthy range — this is a sustainable living situation.";
      }
      if (verdict === 'Borderline') {
        return "This rent isn't predatory, but it will put pressure on your monthly budget.";
      }
      if (verdict === 'Overpriced') {
        return "You're paying more than the market suggests — this deal isn't in your favor.";
      }
      return "This rent is financially unsafe — you should walk away.";
    };

    return (
      <View ref={ref} style={styles.card} collapsable={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎯 TruthBeTold</Text>
          <Text style={styles.tagline}>Know your rent's truth</Text>
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <Text style={styles.emoji}>{getEmoji()}</Text>
          <ScoreDial score={score} />
          <Text style={[styles.verdict, { color: getScoreColor() }]}>
            {verdict}
          </Text>
          <Text style={styles.headline}>{getHeadline()}</Text>
          <Text style={styles.message}>{getMessage()}</Text>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Rent:</Text>
            <Text style={styles.detailValue}>${rent.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Income:</Text>
            <Text style={styles.detailValue}>${income.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rent/Income Ratio:</Text>
            <Text style={styles.detailValue}>
              {((rent / income) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.cta}>Get your rent score at</Text>
          <Text style={styles.url}>truthbetold.app</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    width: 400,
    minHeight: 600,
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
  },
  scoreSection: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  emoji: {
    fontSize: 48,
  },
  verdict: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 12,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  details: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
  },
  cta: {
    fontSize: 14,
    color: '#666',
  },
  url: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

