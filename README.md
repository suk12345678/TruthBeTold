# 🎯 TruthBeTold

**A rent scoring app that helps renters understand if they're getting a fair deal.**

TruthBeTold analyzes your rent against your income and local market rates to give you an honest verdict: Fair, Borderline, Overpriced, or Predatory.

---

## ✨ Features

- 📊 **Smart Scoring Algorithm** - Analyzes rent-to-income ratio, market comparison, and unit quality
- 🎨 **Beautiful Animated UI** - Smooth dial animation showing your score
- 📱 **Share Your Score** - Share your results on social media
- 🔒 **Privacy First** - Your data stays private
- ⚡ **Fast & Simple** - Get your verdict in seconds

---

## 🛠️ Tech Stack

### **Mobile App**
- **Expo** - React Native framework
- **Expo Router** - File-based routing
- **TypeScript** - Type safety
- **React Native SVG** - Animated score dial
- **Expo Sharing** - Native share functionality

### **Backend**
- **Supabase** - Backend as a service
- **PostgreSQL** - Database
- **Edge Functions** - Serverless scoring logic
- **Row Level Security** - Data protection

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Expo CLI
- Supabase account

### **Installation**

1. **Clone the repo**
   ```bash
   git clone https://github.com/Suk-Sandhu_resmed/TruthBeTold.git
   cd TruthBeTold
   ```

2. **Install mobile dependencies**
   ```bash
   cd mobile
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device**
   - Press `w` for web
   - Press `a` for Android
   - Press `i` for iOS
   - Or scan QR code with Expo Go

---

## 🏗️ Project Structure

```
TruthBeTold/
├── mobile/              # Expo React Native app
│   ├── app/            # Expo Router screens
│   ├── components/     # Reusable components
│   ├── lib/           # Utilities and config
│   └── assets/        # Images and icons
├── supabase/           # Backend
│   ├── functions/     # Edge functions
│   ├── migrations/    # Database migrations
│   └── scripts/       # Utility scripts
├── shared/            # Shared types and utils
└── docs/             # Documentation
```

---

## 📊 Scoring Algorithm

The app calculates a score (0-100) based on:

1. **Rent-to-Income Ratio** (±20 points)
   - Good: < 35% of income
   - Bad: > 35% of income

2. **Market Comparison** (±30 points)
   - Good: ≤ 10% above market rate
   - Bad: > 10% above market rate

3. **Unit Quality** (0-50 points)
   - User rates 0-10
   - Multiplied by 5

### **Verdicts**
- **76-100**: Fair - "This rent respects your budget"
- **51-75**: Borderline - "You can make this work, but it'll squeeze you"
- **26-50**: Overpriced - "This landlord is pushing it"
- **0-25**: Predatory - "This deal is dangerous"

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License

---

## 👤 Author

**Suk Sandhu**

---

**Built with ❤️ to help renters get a fair deal**
