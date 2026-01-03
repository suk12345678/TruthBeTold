# 🛠️ Dev Quick Fill Feature

## What It Does

Added a developer tool to the home page that lets you instantly fill the form with test data for different scenarios.

---

## 🎯 Quick Fill Buttons

### 🟢 Fair (Score: ~85)
- **Rent**: $1,800
- **Income**: $6,000
- **Market Rent**: $1,900
- **Unit Quality**: 8/10
- **Expected**: "This rent respects your budget"

### 🟡 Borderline (Score: ~60)
- **Rent**: $2,200
- **Income**: $6,000
- **Market Rent**: $2,000
- **Unit Quality**: 6/10
- **Expected**: "You can make this work, but it'll squeeze you"

### 🟠 Overpriced (Score: ~35)
- **Rent**: $2,800
- **Income**: $6,000
- **Market Rent**: $2,000
- **Unit Quality**: 5/10
- **Expected**: "This landlord is pushing it"

### 🔴 Predatory (Score: ~15)
- **Rent**: $3,500
- **Income**: $6,000
- **Market Rent**: $2,000
- **Unit Quality**: 3/10
- **Expected**: "This deal is dangerous"

---

## 🎨 Visual Design

The dev tools appear at the top of the form with:
- **Blue dashed border** - Clearly a dev tool
- **Light blue background** - Stands out
- **Color-coded buttons** - Match verdict colors
- **🛠️ Icon** - Indicates dev feature

---

## 🚀 How to Use

1. **Open the app** (home page)
2. **Click any scenario button**
3. **Form auto-fills** with test data
4. **Click "Calculate My Score"**
5. **See the result** immediately

---

## 💡 Why This Helps

### Before ❌
- Type 5 fields manually
- Remember test values
- Slow iteration
- Typos cause errors

### After ✅
- One click fills everything
- Test all scenarios quickly
- No typos
- Fast iteration

---

## 🧪 Testing Workflow

```
1. Click "Fair" → Calculate → Verify score ~85
2. Click "Borderline" → Calculate → Verify score ~60
3. Click "Overpriced" → Calculate → Verify score ~35
4. Click "Predatory" → Calculate → Verify score ~15
```

---

## 🎯 Next Steps

### Optional Enhancements
- [ ] Add "Clear Form" button
- [ ] Add custom scenario builder
- [ ] Save custom test scenarios
- [ ] Add keyboard shortcuts (F1-F4)
- [ ] Hide dev tools in production

---

**Now you can test all scenarios in seconds! 🚀**

