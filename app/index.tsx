import { useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '@/firebaseConfig';

export default function IndexRedirect() {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [initialUser, setInitialUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setInitialUser(user); // will be null or user
      setInitializing(false); // only call after we have a user or null after hydration
    });
    return unsubscribe;
  }, []);

  // Only render spinner while initializing/hydrating user state
  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181A20' }}>
        <ActivityIndicator size="large" color="#FF8700" />
      </View>
    );
  }

  // At this point, user state is hydrated and ready to redirect
  if (initialUser) {
    router.replace('/(tabs)');
  } else {
    router.replace('/auth');
  }

  return null;
}
