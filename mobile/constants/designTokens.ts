// Design tokens matching the sample code style
export const COLORS = {
  background: "#F8F8F8",
  surface: "#FFFFFF",
  textPrimary: "#111111",
  textSecondary: "#6A6A6A",
  divider: "rgba(0,0,0,0.08)",
  primary: "#111111",
  danger: "#D9534F",
  warning: "#F0AD4E",
  success: "#5CB85C",
  pushed: "#F39C12",
};

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

// Verdict levels & colors with emotional copy
export function getVerdictMeta(verdict: string) {
  switch (verdict) {
    case 'Fair':
      return {
        label: "GOOD",
        color: COLORS.success,
        bg: "rgba(92,184,92,0.1)",
        text: "This rent respects your hustle. You're not stretching — you're choosing.",
        momentOfTruth: "This is what your budget has been trying to tell you.",
        supportLine: "You found a sustainable deal in a tough market.",
        shareText: "Just checked my rent with TruthBeTold — turns out I'm doing okay! 💚",
      };
    case 'Borderline':
      return {
        label: "TIGHT",
        color: COLORS.warning,
        bg: "rgba(240,173,78,0.12)",
        text: "You can make this work, but it'll take discipline. This is a 'think twice' zone.",
        momentOfTruth: "Here's the truth behind this rent.",
        supportLine: "You're not the problem — the market is.",
        shareText: "TruthBeTold says this rent is in the yellow zone… what do you think? ⚠️",
      };
    case 'Overpriced':
      return {
        label: "PUSHED",
        color: COLORS.pushed,
        bg: "rgba(243,156,18,0.12)",
        text: "This landlord is asking more than your budget can comfortably carry.",
        momentOfTruth: "Let's cut through the noise — here's what this deal really means.",
        supportLine: "Your worth isn't defined by a landlord's price tag.",
        shareText: "TruthBeTold says this rent is squeezing me — what do you think? 🧡",
      };
    case 'Predatory':
    default:
      return {
        label: "DANGEROUS",
        color: COLORS.danger,
        bg: "rgba(217,83,79,0.12)",
        text: "This deal puts you at risk. You deserve better than a rent that drains you.",
        momentOfTruth: "You needed to see this in black and white.",
        supportLine: "This score is about the deal, not your value.",
        shareText: "Just checked my rent with TruthBeTold… and wow. 🚨",
      };
  }
}

