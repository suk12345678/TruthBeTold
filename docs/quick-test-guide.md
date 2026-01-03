# ⚡ Quick Test Guide

## 🚀 How to Run Tests

### 1. Start the App
```bash
cd mobile
npm start
```
Press `w` for web or scan QR code for mobile

### 2. For Each Test Case
1. Open `docs/test-cases.md`
2. Copy the values from a test case
3. Fill in the form
4. Click "Calculate My Score"
5. Record results in `docs/test-results-tracker.md`

### 3. What to Check
- ✅ Score matches expected
- ✅ Verdict feels right emotionally
- ✅ Colors match severity
- ✅ Message resonates
- ✅ You'd share this result

---

## 📋 Quick Reference: All 10 Test Cases

### 1. Dream Deal ✅
`$1,200 rent | $5,000 income | $1,500 market | 8 quality | 90210`
→ **90 (Fair)**

### 2. The Struggle 🔴
`$1,800 rent | $3,000 income | $1,400 market | 3 quality | 10001`
→ **0 (Predatory)**

### 3. Borderline Case ⚠️
`$2,000 rent | $6,000 income | $1,900 market | 6 quality | 60601`
→ **80 (Fair)**

### 4. Luxury Trap 🚨
`$4,500 rent | $15,000 income | $3,000 market | 9 quality | 94102`
→ **35 (Overpriced)**

### 5. Minimum Wage Reality 🔴
`$800 rent | $2,000 income | $750 market | 4 quality | 30303`
→ **30 (Overpriced)**

### 6. College Town Gouge 🔴
`$1,500 rent | $2,500 income | $1,000 market | 2 quality | 02138`
→ **0 (Predatory)**

### 7. Perfect 30% Rule ✅
`$1,500 rent | $5,000 income | $1,500 market | 7 quality | 98101`
→ **85 (Fair)**

### 8. Fixer-Upper Deal ⚠️
`$900 rent | $4,000 income | $1,200 market | 3 quality | 75201`
→ **65 (Borderline)**

### 9. NYC Reality 🚨
`$3,200 rent | $10,000 income | $3,000 market | 6 quality | 10011`
→ **80 (Fair)**

### 10. Roommate Situation ⚠️
`$1,000 rent | $3,500 income | $950 market | 5 quality | 02115`
→ **75 (Borderline)**

---

## 🎯 Scoring Breakdown

### Verdict Thresholds
- **80-100**: Fair ✅ (Green)
- **60-79**: Borderline ⚠️ (Amber)
- **30-59**: Overpriced 🚨 (Orange)
- **0-29**: Predatory 🔴 (Red)

### Score Components
1. **Income Ratio** (-20 to +20)
   - Under 35%: +20
   - Over 35%: -20

2. **Market Comparison** (-30 to +30)
   - Under 110% market: +30
   - Over 110% market: -30

3. **Unit Quality** (0 to 50)
   - Quality × 5 points

**Total**: 0-100 (clamped)

---

## 🐛 Common Issues

### Score doesn't calculate
- Check browser console (F12)
- Verify all fields filled
- Check Supabase function logs

### Wrong verdict
- Verify scoring logic in edge function
- Check threshold values
- Review test case expectations

### Share doesn't work
- Only works on mobile (iOS/Android)
- Web shows helpful message
- Need Expo Go app

---

## 📊 After Testing

1. **Fill out tracker** (`test-results-tracker.md`)
2. **Document findings**
3. **Identify patterns**
4. **Propose adjustments**

---

## 🎯 Success Criteria

✅ 8/10 scores match expected  
✅ 8/10 emotional resonance 4+ stars  
✅ No critical bugs  
✅ Share works on mobile  
✅ Users want to share results  

---

**Ready to test! Start with Test Case 1.** 🚀

