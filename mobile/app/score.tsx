import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import ScoreDial from '../components/ScoreDial';
import { COLORS, SPACING, getVerdictMeta } from '../constants/designTokens';

export default function ScoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scoreCardRef = useRef<View>(null);
  const [isSharing, setIsSharing] = useState(false);

  const score = parseInt(params.score as string);
  const verdict = params.verdict as string;
  const verdictMeta = getVerdictMeta(verdict);

  const fade = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, {
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: translateY.value }],
  }));

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
    <View style={styles.screenContainer}>
      <Animated.View style={[styles.scoreScreenContent, animStyle]}>
        <Text style={styles.appNameTop}>TruthBeTold</Text>
        <Text style={styles.screenTitle}>Your Rent Score</Text>

        <ScoreDial score={score} />

        <View style={styles.verdictSection}>
          <View
            style={[
              styles.verdictBadge,
              { backgroundColor: verdictMeta.bg, borderColor: verdictMeta.color },
            ]}
          >
            <View
              style={[
                styles.verdictDot,
                { backgroundColor: verdictMeta.color },
              ]}
            />
            <Text
              style={[
                styles.verdictBadgeText,
                { color: verdictMeta.color },
              ]}
            >
              {verdictMeta.label}
            </Text>
          </View>

          <Text style={styles.verdictPrimaryText}>{verdictMeta.text}</Text>
          <Text style={styles.verdictSecondaryText}>
            Based on your rent, income, and unit quality.
          </Text>
        </View>

        <View style={styles.scoreActions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={handleSeeDetails}
          >
            <Text style={styles.primaryButtonText}>View Full Breakdown</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryLink}
            onPress={handleTryAnother}
          >
            <Text style={styles.secondaryLinkText}>Try another place</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  scoreScreenContent: {
    flex: 1,
    alignItems: 'center',
  },
  appNameTop: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  verdictSection: {
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.sm,
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
  verdictPrimaryText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  verdictSecondaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  scoreActions: {
    width: '100%',
    marginTop: SPACING.xl,
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
  secondaryLink: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

