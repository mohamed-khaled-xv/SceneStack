// hooks/useFirebaseNotifications.ts
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";

export default function useFirebaseNotifications() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    // 1. Ask permission for notifications (FCM)
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          // 2. Get FCM token
          messaging()
            .getToken()
            .then(token => {
              setFcmToken(token);
              console.log("FCM Token:", token);
            });
        } else {
          console.warn("Notification permission denied");
        }
      });

    // 3. Configure notification handler for foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // 4. Handle foreground FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title ?? "Notification",
          body:
            remoteMessage.notification?.body ??
            JSON.stringify(remoteMessage.data),
          data: remoteMessage.data,
        },
        trigger: null, // Show immediately
      });
    });

    return unsubscribe;
  }, []);

  return fcmToken;
}
