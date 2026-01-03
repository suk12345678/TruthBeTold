# 🚀 Deploy TruthBeTold Scoring Function

## Option 1: Deploy via Supabase Dashboard (Recommended)

### Step 1: Open Supabase Functions Dashboard
Go to: https://supabase.com/dashboard/project/kxaoxixijylkfsaitfky/functions

### Step 2: Create New Function
1. Click **"Create a new function"** or **"New Edge Function"**
2. Name it: **`score`**
3. Leave the default template

### Step 3: Replace Code
Copy the code from `supabase/functions/score/index.ts` and paste it into the editor:

```typescript
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { rent, income, market_rent, unit_quality } = await req.json();

  let score = 0;

  score += income > 0 && rent / income > 0.35 ? -20 : 20;
  score += market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;
  score += unit_quality * 5;

  score = Math.max(0, Math.min(100, score));

  const verdict =
    score > 75 ? "Fair" :
    score > 50 ? "Borderline" :
    score > 25 ? "Overpriced" :
    "Predatory";

  return new Response(JSON.stringify({ score, verdict }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### Step 4: Deploy
Click **"Deploy"** or **"Save"**

### Step 5: Test the Function
In the Supabase dashboard, test with this payload:
```json
{
  "rent": 2000,
  "income": 6000,
  "market_rent": 1800,
  "unit_quality": 7
}
```

Expected response:
```json
{
  "score": 25,
  "verdict": "Overpriced"
}
```

**Why this score?**
- Income ratio: 33.3% (< 35%) → +20 points ✅
- Market comparison: $2000 > $1980 (110% of market) → -30 points ❌
- Unit quality: 7 × 5 → +35 points
- **Total: 20 - 30 + 35 = 25 (Overpriced)**

---

## Option 2: Deploy via CLI (Alternative)

### Prerequisites
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `npx supabase login`
3. Link project: `npx supabase link --project-ref kxaoxixijylkfsaitfky`

### Deploy Command
```bash
cd supabase
npx supabase functions deploy score
```

---

## 📊 Scoring Algorithm Explained

### Inputs
- `rent` - Monthly rent amount
- `income` - Monthly income
- `market_rent` - Average market rent for similar units
- `unit_quality` - Quality rating (0-10 scale)

### Calculation
1. **Income Ratio Check** (+20 or -20 points)
   - If rent/income > 35%: **-20 points** (too expensive for income)
   - Otherwise: **+20 points**

2. **Market Comparison** (+30 or -30 points)
   - If rent > market_rent * 1.1: **-30 points** (overpriced vs market)
   - Otherwise: **+30 points**

3. **Unit Quality Bonus** (0-50 points)
   - Quality score * 5 points
   - Example: Quality 8 = 40 points

4. **Final Score** (0-100)
   - Sum all points
   - Clamp between 0 and 100

### Verdict Thresholds
- **Fair**: Score > 75
- **Borderline**: Score 51-75
- **Overpriced**: Score 26-50
- **Predatory**: Score 0-25

---

## 🧪 Testing Locally

Run the test script to verify scoring logic:
```bash
cd supabase
node scripts/test-scoring-logic.js
```

---

## 📱 Using in Mobile App

Once deployed, invoke from your React Native app:

```typescript
import { supabase } from './lib/supabase';

const calculateTruthScore = async (rentData) => {
  const { data, error } = await supabase.functions.invoke('score', {
    body: {
      rent: rentData.rent,
      income: rentData.income,
      market_rent: rentData.market_rent,
      unit_quality: rentData.unit_quality
    }
  });

  if (error) {
    console.error('Error calculating score:', error);
    return null;
  }

  return data; // { score: 65, verdict: "Borderline" }
};
```

---

## ✅ Verification Checklist

- [ ] Function deployed to Supabase Cloud
- [ ] Test payload returns expected score
- [ ] Function accessible from mobile app
- [ ] Error handling works correctly

---

## 🔗 Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Deploy Docs](https://deno.com/deploy/docs)
- Your Function URL: `https://kxaoxixijylkfsaitfky.supabase.co/functions/v1/score`

