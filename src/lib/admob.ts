import { Capacitor } from "@capacitor/core";
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobInitializationOptions } from "@capacitor-community/admob";

// Replace these with your real AdMob unit IDs from admob.google.com
// During testing, use the test IDs below (they always show test ads)
export const ADMOB_IDS = {
  // Android test banner: ca-app-pub-3940256099942544/6300978111
  // iOS test banner:     ca-app-pub-3940256099942544/2934735716
  // Replace with your real IDs before publishing:
  android: "ca-app-pub-3940256099942544/6300978111",
  ios: "ca-app-pub-3940256099942544/2934735716",
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
