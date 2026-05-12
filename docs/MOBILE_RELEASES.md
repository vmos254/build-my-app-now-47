# Lumen — Mobile Release Guide

## Prerequisites (one-time)

- Mac with Xcode 15+ installed (required for iOS)
- Android Studio with SDK Platform 34+ installed
- Node.js 20+ and npm installed
- Apple Developer Program membership ($99/yr) — https://developer.apple.com/programs/
- Google Play Console account ($25 one-time) — https://play.google.com/console/signup
- RevenueCat account (free) — https://app.revenuecat.com

---

## Step 1 — Fill in RevenueCat API keys

Open `src/lib/purchases.ts` and replace the two placeholder strings:

```ts
export const RC_API_KEY_IOS     = "PASTE_YOUR_IOS_REVENUECAT_KEY_HERE";
export const RC_API_KEY_ANDROID = "PASTE_YOUR_ANDROID_REVENUECAT_KEY_HERE";
```

Find your keys in: RevenueCat Dashboard → Project Settings → API Keys → Public SDK keys.

---

## Step 2 — First-time native project setup

Run these commands once from the repo root:

```bash
npm install
npx cap add ios
npx cap add android
npm run build
npx cap sync
```

Generate all icon and splash screen sizes from `assets/icon.png` and `assets/splash.png`:

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate
```

---

## Step 3 — Open in Xcode / Android Studio

```bash
npx cap open ios       # Opens Xcode
npx cap open android   # Opens Android Studio
```

### Xcode (iOS)
1. Select the `App` target → Signing & Capabilities
2. Set your Team (your Apple Developer account)
3. Bundle identifier should already read `com.lumencatholic.app`
4. Set minimum deployment target to iOS 14.0

### Android Studio (Android)
1. Let Gradle sync complete
2. In `app/build.gradle` verify `applicationId "com.lumencatholic.app"`
3. Set `minSdk 24`, `targetSdk 34`

---

## Step 4 — Configure subscription products

### App Store Connect (iOS)
1. Go to https://appstoreconnect.apple.com → Your App → Subscriptions
2. Create subscription group: **Lumen Premium**
3. Add two products:
   - Product ID: `lumen_premium_monthly` — $4.99 / month
   - Product ID: `lumen_premium_yearly` — $39.99 / year
4. Submit for review (Apple reviews IAP products separately)

### Google Play Console (Android)
1. Go to your app → Monetize → Subscriptions
2. Create subscription: `lumen_premium_monthly` — base plan $4.99/month
3. Create subscription: `lumen_premium_yearly` — base plan $39.99/year

### RevenueCat dashboard
1. Create a new Project for Lumen
2. Add App Store app (paste your App Store Connect Shared Secret)
3. Add Google Play app (upload your service account JSON)
4. Go to Entitlements → Create entitlement named **premium**
5. Attach both product IDs to that entitlement
6. Go to Offerings → Create an offering, add both products as packages

---

## How to cut a new release

### 1. Make your web changes and build

```bash
npm run build
npx cap sync
```

### 2. Bump version numbers

**iOS** — in Xcode:
- Select App target → General → Version (e.g. 1.1.0) and Build (increment by 1)

**Android** — in `android/app/build.gradle`:
```gradle
versionName "1.1.0"
versionCode 2   // always increment by 1
```

Or use the Capacitor CLI:
```bash
npx cap-set-version 1.1.0 --build 2
```

### 3. Archive and upload — iOS

In Xcode:
1. Select **Any iOS Device** as the build target (not a simulator)
2. Product → Archive
3. In the Organizer window, click **Distribute App** → App Store Connect → Upload
4. In App Store Connect, go to your app → TestFlight or Submit for Review

### 4. Build signed bundle — Android

In Android Studio:
1. Build → Generate Signed Bundle / APK → Android App Bundle
2. Create or use existing keystore (keep the `.jks` file safe — you can never recover it)
3. Choose **release** build variant
4. Upload the `.aab` file to Play Console → Testing → Internal testing → Create new release

---

## How to roll back a bad release

### iOS
In App Store Connect → App Version History → select the previous approved version → click **Release This Version**.

### Android
In Play Console → your track → click the three-dot menu on the bad release → **Halt rollout**. Then promote the previous release from the archive.

---

## Keystore — Android signing

The release keystore lives at `android/app/lumen-release.jks` (created during first signed build).

**Store these securely — if lost, you can never update the app:**
- Keystore file path
- Keystore password
- Key alias
- Key password

Recommended: store in 1Password or similar under a "Lumen Android Keystore" entry.

---

## Environment variables / secrets

The app reads Supabase credentials from `.env`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

These are baked into the web bundle at build time. Never commit `.env` to git.

RevenueCat API keys live in `src/lib/purchases.ts` — those are public SDK keys (safe to ship in the app binary).
