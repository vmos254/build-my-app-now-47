import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobInitializationOptions } from "@capacitor-community/admob";

// Replace these with your real AdMob unit IDs from admob.google.com
// During testing, use the test IDs below (they always show test ads)
export const ADMOB_IDS = {
  android: "ca-app-pub-1385820604802800/7245756150",
  ios: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX", // ← replace after adding iOS app in AdMob
};

export async function initializeAdMob() {
  if (!Capacitor.isNativePlatform()) return;
  const options: AdMobInitializationOptions = {
    requestTrackingAuthorization: true, // iOS ATT prompt
    testingDevices: [],
    initializeForTesting: false,
  };
  await AdMob.initialize(options);
}

export async function showBanner() {
  if (!Capacitor.isNativePlatform()) return;
  const adId = Capacitor.getPlatform() === "ios" ? ADMOB_IDS.ios : ADMOB_IDS.android;
  const options: BannerAdOptions = {
    adId,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: false,
  };
  await AdMob.showBanner(options);
}

export async function hideBanner() {
  if (!Capacitor.isNativePlatform()) return;
  await AdMob.hideBanner();
}

export async function removeBanner() {
  if (!Capacitor.isNativePlatform()) return;
  await AdMob.removeBanner();
}
