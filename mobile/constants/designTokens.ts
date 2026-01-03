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

// Verdict levels & colors
export function getVerdictMeta(verdict: string) {
  switch (verdict) {
    case 'Fair':
      return {
        label: "GOOD",
        color: COLORS.success,
        bg: "rgba(92,184,92,0.1)",
        text: "This rent respects your budget.",
      };
    case 'Borderline':
      return {
        label: "TIGHT",
        color: COLORS.warning,
        bg: "rgba(240,173,78,0.12)",
        text: "You can make this work, but it will squeeze you.",
      };
    case 'Overpriced':
      return {
        label: "PUSHED",
        color: COLORS.pushed,
        bg: "rgba(243,156,18,0.12)",
        text: "This landlord is pushing it for your budget.",
      };
    case 'Predatory':
    default:
      return {
        label: "DANGEROUS",
        color: COLORS.danger,
        bg: "rgba(217,83,79,0.12)",
        text: "This deal is dangerous for your budget.",
      };
  }
}

