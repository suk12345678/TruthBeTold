#!/bin/bash

# Setup script for GitHub Actions iOS builds
# This script helps you configure the necessary secrets

echo "🚀 GitHub Actions iOS Build Setup"
echo "=================================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "📥 Install it from: https://cli.github.com/"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub CLI first:"
    gh auth login
fi

echo "✅ GitHub CLI is ready"
echo ""

# Get Expo token
echo "📱 Step 1: Get your Expo token"
echo "------------------------------"
echo "Run this command to create an Expo token:"
echo ""
echo "  npx eas-cli login"
echo "  npx eas-cli token:create"
echo ""
read -p "Paste your EXPO_TOKEN here: " EXPO_TOKEN

if [ -z "$EXPO_TOKEN" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

# Set the secret
echo ""
echo "🔑 Setting EXPO_TOKEN secret..."
echo "$EXPO_TOKEN" | gh secret set EXPO_TOKEN

if [ $? -eq 0 ]; then
    echo "✅ EXPO_TOKEN secret set successfully!"
else
    echo "❌ Failed to set secret"
    exit 1
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push code to trigger the iOS Simulator build"
echo "2. Check Actions tab: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions"
echo "3. Download the simulator build from artifacts"
echo ""
echo "📖 For device builds (IPA), see: docs/github-actions-ios-build.md"
echo ""

