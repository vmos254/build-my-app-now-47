# Lumen Mobile Launch Checklist

## A. One-time setup on your MacBook (~1 hour)

```bash
# 1. Clone the repo Lovable just created on GitHub
git clone <your-github-url>
cd <repo>

# 2. Install dependencies
npm install

# 3. Add native platforms
npx cap add ios
npx cap add android

# 4. Build the web app
npm run build

# 5. Sync the build into iOS & Android shells
npx cap sync

# 6. Generate all icon + splash sizes from assets/icon.png and assets/splash.png
npm i -D @capacitor/assets
npx capacitor-assets generate

# 7. Open the native projects
npx cap open ios       # opens Xcode
npx cap open android   # opens Android Studio
```

## B. Developer accounts (do today, in parallel)

- [ ] Apple Developer Program — https://developer.apple.com/programs/  ($99/yr)
- [ ] Google Play Console — https://play.google.com/console/signup ($25 one-time)
- [ ] Custom domain pages live: /privacy, /terms, /support

## C. App Store Connect (iOS)

1. Create new app in App Store Connect with bundle ID `com.lumencatholic.app`
2. Fill listing using `docs/STORE_LISTING.md`
3. Upload screenshots (see required sizes in store listing doc)
4. In Xcode: Signing & Capabilities → select your Team → Product → Archive → Distribute App → App Store Connect
5. Add subscriptions:
   - In App Store Connect → Subscriptions → New Group ("Lumen Premium")
   - Add product ID: `lumen_premium_monthly` ($4.99 / mo)
   - Add product ID: `lumen_premium_yearly` ($39.99 / yr)
6. Submit for review

## D. Play Console (Android)

1. Create new app, package name `com.lumencatholic.app`
2. In Android Studio: Build → Generate Signed Bundle (.aab) → upload to Play Console
3. Fill all required questionnaires (data safety, content rating, target audience)
4. Add subscriptions:
   - Monetize → Subscriptions → Create base plan
   - Product IDs: `lumen_premium_monthly`, `lumen_premium_yearly`
5. Submit for review (closed testing → production)

## E. Before submitting (CRITICAL)

In `capacitor.config.ts`, **REMOVE the `server.url` block** so the app bundles your built code instead of loading from the Lovable preview:

```ts
// REMOVE THIS for production builds:
server: {
  url: '...',
  cleartext: true,
},
```

Then rebuild:
```bash
npm run build && npx cap sync
```

## F. Subscriptions (when ready)

Install RevenueCat (recommended — free up to $2.5k MTR):
```bash
npm i @revenuecat/purchases-capacitor
npx cap sync
```
RevenueCat handles both Apple and Google IAP with one SDK and gives you a dashboard.
Sign up at https://app.revenuecat.com — free.

## G. After both apps are live

- [ ] Add "Download on App Store" + "Get it on Google Play" badges to lumencatholic.com
- [ ] Update privacy policy with actual store links
- [ ] Email early users that mobile is live
