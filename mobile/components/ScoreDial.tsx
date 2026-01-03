import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor,
  Easing,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
import { COLORS } from "../constants/designTokens";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ScoreDial({ score }: { score: number }) {
  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.18);

  useEffect(() => {
    progress.value = withTiming(score / 100, {
      duration: 1100,
      easing: Easing.out(Easing.cubic),
    });

    scale.value = withSequence(
      withTiming(1.08, { duration: 140, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 140, easing: Easing.out(Easing.cubic) })
    );

    glowOpacity.value = withSequence(
      withTiming(0.32, { duration: 200 }),
      withTiming(0.18, { duration: 300 })
    );
  }, [score]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
      stroke: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        [COLORS.danger, COLORS.warning, COLORS.success]
      ),
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.dialWrapper, containerStyle]}>
      <Animated.View style={[styles.dialGlow, glowStyle]} />
      <View style={styles.dialContainer}>
        <Svg width={200} height={200}>
          <Circle
            cx={100}
            cy={100}
            r={radius}
            stroke="#E3E3E3"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <AnimatedCircle
            cx={100}
            cy={100}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
          />
        </Svg>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dialWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  dialGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  dialContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNumber: {
    fontSize: 40,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  scoreLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: -4,
  },
});

