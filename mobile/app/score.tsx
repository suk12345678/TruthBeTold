import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import ScoreDial from '../components/ScoreDial';

export default function ScoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scoreCardRef = useRef<View>(null);
  const [isSharing, setIsSharing] = useState(false);

  const score = parseInt(params.score as string);
  const verdict = params.verdict as string;

  const getScoreColor = () => {
    if (verdict === 'Fair') return '#10b981';
    if (verdict === 'Borderline') return '#f59e0b';
    if (verdict === 'Overpriced') return '#f97316';
    return '#ef4444'; // Predatory
  };

  const getEmoji = () => {
    if (verdict === 'Fair') return '✅';
    if (verdict === 'Borderline') return '⚠️';
    if (verdict === 'Overpriced') return '🚨';
    return '🔴'; // Predatory
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

  const handleSeeDetails = () => {
    router.push({
      pathname: '/verdict',
      params: params,
    });
  };

  const handleTryAnother = () => {
    router.back();
  };

  const handleShare = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Share on Mobile',
        'Sharing works best on mobile devices. Download the Expo Go app to test sharing!',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setIsSharing(true);
      console.log('Starting share process...');

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      // Capture the score card as an image
      if (!scoreCardRef.current) {
        console.error('scoreCardRef.current is null');
        Alert.alert('Error', 'Unable to generate share image');
        return;
      }

      console.log('Capturing score card...');
      // Wait a bit for the component to fully render
      await new Promise(resolve => setTimeout(resolve, 100));

      const uri = await captureRef(scoreCardRef, {
        format: 'png',
        quality: 1,
      });

      console.log('Captured image URI:', uri);

      // Share the image
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Share your TruthBeTold score',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={scoreCardRef} style={styles.scoreCard} collapsable={false}>
        <Text style={styles.emoji}>{getEmoji()}</Text>

        <Text style={styles.scoreLabel}>Your TruthBeTold Score</Text>

        {/* Animated Score Dial */}
        <ScoreDial score={score} />

        <Text style={[styles.verdict, { color: getScoreColor() }]}>
          {verdict}
        </Text>

        <Text style={styles.headline}>{getHeadline()}</Text>

        <Text style={styles.message}>{getMessage()}</Text>

        {/* Watermark for shared image */}
        <Text style={styles.watermark}>TruthBeTold.app</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, isSharing && styles.buttonDisabled]}
          onPress={handleShare}
          disabled={isSharing}
        >
          <Text style={styles.primaryButtonText}>
            {isSharing ? '📤 Generating...' : '📤 Share Your Score'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSeeDetails}
        >
          <Text style={styles.secondaryButtonText}>See Full Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleTryAnother}
        >
          <Text style={styles.secondaryButtonText}>Try Another Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  scoreCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  verdict: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  watermark: {
    fontSize: 14,
    color: '#999',
    marginTop: 24,
    fontWeight: '600',
  },
  actions: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
});

