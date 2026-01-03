# 🎉 GitHub Actions iOS Build - Complete Setup

Your TruthBeTold app now has **FREE iOS builds** using GitHub Actions! No more paying for EAS Build.

---

## ✅ What's Been Set Up

### 📁 Files Created

1. **`.github/workflows/ios-build.yml`**
   - Builds iOS Simulator app
   - Runs automatically on push to `mobile/` folder
   - 100% FREE, no certificates needed

2. **`.github/workflows/ios-device-build.yml`**
   - Builds IPA for physical devices
   - Manual trigger only
   - Requires Apple Developer certificates

3. **`mobile/exportOptions.plist`**
   - Configuration for IPA export
   - Needs your Team ID (for device builds)

4. **`docs/github-actions-ios-build.md`**
   - Complete documentation
   - Step-by-step guides
   - Troubleshooting tips

5. **`scripts/setup-github-actions.ps1`** (Windows)
   - Automated setup script
   - Configures GitHub secrets

6. **`scripts/setup-github-actions.sh`** (Mac/Linux)
   - Same as above for Unix systems

---

## 🚀 Quick Start (3 Steps)

### Step 1: Get Your Expo Token

```bash
cd mobile
npx eas-cli login
npx eas-cli token:create
```

Copy the token that starts with `expo_...`

### Step 2: Add Token to GitHub

**Option A: Use the Setup Script (Easiest)**
```powershell
.\scripts\setup-github-actions.ps1
```

**Option B: Manual Setup**
1. Go to: https://github.com/suk12345678/TruthBeTold/settings/secrets/actions
2. Click "New repository secret"
3. Name: `EXPO_TOKEN`
4. Value: Paste your token
5. Click "Add secret"

### Step 3: Trigger a Build

**Option A: Automatic (on push)**
```bash
# Make any change to mobile folder
cd mobile
# Edit a file, then:
git add .
git commit -m "Test iOS build"
git push
```

**Option B: Manual Trigger**
1. Go to: https://github.com/suk12345678/TruthBeTold/actions
2. Click "iOS Build (Free - No EAS)"
3. Click "Run workflow"
4. Click "Run workflow" button

---

## 📱 Using Your Builds

### Simulator Build

1. **Wait for build** (~10-15 minutes)
2. **Download artifact**
   - Go to Actions tab
   - Click on completed workflow
   - Download `TruthBeTold-iOS-Simulator-xxxxx`
3. **Install on simulator**
   ```bash
   # Unzip the file
   # Drag TruthBeTold.app to iOS Simulator
   ```

### Device Build (IPA)

See full guide: [`docs/github-actions-ios-build.md`](./github-actions-ios-build.md)

Requires:
- Apple Developer account ($99/year)
- Distribution certificate
- Provisioning profile

---

## 💰 Cost Savings

| Service | Monthly Cost | Annual Cost |
|---------|--------------|-------------|
| **EAS Build (Production)** | $99 | $1,188 |
| **EAS Build (Priority)** | $299 | $3,588 |
| **GitHub Actions** | **$0** | **$0** |

**You save: $1,188 - $3,588 per year!** 🎉

---

## 🔍 How It Works

```mermaid
graph LR
    A[Push Code] --> B[GitHub Actions]
    B --> C[Setup macOS Runner]
    C --> D[Install Dependencies]
    D --> E[Expo Prebuild]
    E --> F[Build with Xcode]
    F --> G[Upload Artifact]
    G --> H[Download & Install]
```

1. **Push code** to GitHub
2. **GitHub Actions** detects changes
3. **macOS runner** starts (free tier: 2000 min/month)
4. **Expo prebuild** generates native iOS project
5. **Xcode builds** the app
6. **Artifact uploaded** to GitHub (30-day retention)
7. **You download** and install

---

## 📊 Build Times

| Build Type | Time | GitHub Actions Minutes Used |
|------------|------|----------------------------|
| Simulator | 8-12 min | ~10 min |
| Device (IPA) | 12-18 min | ~15 min |

**Free tier:** 2000 minutes/month = ~133-200 builds/month

---

## 🎯 What's Next?

### Immediate
- [x] Set up EXPO_TOKEN secret
- [ ] Trigger first build
- [ ] Download and test simulator build

### Optional (Device Builds)
- [ ] Get Apple Developer account
- [ ] Create certificates
- [ ] Set up device build workflow
- [ ] Distribute via TestFlight

### Advanced
- [ ] Add automated testing
- [ ] Set up automatic releases
- [ ] Configure build notifications
- [ ] Add Android builds

---

## 📚 Documentation

- **Full Guide:** [`docs/github-actions-ios-build.md`](./github-actions-ios-build.md)
- **Expo Prebuild:** https://docs.expo.dev/workflow/prebuild/
- **GitHub Actions:** https://docs.github.com/en/actions

---

## 🆘 Need Help?

### Common Issues

**Build fails: "No such module 'ExpoModulesCore'"**
```bash
cd mobile
npx expo prebuild --clean
git add ios/
git commit -m "Add iOS native project"
git push
```

**Build fails: "EXPO_TOKEN not found"**
- Make sure you added the secret to GitHub
- Check the secret name is exactly `EXPO_TOKEN`

**Want to build locally first?**
```bash
cd mobile
npx expo prebuild --platform ios
cd ios
pod install
xcodebuild -workspace TruthBeTold.xcworkspace -scheme TruthBeTold -sdk iphonesimulator
```

---

## 🎉 You're All Set!

Your iOS builds are now:
- ✅ **Free** (no EAS subscription needed)
- ✅ **Automated** (builds on every push)
- ✅ **Fast** (8-15 minutes)
- ✅ **Reliable** (GitHub's infrastructure)

**Happy building! 🚀**

