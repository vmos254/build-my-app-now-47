import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lumencatholic.app',
  appName: 'Lumen',
  webDir: 'dist',
  server: {
    url: 'https://7d1c2d52-6965-43ec-a57f-de36f904b3c7.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: '#5b1a1f',
  },
};

export default config;
