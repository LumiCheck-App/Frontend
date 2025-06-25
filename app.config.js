// app.config.js
export default {
  expo: {
    name: 'lumicheck',
    slug: 'lumicheck',
    version: '1.0.0',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    scheme: 'lumicheck',
    linking: {
      // This is where linking should be
      prefixes: ['lumicheck://', 'exp+lumicheck://'],
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ['remote-notification'],
        NSUserTrackingUsageDescription:
          'Este app utiliza notificações para manter você informado sobre atualizações importantes.',
        UIUserNotificationSettings: {
          UIUserNotificationTypeAlert: true,
          UIUserNotificationTypeBadge: true,
          UIUserNotificationTypeSound: true,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icons/icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.anonymous.lumicheck',
    },
    web: {
      favicon: './assets/icons/icon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-font',
      'expo-dev-client',
      '@react-native-firebase/app',
      [
        '@react-native-firebase/messaging',
        {
          backgroundMessageHandler: './src/firebase-messaging.js',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '72c293d0-6598-46a1-805b-70374430d035',
      },
    },
    owner: 'rodrigomgraca',
  },
};
