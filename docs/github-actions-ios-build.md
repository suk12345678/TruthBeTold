# 🚀 Free iOS Builds with GitHub Actions

This guide explains how to build your iOS app completely free using GitHub Actions, without paying for EAS Build.

---

## 📋 Overview

We have two workflows:

1. **`ios-build.yml`** - Builds for iOS Simulator (100% free, no certificates needed)
2. **`ios-device-build.yml`** - Builds IPA for physical devices (requires Apple Developer account)

---

## 🎯 Workflow 1: iOS Simulator Build (Easiest)

### ✅ What You Get
- Builds iOS app for simulator
- No certificates required
- Completely free
- Automatic on every push to `mobile/` folder

### 🔧 Setup

1. **Add EXPO_TOKEN to GitHub Secrets**
   ```bash
   # Get your Expo token
   npx expo login
   npx eas-cli whoami
   
   # Create a token
   npx eas-cli token:create
   ```

2. **Add to GitHub**
   - Go to: https://github.com/suk12345678/TruthBeTold/settings/secrets/actions
   - Click "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: Your token from step 1

3. **That's it!** Push code and the workflow runs automatically.

### 📥 How to Use the Build

1. Go to Actions tab: https://github.com/suk12345678/TruthBeTold/actions
2. Click on the latest "iOS Build" workflow
3. Download the artifact: `TruthBeTold-iOS-Simulator-xxxxx`
4. Unzip the file
5. Drag `TruthBeTold.app` to your iOS Simulator

---

## 📱 Workflow 2: iOS Device Build (Advanced)

### ✅ What You Get
- Builds IPA for physical iPhones/iPads
- Can distribute via TestFlight or direct install
- Automatic GitHub Releases

### 🔧 Setup (Requires Apple Developer Account)

#### Step 1: Create Certificates & Provisioning Profile

1. **Go to Apple Developer Portal**
   - Visit: https://developer.apple.com/account/resources/certificates/list

2. **Create Distribution Certificate**
   - Click "+" to create new certificate
   - Choose "Apple Distribution"
   - Follow instructions to create CSR
   - Download the certificate (.cer file)

3. **Create Provisioning Profile**
   - Go to: https://developer.apple.com/account/resources/profiles/list
   - Click "+" to create new profile
   - Choose "Ad Hoc"
   - Select your App ID: `com.sooksand.truthbetold`
   - Select your certificate
   - Select devices (add your test devices)
   - Download the profile (.mobileprovision file)

#### Step 2: Convert Certificate to P12

```bash
# Import certificate to Keychain Access
# Then export as .p12 file with a password

# Or use command line:
security find-identity -v -p codesigning
```

#### Step 3: Encode Files to Base64

```bash
# Encode certificate
base64 -i YourCertificate.p12 | pbcopy

# Encode provisioning profile
base64 -i YourProfile.mobileprovision | pbcopy
```

#### Step 4: Add Secrets to GitHub

Add these secrets at: https://github.com/suk12345678/TruthBeTold/settings/secrets/actions

1. **IOS_CERTIFICATE_BASE64**
   - Value: Base64 encoded .p12 file

2. **IOS_CERTIFICATE_PASSWORD**
   - Value: Password you set when exporting .p12

3. **IOS_PROVISIONING_PROFILE_BASE64**
   - Value: Base64 encoded .mobileprovision file

#### Step 5: Update exportOptions.plist

Edit `mobile/exportOptions.plist`:
- Replace `YOUR_TEAM_ID` with your Apple Team ID
- Replace `YOUR_PROVISIONING_PROFILE_NAME` with your profile name

### 🚀 How to Run

1. Go to Actions: https://github.com/suk12345678/TruthBeTold/actions
2. Click "iOS Device Build (Ad-Hoc)"
3. Click "Run workflow"
4. Enter build number (optional)
5. Click "Run workflow"

### 📥 How to Install

**Option 1: From GitHub Releases**
1. Download the .ipa file
2. Use Apple Configurator or Xcode to install on device

**Option 2: From Artifacts**
1. Download from Actions tab
2. Install using Xcode or third-party tools

---

## 💰 Cost Comparison

| Method | Cost | Build Time | Complexity |
|--------|------|------------|------------|
| **EAS Build** | $99-299/month | 10-15 min | Easy |
| **GitHub Actions (Simulator)** | FREE | 8-12 min | Easy |
| **GitHub Actions (Device)** | FREE* | 12-18 min | Medium |

*Requires Apple Developer account ($99/year)

---

## 🔍 Troubleshooting

### Build Fails: "No such module 'ExpoModulesCore'"
- Run `npx expo prebuild --clean` locally first
- Commit the `ios/` folder

### Build Fails: Code Signing Error
- Check your certificates are valid
- Verify Team ID in exportOptions.plist
- Ensure provisioning profile matches bundle ID

### Simulator Build Works but Device Build Fails
- You need to set up certificates (see Workflow 2 setup)
- Or use EAS Build for device builds

---

## 📚 Additional Resources

- [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [GitHub Actions for iOS](https://docs.github.com/en/actions/deployment/deploying-xcode-applications)
- [Apple Code Signing](https://developer.apple.com/support/code-signing/)

---

## 🎯 Quick Commands

```bash
# Test prebuild locally
cd mobile
npx expo prebuild --platform ios --clean

# Build simulator locally
cd ios
xcodebuild -workspace TruthBeTold.xcworkspace -scheme TruthBeTold -sdk iphonesimulator

# Clean build
rm -rf ios/build
rm -rf ios/Pods
```

---

**Happy Building! 🚀**

