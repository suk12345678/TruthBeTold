# Setup script for GitHub Actions iOS builds (PowerShell)
# This script helps you configure the necessary secrets

Write-Host "🚀 GitHub Actions iOS Build Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if gh CLI is installed
try {
    $null = gh --version
    Write-Host "✅ GitHub CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI (gh) is not installed" -ForegroundColor Red
    Write-Host "📥 Install it from: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if logged in to GitHub
try {
    $null = gh auth status 2>&1
    Write-Host "✅ GitHub CLI is authenticated" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please login to GitHub CLI first:" -ForegroundColor Yellow
    gh auth login
}

Write-Host ""

# Get Expo token
Write-Host "📱 Step 1: Get your Expo token" -ForegroundColor Cyan
Write-Host "------------------------------" -ForegroundColor Cyan
Write-Host "Run these commands to create an Expo token:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  npx eas-cli login" -ForegroundColor White
Write-Host "  npx eas-cli token:create" -ForegroundColor White
Write-Host ""

$EXPO_TOKEN = Read-Host "Paste your EXPO_TOKEN here"

if ([string]::IsNullOrWhiteSpace($EXPO_TOKEN)) {
    Write-Host "❌ No token provided. Exiting." -ForegroundColor Red
    exit 1
}

# Set the secret
Write-Host ""
Write-Host "🔑 Setting EXPO_TOKEN secret..." -ForegroundColor Cyan

try {
    $EXPO_TOKEN | gh secret set EXPO_TOKEN
    Write-Host "✅ EXPO_TOKEN secret set successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to set secret" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Push code to trigger the iOS Simulator build" -ForegroundColor White
Write-Host "2. Check Actions tab: https://github.com/suk12345678/TruthBeTold/actions" -ForegroundColor White
Write-Host "3. Download the simulator build from artifacts" -ForegroundColor White
Write-Host ""
Write-Host "📖 For device builds (IPA), see: docs/github-actions-ios-build.md" -ForegroundColor Yellow
Write-Host ""

