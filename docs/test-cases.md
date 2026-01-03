# 🧪 10 Real Rent Test Cases

Test these scenarios to validate scoring accuracy and emotional resonance.

---

## Test Case 1: **The Dream Deal** ✅
**Scenario**: Great apartment, affordable rent, good income

| Field | Value |
|-------|-------|
| Rent | $1,200 |
| Income | $5,000 |
| Market Rent | $1,500 |
| Unit Quality | 8 |
| Zip Code | 90210 |

**Expected Results**:
- Rent/Income: 24% (well under 35%) → +20
- Market: $1,200 < $1,650 → +30
- Quality: 8 × 5 = 40
- **Score: 90** → **Fair** ✅

**Emotional Check**: Should feel celebratory, validating

---

## Test Case 2: **The Struggle** 🔴
**Scenario**: Low income, high rent, poor quality

| Field | Value |
|-------|-------|
| Rent | $1,800 |
| Income | $3,000 |
| Market Rent | $1,400 |
| Unit Quality | 3 |
| Zip Code | 10001 |

**Expected Results**:
- Rent/Income: 60% (way over 35%) → -20
- Market: $1,800 > $1,540 → -30
- Quality: 3 × 5 = 15
- **Score: 0** (clamped) → **Predatory** 🔴

**Emotional Check**: Should feel validating for someone being exploited

---

## Test Case 3: **The Borderline Case** ⚠️
**Scenario**: Decent income, slightly high rent, average quality

| Field | Value |
|-------|-------|
| Rent | $2,000 |
| Income | $6,000 |
| Market Rent | $1,900 |
| Unit Quality | 6 |
| Zip Code | 60601 |

**Expected Results**:
- Rent/Income: 33.3% (under 35%) → +20
- Market: $2,000 < $2,090 → +30
- Quality: 6 × 5 = 30
- **Score: 80** → **Fair** ✅

**Emotional Check**: Should feel reassuring

---

## Test Case 4: **The Luxury Trap** 🚨
**Scenario**: High rent, high income, but way over market

| Field | Value |
|-------|-------|
| Rent | $4,500 |
| Income | $15,000 |
| Market Rent | $3,000 |
| Unit Quality | 9 |
| Zip Code | 94102 |

**Expected Results**:
- Rent/Income: 30% (under 35%) → +20
- Market: $4,500 > $3,300 → -30
- Quality: 9 × 5 = 45
- **Score: 35** → **Overpriced** 🚨

**Emotional Check**: Should make user question if luxury is worth it

---

## Test Case 5: **The Minimum Wage Reality** 🔴
**Scenario**: Minimum wage worker, cheap rent, but still too much

| Field | Value |
|-------|-------|
| Rent | $800 |
| Income | $2,000 |
| Market Rent | $750 |
| Unit Quality | 4 |
| Zip Code | 30303 |

**Expected Results**:
- Rent/Income: 40% (over 35%) → -20
- Market: $800 < $825 → +30
- Quality: 4 × 5 = 20
- **Score: 30** → **Overpriced** 🚨

**Emotional Check**: Should validate systemic housing crisis

---

## Test Case 6: **The College Town Gouge** 🔴
**Scenario**: Student housing, terrible quality, way overpriced

| Field | Value |
|-------|-------|
| Rent | $1,500 |
| Income | $2,500 |
| Market Rent | $1,000 |
| Unit Quality | 2 |
| Zip Code | 02138 |

**Expected Results**:
- Rent/Income: 60% (way over 35%) → -20
- Market: $1,500 > $1,100 → -30
- Quality: 2 × 5 = 10
- **Score: 0** (clamped) → **Predatory** 🔴

**Emotional Check**: Should feel outraged, shareable

---

## Test Case 7: **The Perfect 30% Rule** ✅
**Scenario**: Exactly at recommended 30% income ratio

| Field | Value |
|-------|-------|
| Rent | $1,500 |
| Income | $5,000 |
| Market Rent | $1,500 |
| Unit Quality | 7 |
| Zip Code | 98101 |

**Expected Results**:
- Rent/Income: 30% (under 35%) → +20
- Market: $1,500 < $1,650 → +30
- Quality: 7 × 5 = 35
- **Score: 85** → **Fair** ✅

**Emotional Check**: Should feel like textbook good decision

---

## Test Case 8: **The Fixer-Upper Deal** ⚠️
**Scenario**: Below market rent, but terrible quality

| Field | Value |
|-------|-------|
| Rent | $900 |
| Income | $4,000 |
| Market Rent | $1,200 |
| Unit Quality | 3 |
| Zip Code | 75201 |

**Expected Results**:
- Rent/Income: 22.5% (under 35%) → +20
- Market: $900 < $1,320 → +30
- Quality: 3 × 5 = 15
- **Score: 65** → **Borderline** ⚠️

**Emotional Check**: Should make user think about quality vs price

---

## Test Case 9: **The NYC Reality** 🚨
**Scenario**: High rent, high income, but still feels wrong

| Field | Value |
|-------|-------|
| Rent | $3,200 |
| Income | $10,000 |
| Market Rent | $3,000 |
| Unit Quality | 6 |
| Zip Code | 10011 |

**Expected Results**:
- Rent/Income: 32% (under 35%) → +20
- Market: $3,200 < $3,300 → +30
- Quality: 6 × 5 = 30
- **Score: 80** → **Fair** ✅

**Emotional Check**: Might feel surprising - validates NYC prices

---

## Test Case 10: **The Roommate Situation** ⚠️
**Scenario**: Splitting rent, moderate income, average quality

| Field | Value |
|-------|-------|
| Rent | $1,000 |
| Income | $3,500 |
| Market Rent | $950 |
| Unit Quality | 5 |
| Zip Code | 02115 |

**Expected Results**:
- Rent/Income: 28.6% (under 35%) → +20
- Market: $1,000 < $1,045 → +30
- Quality: 5 × 5 = 25
- **Score: 75** → **Borderline** ⚠️

**Emotional Check**: Should feel "okay but not great"

---

## 📋 Testing Checklist

For each test case, verify:

### Functional
- [ ] Score calculates correctly
- [ ] Verdict matches expected
- [ ] All fields accept input
- [ ] Navigation works
- [ ] Data saves to database

### Emotional
- [ ] Verdict feels right emotionally
- [ ] Colors match severity
- [ ] Message resonates
- [ ] User would share this result

### UX
- [ ] Loading states work
- [ ] Error handling works
- [ ] Back button works
- [ ] Share button works

---

## 🎯 What to Look For

### Red Flags
- Scores that feel "off" emotionally
- Verdicts that don't match user expectations
- Edge cases that break the algorithm
- Confusing messages

### Success Signals
- User says "that's exactly right!"
- User wants to share the result
- User tries multiple scenarios
- User shows friends

---

## 📊 After Testing

Document your findings:
1. Which test cases felt accurate?
2. Which felt off?
3. Any scoring adjustments needed?
4. Any UX improvements needed?

---

**Ready to test! Run through all 10 cases and see how it feels.** 🚀

