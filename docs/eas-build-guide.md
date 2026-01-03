# 🚀 EAS Build Guide

## What is EAS Build?

EAS (Expo Application Services) Build lets you create **development builds** that work like Expo Go but with your custom native code. This means:

- ✅ No Expo Go limitations
- ✅ All native features work
- ✅ Better performance
- ✅ Test on real devices
- ✅ Share with testers

---

## 📋 Prerequisites

1. **Expo Account** - You need to be logged in
2. **EAS CLI** - Already installed ✅
3. **eas.json** - Already created ✅

---

## 🔐 Step 1: Login to Expo

```bash
eas login
```

Enter your credentials:
- **Email**: sukhpal_sandhu@hotmail.com
- **Password**: [your password]

---

## 📱 Step 2: Choose Your Build Type

### **Option A: Development Build (Recommended for Testing)**

This creates a build with dev tools and fast refresh:

```bash
# For Android (APK)
eas build --profile development --platform android

# For iOS (requires Mac or EAS cloud build)
eas build --profile development --platform ios
```

**What you get:**
- Development build with debugging
- Fast refresh enabled
- Can connect to Metro bundler
- Install on your phone and test

### **Option B: Preview Build (For Sharing)**

This creates a standalone build for sharing with others:

```bash
# For Android
eas build --profile preview --platform android

# For iOS
eas build --profile preview --platform ios
```

**What you get:**
- Standalone app (no Metro needed)
- Share with testers
- More like production

### **Option C: Production Build**

For app store submission:

```bash
# For Android
eas build --profile production --platform android

# For iOS
eas build --profile production --platform ios
```

---

## 🎯 Recommended: Start with Development Build

For your first build, I recommend **development build for Android**:

```bash
eas build --profile development --platform android
```

This will:
1. Ask you to create a project if needed
2. Build your app in the cloud
3. Give you a download link
4. You install the APK on your Android phone

---

## ⏱️ Build Process

1. **Upload code** to EAS servers (~1-2 min)
2. **Build app** in the cloud (~10-15 min)
3. **Download APK/IPA** from the link provided

You can monitor progress at: https://expo.dev/accounts/[your-account]/projects/truthbetold/builds

---

## 📲 Installing the Build

### **Android:**
1. Download the APK from the link
2. Open it on your phone
3. Allow "Install from unknown sources"
4. Install and open

### **iOS:**
1. Download the IPA
2. Use TestFlight or install via Xcode
3. Or use EAS Submit to upload to TestFlight

---

## 🔄 Development Workflow

With a **development build**:

1. **Install the dev build** on your phone (once)
2. **Run Metro bundler**: `npm start`
3. **Scan QR code** with your dev build app
4. **Make changes** in your code
5. **See updates** instantly (fast refresh)

This is like Expo Go but with your custom native code!

---

## 🛠️ Build Profiles Explained

### **development**
- Development client enabled
- Debugging tools
- Fast refresh
- Connect to Metro
- **Use for**: Daily development

### **preview**
- Standalone app
- No debugging
- Internal distribution
- **Use for**: Sharing with testers

### **production**
- Optimized build
- No debugging
- App store ready
- **Use for**: Publishing to stores

---

## 💡 Quick Commands

```bash
# Login
eas login

# Build for Android (development)
eas build --profile development --platform android

# Build for iOS (development)
eas build --profile development --platform ios

# Build for both platforms
eas build --profile development --platform all

# Check build status
eas build:list

# View build details
eas build:view [build-id]
```

---

## 🚨 Common Issues

### **"Not logged in"**
```bash
eas login
```

### **"Project not configured"**
```bash
eas build:configure
```

### **"Build failed"**
- Check the build logs on expo.dev
- Common issues: missing dependencies, native module conflicts

### **"Can't install APK"**
- Enable "Install from unknown sources" on Android
- Make sure you downloaded the right build

---

## 📊 What Happens Next?

1. **Run the build command**
2. **Wait 10-15 minutes** (first build takes longer)
3. **Get download link** in terminal and email
4. **Install on your phone**
5. **Test the app** with all features working!

---

## 🎯 Next Steps After Build

Once you have the development build installed:

1. **Test all features**:
   - Form input
   - Score calculation
   - Animated dial
   - Share functionality
   - Navigation

2. **Debug issues**:
   - Use React Native Debugger
   - Check console logs
   - Test on real device

3. **Iterate**:
   - Make changes in code
   - Run `npm start`
   - Scan QR code
   - See updates instantly

---

## 🚀 Ready to Build?

Run this command to start:

```bash
eas login
eas build --profile development --platform android
```

Then wait for the build to complete and install it on your phone!

---

**Good luck with your first EAS build! 🎉**

