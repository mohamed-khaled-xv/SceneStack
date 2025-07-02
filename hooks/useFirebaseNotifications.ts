import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function useFirebaseNotifications(): string | null {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 1. Request notification permission
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          messaging()
            .getToken()
            .then(fcmToken => {
              setToken(fcmToken);
              console.log('FCM Token:', fcmToken);
            });
        } else {
          Alert.alert(
            'Notification permission denied',
            'Please enable notifications in settings.'
          );
        }
      });

    // 2. Handle foreground messages with Alert
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || JSON.stringify(remoteMessage)
      );
    });

    // 3. Optional: Handle background/quit state notifications (no UI here)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Can log or analytics here if needed
      console.log('Message handled in the background!', remoteMessage);
    });

    // Clean up listener on unmount
    return unsubscribe;
  }, []);

  return token;
}
