import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'se.svalla.app',
  appName: 'Svalla',
  webDir: 'out',
  server: {
    // Hybrid-läge: peka mot live-sajten tills vi gör statisk export
    url: 'https://svalla.se',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0d2a3e',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#0d2a3e',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Geolocation: {
      permissions: {
        location: 'always',
      },
    },
  },
}

export default config
