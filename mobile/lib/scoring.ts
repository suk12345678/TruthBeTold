/**
 * Local scoring calculation
 * This is a fallback when Supabase Edge Function is unavailable
 * Uses the same algorithm as the Edge Function
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
 * Calculate rent score locally
 * Same algorithm as supabase/functions/score/index.ts
 */
export function calculateScore(input: ScoreInput): ScoreResult {
  const { rent, income, market_rent, unit_quality } = input;

  // Validate inputs
  if (rent === undefined || income === undefined || market_rent === undefined || unit_quality === undefined) {
    throw new Error('Missing required fields: rent, income, market_rent, unit_quality');
  }

  let score = 0;

  // Rent-to-income ratio check
  score += income > 0 && rent / income > 0.35 ? -20 : 20;

  // Market rent comparison
  score += market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;

  // Unit quality factor
  score += unit_quality * 5;

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Determine verdict
  const verdict: ScoreResult['verdict'] =
    score > 75 ? 'Fair' :
    score > 50 ? 'Borderline' :
    score > 25 ? 'Overpriced' :
    'Predatory';

  return { score, verdict };
}

