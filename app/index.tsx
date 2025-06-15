import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { View } from 'react-native';
import { auth } from '@/firebaseConfig';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      router.replace(user ? '/(tabs)' : '/auth');
    });

    return unsubscribe;
  }, []);

  return <View />;
}
