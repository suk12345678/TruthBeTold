import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";

// Only import Reanimated on native platforms
let Animated: any;
let useSharedValue: any;
let useAnimatedProps: any;
let withTiming: any;
let interpolateColor: any;
let AnimatedCircle: any;

if (Platform.OS !== 'web') {
  const Reanimated = require('react-native-reanimated');
  Animated = Reanimated.default;
  useSharedValue = Reanimated.useSharedValue;
  useAnimatedProps = Reanimated.useAnimatedProps;
  withTiming = Reanimated.withTiming;
  interpolateColor = Reanimated.interpolateColor;
  AnimatedCircle = Animated.createAnimatedComponent(Circle);
}

export default function ScoreDial({ score }: { score: number }) {
  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

  const [webProgress, setWebProgress] = useState(0);

  useEffect(() => {
    // Web: use state-based animation
    let start = 0;
    const end = score / 100;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      setWebProgress(start + (end - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Get color based on progress
  const getColor = (prog: number) => {
    if (prog < 0.5) {
      // Interpolate between red and yellow
      const t = prog / 0.5;
      return `rgb(${Math.round(217 + (240 - 217) * t)}, ${Math.round(83 + (173 - 83) * t)}, ${Math.round(79 + (78 - 79) * t)})`;
    } else {
      // Interpolate between yellow and green
      const t = (prog - 0.5) / 0.5;
      return `rgb(${Math.round(240 + (92 - 240) * t)}, ${Math.round(173 + (184 - 173) * t)}, ${Math.round(78 + (92 - 78) * t)})`;
    }
  };

  // Simple version with manual animation (works on all platforms)
  const offset = circumference * (1 - webProgress);
  const color = getColor(webProgress);

  return (
    <View style={styles.container}>
      <Svg width={200} height={200}>
        <Circle
          cx={100}
          cy={100}
          r={radius}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={100}
          cy={100}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin="100, 100"
        />
      </Svg>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});

