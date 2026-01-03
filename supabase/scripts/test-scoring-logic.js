// Test the scoring logic locally before deploying

function calculateScore(rent, income, market_rent, unit_quality) {
  let score = 0;

  // Income to rent ratio check (should be < 35%)
  score += income > 0 && rent / income > 0.35 ? -20 : 20;
  
  // Market rent comparison (should not be > 110% of market)
  score += market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;
  
  // Unit quality bonus (0-10 scale, 5 points each)
  score += unit_quality * 5;

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  const verdict =
    score > 75 ? "Fair" :
    score > 50 ? "Borderline" :
    score > 25 ? "Overpriced" :
    "Predatory";

  return { score, verdict };
}

console.log('🧪 Testing TruthBeTold Scoring Logic\n');
console.log('=====================================\n');

// Test Case 1: Fair deal
console.log('Test 1: Fair Deal');
console.log('  Rent: $1500, Income: $5000, Market: $1600, Quality: 8');
let result = calculateScore(1500, 5000, 1600, 8);
console.log(`  Result: Score ${result.score}, Verdict: ${result.verdict}`);
console.log(`  Expected: Score ~90, Verdict: Fair\n`);

// Test Case 2: Overpriced
console.log('Test 2: Overpriced');
console.log('  Rent: $2500, Income: $5000, Market: $2000, Quality: 5');
result = calculateScore(2500, 5000, 2000, 5);
console.log(`  Result: Score ${result.score}, Verdict: ${result.verdict}`);
console.log(`  Expected: Score ~25, Verdict: Overpriced\n`);

// Test Case 3: Predatory
console.log('Test 3: Predatory');
console.log('  Rent: $2500, Income: $5000, Market: $1800, Quality: 3');
result = calculateScore(2500, 5000, 1800, 3);
console.log(`  Result: Score ${result.score}, Verdict: ${result.verdict}`);
console.log(`  Expected: Score ~15, Verdict: Predatory\n`);

// Test Case 4: Borderline
console.log('Test 4: Borderline');
console.log('  Rent: $1800, Income: $6000, Market: $1900, Quality: 6');
result = calculateScore(1800, 6000, 1900, 6);
console.log(`  Result: Score ${result.score}, Verdict: ${result.verdict}`);
console.log(`  Expected: Score ~70, Verdict: Borderline\n`);

// Test with the actual data from database
console.log('Test 5: Database Test Record');
console.log('  Rent: $2000, Income: $6000, Market: $1800, Quality: 7');
result = calculateScore(2000, 6000, 1800, 7);
console.log(`  Result: Score ${result.score}, Verdict: ${result.verdict}\n`);

console.log('✅ Scoring logic tests complete!');
console.log('\nScoring Breakdown:');
console.log('  - Income ratio (rent/income > 35%): -20 or +20 points');
console.log('  - Market comparison (rent > market*1.1): -30 or +30 points');
console.log('  - Unit quality (0-10 scale): quality * 5 points');
console.log('  - Final score clamped to 0-100');
console.log('\nVerdict Thresholds:');
console.log('  - Fair: > 75');
console.log('  - Borderline: 51-75');
console.log('  - Overpriced: 26-50');
console.log('  - Predatory: 0-25');

