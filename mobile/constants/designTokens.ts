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

// Persona definitions
export const PERSONAS = {
  data_analyst: {
    id: 'data_analyst',
    name: 'Data Analyst',
    emoji: '📊',
    tagline: 'Just the facts',
    description: 'Numbers-focused, objective analysis',
  },
  tough_coach: {
    id: 'tough_coach',
    name: 'Tough Love Coach',
    emoji: '💪',
    tagline: "I'll tell it straight",
    description: 'Direct, no BS advice',
  },
  supportive_friend: {
    id: 'supportive_friend',
    name: 'Supportive Friend',
    emoji: '🤗',
    tagline: "I've got your back",
    description: 'Warm, empathetic support',
  },
  protective_advocate: {
    id: 'protective_advocate',
    name: 'Protective Advocate',
    emoji: '🛡️',
    tagline: "I'll fight for you",
    description: 'Fierce defender of your interests',
  },
};

// Message variants by persona and verdict
const MESSAGE_VARIANTS = {
  data_analyst: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "Your rent-to-income ratio falls within the recommended 30% guideline. This is a financially sound decision.",
      momentOfTruth: "The numbers check out.",
      supportLine: "This rent aligns with standard affordability metrics.",
      shareText: "Ran the numbers on my rent with TruthBeTold — it's within guidelines! 📊",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You're at 35-40% of income. That's above the 30% guideline but below the 50% danger zone.",
      momentOfTruth: "You're in the yellow zone.",
      supportLine: "Statistically, this leaves limited room for savings.",
      shareText: "My rent analysis shows I'm at the edge of affordability guidelines ⚠️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "Your rent exceeds 40% of income and is above market rate. The data suggests you're overpaying.",
      momentOfTruth: "The math doesn't add up.",
      supportLine: "Comparable units average 15-20% less in your area.",
      shareText: "Analysis shows I'm paying above market rate for my rent 📈",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This rent exceeds 50% of your income. Financial research shows this level creates severe instability.",
      momentOfTruth: "The data is clear: this is unsustainable.",
      supportLine: "Studies show rent above 50% of income leads to financial hardship.",
      shareText: "Rent analysis: I'm in the danger zone at 50%+ of income 🚨",
    },
  },
  tough_coach: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "You made a smart choice. This rent won't drain you. Now build that emergency fund.",
      momentOfTruth: "You did good. Don't mess it up.",
      supportLine: "This is what discipline looks like.",
      shareText: "Got my rent checked — turns out I made a solid choice 💪",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You can make this work, but you'll need to stay sharp. No room for sloppy budgeting.",
      momentOfTruth: "This is your wake-up call.",
      supportLine: "Time to get serious about your money.",
      shareText: "My rent is tight — gonna need discipline to make this work ⚠️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "You're paying too much. Period. Negotiate hard or walk away. You're better than this deal.",
      momentOfTruth: "Stop settling.",
      supportLine: "You know what you need to do.",
      shareText: "Real talk: I'm overpaying on rent. Time to negotiate or bounce 💪",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This rent will break you. I'm not sugarcoating it. Walk away. Now.",
      momentOfTruth: "You needed to hear this.",
      supportLine: "Your future self will thank you for saying no.",
      shareText: "Just got the hard truth about my rent... it's bad 🚨",
    },
  },
  supportive_friend: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "You found a place that respects your budget! I'm so proud of you for not settling.",
      momentOfTruth: "You deserve this win.",
      supportLine: "You found a sustainable deal in a tough market.",
      shareText: "Just checked my rent and I'm actually doing okay! 🤗💚",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "I know the market is tough, and you're doing your best. This is tight, but you can make it work.",
      momentOfTruth: "You're not alone in this.",
      supportLine: "The market is hard right now — you're not the problem.",
      shareText: "My rent is a bit tight, but I'm gonna make it work 🤗",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "Hey, I care about you. This rent is asking too much. You deserve breathing room in your budget.",
      momentOfTruth: "You're worth more than this.",
      supportLine: "Your financial peace matters.",
      shareText: "Friend checked my rent and says I deserve better 🧡",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "I'm worried about you taking this. This rent could really hurt you. Please keep looking.",
      momentOfTruth: "I'm here for you.",
      supportLine: "You deserve a place that doesn't drain you.",
      shareText: "Got some tough news about my rent situation 😔",
    },
  },
  protective_advocate: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "Finally, a landlord who isn't trying to squeeze you dry. This is what fair looks like.",
      momentOfTruth: "You found one of the good ones.",
      supportLine: "This rent respects your worth.",
      shareText: "Found a rent that actually treats me fairly! 🛡️💚",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "This landlord is pushing it, but it's not predatory. You have leverage — use it to negotiate.",
      momentOfTruth: "Don't let them take advantage.",
      supportLine: "You have more power than you think.",
      shareText: "My rent is borderline — time to negotiate 🛡️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "This landlord is overcharging you. They're banking on you not knowing better. Prove them wrong.",
      momentOfTruth: "You're being taken advantage of.",
      supportLine: "You deserve better than this price gouging.",
      shareText: "My landlord is overcharging me. Not okay 🛡️🧡",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This is exploitation. This landlord is trying to trap you in financial hardship. Run.",
      momentOfTruth: "This is predatory pricing.",
      supportLine: "You're worth more than what this landlord thinks.",
      shareText: "This rent is predatory. I deserve better 🛡️🚨",
    },
  },
};

// Get verdict metadata based on verdict and persona
export function getVerdictMeta(verdict: string, persona: string = 'supportive_friend') {
  const personaMessages = MESSAGE_VARIANTS[persona as keyof typeof MESSAGE_VARIANTS];
  if (!personaMessages) {
    // Fallback to supportive_friend if persona not found
    return MESSAGE_VARIANTS.supportive_friend[verdict as keyof typeof MESSAGE_VARIANTS.supportive_friend] || MESSAGE_VARIANTS.supportive_friend.Predatory;
  }

  return personaMessages[verdict as keyof typeof personaMessages] || personaMessages.Predatory;
}

