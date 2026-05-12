import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lumencatholic.app',
  appName: 'Lumen - Catholic Bible',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: '#5b1a1f',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#5b1a1f',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#5b1a1f',
    },
  },
};

export default config;
