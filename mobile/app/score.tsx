import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import ScoreDial from '../components/ScoreDial';
import { COLORS, SPACING, getVerdictMeta, getPersonaInfo } from '../constants/designTokens';

export default function ScoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scoreCardRef = useRef<View>(null);
  const [isSharing, setIsSharing] = useState(false);

  const score = parseInt(params.score as string);
  const verdict = params.verdict as string;
  const persona = (params.persona as string) || 'empath';
  const verdictMeta = getVerdictMeta(verdict, persona);
  const personaInfo = getPersonaInfo(persona);

  const fade = useSharedValue(0);
  const translateY = useSharedValue(12);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, {
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });

    // Subtle shimmer effect on verdict badge
    shimmer.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: translateY.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmer.value * 0.3,
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

        {/* Persona Badge */}
        <View style={styles.personaBadge}>
          <Text style={styles.personaBadgeEmoji}>{personaInfo.emoji}</Text>
          <Text style={styles.personaBadgeText}>Speaking as: {personaInfo.name}</Text>
        </View>

        <ScoreDial score={score} />

        <View style={styles.verdictSection}>
          <Text style={styles.momentOfTruth}>{verdictMeta.momentOfTruth}</Text>

          <View style={styles.verdictBadgeContainer}>
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
            <Animated.View
              style={[
                styles.shimmerOverlay,
                shimmerStyle,
                { backgroundColor: verdictMeta.color },
              ]}
            />
          </View>

          <Text style={styles.verdictPrimaryText}>{verdictMeta.text}</Text>
          <Text style={styles.supportLine}>{verdictMeta.supportLine}</Text>
        </View>

        <View style={styles.scoreActions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={handleSeeDetails}
          >
            <Text style={styles.primaryButtonText}>View Full Breakdown</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.secondaryLink}
              onPress={handleShare}
              disabled={isSharing}
            >
              <Text style={styles.secondaryLinkText}>
                {isSharing ? 'Sharing...' : 'Share My Score'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.secondaryLink}
              onPress={handleTryAnother}
            >
              <Text style={styles.secondaryLinkText}>Try another place</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: SPACING.sm,
  },
  personaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    marginBottom: SPACING.lg,
  },
  personaBadgeEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  personaBadgeText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  verdictSection: {
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  momentOfTruth: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    fontStyle: 'italic',
  },
  verdictBadgeContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
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
    marginBottom: SPACING.md,
    lineHeight: 26,
  },
  supportLine: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
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
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginTop: SPACING.md,
  },
  secondaryLink: {
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

