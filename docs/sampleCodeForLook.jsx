import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Share,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
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

// -----------------------------------------------------
// Design tokens
// -----------------------------------------------------
const COLORS = {
  background: "#F8F8F8",
  surface: "#FFFFFF",
  textPrimary: "#111111",
  textSecondary: "#6A6A6A",
  divider: "rgba(0,0,0,0.08)",
  primary: "#111111",
  danger: "#D9534F",
  warning: "#F0AD4E",
  success: "#5CB85C",
};

const SPACING = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

// -----------------------------------------------------
// Utility: verdict levels & colors
// -----------------------------------------------------
function getVerdictMeta(score) {
  if (score >= 76) {
    return {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "This rent respects your budget.",
    };
  } else if (score >= 51) {
    return {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You can make this work, but it will squeeze you.",
    };
  } else if (score >= 26) {
    return {
      label: "PUSHED",
      color: "#F39C12",
      bg: "rgba(243,156,18,0.12)",
      text: "This landlord is pushing it for your budget.",
    };
  } else {
    return {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This deal is dangerous for your budget.",
    };
  }
}

// -----------------------------------------------------
// ScoreDial (polished + simulated haptics)
// -----------------------------------------------------
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function ScoreDial({ score }) {
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

// -----------------------------------------------------
// Mock scoring engine (for prototyping)
// -----------------------------------------------------
function mockScore({ rent, income, unitQuality }) {
  const ratio = rent / income;
  let score = 100 - ratio * 100 - (10 - unitQuality) * 2;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const meta = getVerdictMeta(score);

  return {
    score,
    verdict: meta.text,
    verdictMeta: meta,
    breakdown: {
      "💰 Rent-to-Income Ratio": `${Math.round(ratio * 100)}%`,
      "🏠 Unit Quality": `${unitQuality}/10`,
      "📈 Affordability Score": score,
    },
  };
}

// -----------------------------------------------------
// InputScreen (polished)
// -----------------------------------------------------
function InputScreen({ onScored }) {
  const [rent, setRent] = useState("");
  const [income, setIncome] = useState("");
  const [unitQuality, setUnitQuality] = useState("");
  const [busy, setBusy] = useState(false);

  const allFilled = rent && income && unitQuality;

  const handleSubmit = () => {
    if (!allFilled || busy) return;
    setBusy(true);

    setTimeout(() => {
      const scored = mockScore({
        rent: Number(rent),
        income: Number(income),
        unitQuality: Number(unitQuality),
      });
      setBusy(false);
      onScored(scored);
    }, 450);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.inputScrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerArea}>
          <Text style={styles.appName}>TruthBeTold</Text>
          <Text style={styles.appSubtitle}>
            See if this rent truly respects your budget.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Monthly Rent</Text>
            <TextInput
              style={styles.input}
              placeholder="$2,400"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={rent}
              onChangeText={setRent}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Monthly Take-Home Income</Text>
            <TextInput
              style={styles.input}
              placeholder="$7,200"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={income}
              onChangeText={setIncome}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Unit Quality (0–10)</Text>
            <TextInput
              style={styles.input}
              placeholder="7"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={unitQuality}
              onChangeText={setUnitQuality}
            />
          </View>
        </View>

        <View style={styles.primaryActionArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.primaryButton,
              (!allFilled || busy) && styles.primaryButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!allFilled || busy}
          >
            <Text style={styles.primaryButtonText}>
              {busy ? "Scoring..." : "Get My Rent Score"}
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

// -----------------------------------------------------
// ScoreScreen (polished)
// -----------------------------------------------------
function ScoreScreen({ result, onViewBreakdown, onReset }) {
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

  const { score, verdictMeta } = result;

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
            onPress={onViewBreakdown}
          >
            <Text style={styles.primaryButtonText}>View Full Breakdown</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryLink}
            onPress={onReset}
          >
            <Text style={styles.secondaryLinkText}>Try another place</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

// -----------------------------------------------------
// VerdictScreen (polished)
// -----------------------------------------------------
function VerdictScreen({ result, onReset }) {
  const fade = useSharedValue(0);
  const translateY = useSharedValue(18);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 360, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: translateY.value }],
  }));

  const { score, verdict, verdictMeta, breakdown } = result;

  return (
    <View style={styles.screenContainer}>
      <Animated.View style={[styles.verdictContent, animStyle]}>
        <Text style={styles.appNameTop}>TruthBeTold</Text>
        <Text style={styles.screenTitle}>The Breakdown</Text>

        <View style={styles.scoreSummaryRow}>
          <View>
            <Text style={styles.scoreSummaryLabel}>Rent Score</Text>
            <Text style={styles.scoreSummaryValue}>{score}/100</Text>
          </View>
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
        </View>

        <Text style={styles.verdictPrimaryText}>{verdict}</Text>
        <Text style={styles.verdictSecondaryText}>
          Use this as a gut-check, not a life sentence. You can always walk away.
        </Text>

        <View style={styles.breakdownCard}>
          {Object.entries(breakdown).map(([label, value], index) => (
            <View key={label}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>{label}</Text>
                <Text style={styles.breakdownValue}>{value}</Text>
              </View>
              {index < Object.entries(breakdown).length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.scoreActions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={() =>
              Share.share({
                message: `My TruthBeTold Rent Score: ${score}/100 — ${verdictMeta.label} — ${verdict}`,
              })
            }
          >
            <Text style={styles.primaryButtonText}>Share this score</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryLink}
            onPress={onReset}
          >
            <Text style={styles.secondaryLinkText}>Score another place</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

// -----------------------------------------------------
// Main App with screen switching + transitions
// -----------------------------------------------------
export default function App() {
  const [screen, setScreen] = useState("input"); // "input" | "score" | "verdict"
  const [result, setResult] = useState(null);

  const handleScored = (res) => {
    setResult(res);
    setScreen("score");
  };

  const handleViewBreakdown = () => {
    setScreen("verdict");
  };

  const handleReset = () => {
    setResult(null);
    setScreen("input");
  };

  if (screen === "input") {
    return <InputScreen onScored={handleScored} />;
  }

  if (screen === "score" && result) {
    return (
      <ScoreScreen
        result={result}
        onViewBreakdown={handleViewBreakdown}
        onReset={handleReset}
      />
    );
  }

  if (screen === "verdict" && result) {
    return <VerdictScreen result={result} onReset={handleReset} />;
  }

  return null;
}

// -----------------------------------------------------
// Styles
// -----------------------------------------------------
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },

  // App header / titles
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  appNameTop: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  appSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },

  // Input screen layout
  inputScrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  headerArea: {
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: SPACING.lg,
    shadowColor: "#000",
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
    borderColor: "#D7D7D7",
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: "#FBFBFB",
  },
  primaryActionArea: {
    marginTop: SPACING.lg,
    alignItems: "center",
  },
  disclaimer: {
    marginTop: SPACING.sm,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  // Buttons
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryLink: {
    marginTop: SPACING.md,
    alignItems: "center",
  },
  secondaryLinkText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textDecorationLine: "underline",
  },

  // Score dial
  dialWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.lg,
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

  // Score screen
  scoreScreenContent: {
    flex: 1,
    alignItems: "center",
  },
  verdictSection: {
    alignItems: "center",
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  verdictBadge: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
  },
  verdictPrimaryText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  verdictSecondaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  scoreActions: {
    width: "100%",
    marginTop: SPACING.xl,
  },

  // Verdict screen
  verdictContent: {
    flex: 1,
  },
  scoreSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  scoreSummaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  scoreSummaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  breakdownCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.lg,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  breakdownLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
    flex: 1,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
});
