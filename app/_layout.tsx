import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#1C1C1E]">
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
