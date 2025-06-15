import '@/firebaseConfig'
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DatabaseProvider } from "../database";
import "./global.css";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "inter-variable": require("./../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "nunito-variable": require("./../assets/fonts/Nunito-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <DatabaseProvider>
        <SafeAreaView className="flex-1 bg-[#1C1C1E]">
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          >
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="movie/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="cast/[id]" options={{ headerShown: false }} />
          </Stack>
          
        </SafeAreaView>
      </DatabaseProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
