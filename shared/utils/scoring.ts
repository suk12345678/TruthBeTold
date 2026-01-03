/**
 * TruthBeTold Scoring Utility
 * 
 * This file contains the scoring logic that matches the Edge Function.
 * Use this for client-side validation or offline scoring.
 */

export interface ScoreInput {
  rent: number;
  income: number;
  market_rent: number;
  unit_quality: number;
}

export interface ScoreResult {
  score: number;
  verdict: 'Fair' | 'Borderline' | 'Overpriced' | 'Predatory';
}

/**
 * Calculate TruthBeTold score locally
 * This matches the logic in supabase/functions/score/index.ts
 */
export function calculateScore(input: ScoreInput): ScoreResult {
  const { rent, income, market_rent, unit_quality } = input;
  
  let score = 0;

  // Income to rent ratio check (should be < 35%)
  score += income > 0 && rent / income > 0.35 ? -20 : 20;
  
  // Market rent comparison (should not be > 110% of market)
  score += market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;
  
  // Unit quality bonus (0-10 scale, 5 points each)
  score += unit_quality * 5;

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  const verdict: ScoreResult['verdict'] =
    score > 75 ? 'Fair' :
    score > 50 ? 'Borderline' :
    score > 25 ? 'Overpriced' :
    'Predatory';

  return { score, verdict };
}

/**
 * Get score color based on verdict
 */
export function getScoreColor(verdict: ScoreResult['verdict']): string {
  switch (verdict) {
    case 'Fair':
      return '#10b981'; // green
    case 'Borderline':
      return '#f59e0b'; // amber
    case 'Overpriced':
      return '#f97316'; // orange
    case 'Predatory':
      return '#ef4444'; // red
  }
}

/**
 * Get score emoji based on verdict
 */
export function getScoreEmoji(verdict: ScoreResult['verdict']): string {
  switch (verdict) {
    case 'Fair':
      return '✅';
    case 'Borderline':
      return '⚠️';
    case 'Overpriced':
      return '🚨';
    case 'Predatory':
      return '🔴';
  }
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
  return `${score}/100`;
}

/**
 * Get detailed breakdown of score calculation
 */
export function getScoreBreakdown(input: ScoreInput) {
  const { rent, income, market_rent, unit_quality } = input;
  
  const incomeRatioPoints = income > 0 && rent / income > 0.35 ? -20 : 20;
  const marketComparisonPoints = market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;
  const qualityPoints = unit_quality * 5;
  
  const rentToIncomeRatio = income > 0 ? (rent / income * 100).toFixed(1) : 'N/A';
  const rentToMarketRatio = market_rent > 0 ? ((rent / market_rent - 1) * 100).toFixed(1) : 'N/A';
  
  return {
    incomeRatio: {
      value: rentToIncomeRatio,
      points: incomeRatioPoints,
      label: `Rent is ${rentToIncomeRatio}% of income (should be < 35%)`,
      passed: incomeRatioPoints > 0
    },
    marketComparison: {
      value: rentToMarketRatio,
      points: marketComparisonPoints,
      label: `Rent is ${rentToMarketRatio}% ${Number(rentToMarketRatio) >= 0 ? 'above' : 'below'} market rate`,
      passed: marketComparisonPoints > 0
    },
    quality: {
      value: unit_quality,
      points: qualityPoints,
      label: `Unit quality: ${unit_quality}/10`,
      passed: true
    },
    total: incomeRatioPoints + marketComparisonPoints + qualityPoints
  };
}

