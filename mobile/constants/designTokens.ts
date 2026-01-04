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

// Persona definitions - Each is a lens on the same truth
export const PERSONAS = {
  analyst: {
    id: 'analyst',
    name: 'The Analyst',
    emoji: '🧠',
    tagline: 'Just the data',
    description: 'Calm, precise, data-driven',
  },
  empath: {
    id: 'empath',
    name: 'The Empath',
    emoji: '❤️',
    tagline: 'I see you',
    description: 'Warm, validating, supportive',
  },
  tough_coach: {
    id: 'tough_coach',
    name: 'The Tough Coach',
    emoji: '🔥',
    tagline: 'No sugarcoating',
    description: 'Direct, motivational, no BS',
  },
  investigator: {
    id: 'investigator',
    name: 'The Investigator',
    emoji: '🔍',
    tagline: "Something's off...",
    description: 'Suspicious, pattern-spotting',
  },
};

// Message variants by persona and verdict
const MESSAGE_VARIANTS = {
  analyst: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "Your rent-to-income ratio falls within recommended guidelines. This is a structurally sound decision.",
      momentOfTruth: "The numbers check out.",
      supportLine: "This rent aligns with standard affordability metrics.",
      shareText: "The Analyst reviewed my rent — it's within guidelines 🧠",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You're operating at 35-40% of income, which exceeds the 30% threshold but remains below critical levels.",
      momentOfTruth: "You're in the yellow zone.",
      supportLine: "Statistically, this leaves limited margin for unexpected costs.",
      shareText: "The Analyst says I'm at the edge of affordability ⚠️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "Based on market data, this rent is structurally misaligned with both your budget and comparable units.",
      momentOfTruth: "The math doesn't add up.",
      supportLine: "Comparable units in your area average 15-20% less.",
      shareText: "The Analyst found I'm overpaying on rent 📊",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This rent-to-income ratio of 50%+ creates documented financial instability. The data is unambiguous.",
      momentOfTruth: "The data is clear: this is unsustainable.",
      supportLine: "Research shows this level leads to measurable financial hardship.",
      shareText: "The Analyst says my rent is in the danger zone 🚨",
    },
  },
  tough_coach: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "Smart move. This rent won't drain you. Now build that cushion and stay ahead.",
      momentOfTruth: "You did good. Don't mess it up.",
      supportLine: "This is what discipline looks like.",
      shareText: "The Tough Coach approved my rent — I made a solid choice 🔥",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You can make this work, but there's no room for slipping. Stay sharp, stay disciplined.",
      momentOfTruth: "This is your wake-up call.",
      supportLine: "Time to get serious about your money.",
      shareText: "The Tough Coach says my rent is tight — no room for error ⚠️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "This rent is punching above its weight. You can do better — don't settle for overpriced.",
      momentOfTruth: "Stop settling.",
      supportLine: "You know what you need to do.",
      shareText: "The Tough Coach says I'm overpaying. Time to negotiate 🔥",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "Walk away. This rent will break you. You're worth more than this deal.",
      momentOfTruth: "You needed to hear this.",
      supportLine: "Your future self will thank you for saying no.",
      shareText: "The Tough Coach told me to walk away from this rent 🚨",
    },
  },
  empath: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "You found a place that doesn't ask too much of you. That's a real win.",
      momentOfTruth: "You deserve this.",
      supportLine: "You found breathing room in a tough market.",
      shareText: "The Empath says my rent is fair — I'm doing okay ❤️",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "You're carrying a lot here. It's tight, but you're not alone in this struggle.",
      momentOfTruth: "You're not alone in this.",
      supportLine: "The market is hard right now — you're not the problem.",
      shareText: "The Empath says my rent is tight, but I can make it work ❤️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "This rent is asking more of you than it should. You deserve breathing room in your life.",
      momentOfTruth: "You're worth more than this.",
      supportLine: "Your financial peace matters.",
      shareText: "The Empath says I deserve better than this rent ❤️",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "This burden is too heavy. You shouldn't have to carry this much weight.",
      momentOfTruth: "I'm here for you.",
      supportLine: "You deserve a place that doesn't drain you.",
      shareText: "The Empath is worried about my rent situation 💔",
    },
  },
  investigator: {
    Fair: {
      label: "GOOD",
      color: COLORS.success,
      bg: "rgba(92,184,92,0.1)",
      text: "I ran the numbers. This checks out. Rare to see a fair deal these days.",
      momentOfTruth: "This one's clean.",
      supportLine: "No red flags. This landlord is playing fair.",
      shareText: "The Investigator checked my rent — it's legit 🕵️",
    },
    Borderline: {
      label: "TIGHT",
      color: COLORS.warning,
      bg: "rgba(240,173,78,0.12)",
      text: "Something's slightly off. The price is pushing it, but it's not a red flag yet. Keep your eyes open.",
      momentOfTruth: "Stay alert.",
      supportLine: "Not a scam, but they're testing your limits.",
      shareText: "The Investigator says my rent is borderline 🕵️",
    },
    Overpriced: {
      label: "PUSHED",
      color: COLORS.pushed,
      bg: "rgba(243,156,18,0.12)",
      text: "Something's off here. The price doesn't match the quality. I'd dig deeper before signing anything.",
      momentOfTruth: "Trust your gut.",
      supportLine: "This landlord is banking on you not doing the math.",
      shareText: "The Investigator found something off with my rent 🕵️",
    },
    Predatory: {
      label: "DANGEROUS",
      color: COLORS.danger,
      bg: "rgba(217,83,79,0.12)",
      text: "Red flags everywhere. This landlord is banking on you not knowing better. Run.",
      momentOfTruth: "This is a trap.",
      supportLine: "I've seen this pattern before. It never ends well.",
      shareText: "The Investigator says my rent is a trap 🚨",
    },
  },
};

// Get verdict metadata based on verdict and persona
export function getVerdictMeta(verdict: string, persona: string = 'empath') {
  const personaMessages = MESSAGE_VARIANTS[persona as keyof typeof MESSAGE_VARIANTS];
  if (!personaMessages) {
    // Fallback to empath if persona not found
    return MESSAGE_VARIANTS.empath[verdict as keyof typeof MESSAGE_VARIANTS.empath] || MESSAGE_VARIANTS.empath.Predatory;
  }

  return personaMessages[verdict as keyof typeof personaMessages] || personaMessages.Predatory;
}

// Get persona display info
export function getPersonaInfo(personaId: string) {
  return PERSONAS[personaId as keyof typeof PERSONAS] || PERSONAS.empath;
}

