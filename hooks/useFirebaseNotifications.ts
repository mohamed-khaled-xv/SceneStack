// hooks/useFirebaseNotifications.ts
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { getApp } from "@react-native-firebase/app";
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

export default function useFirebaseNotifications() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const messaging = getMessaging(getApp());

    // 1. Ask permission for notifications (FCM)
    requestPermission(messaging).then((authStatus) => {
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        // 2. Get FCM token
        getToken(messaging).then((token) => {
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
    const unsubscribe = onMessage(messaging, async (remoteMessage) => {
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
