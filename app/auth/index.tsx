import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, ActivityIndicator } from 'react-native';
import DefaultButton from '@/components/DefaultButton';
import { login } from '@/services/firebase/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1C1C1E]">
        <ActivityIndicator size="large" color="#FF8700 " />
        <Text className="text-[#FF8700 ] text-lg ">Logging in...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <Text className="text-white text-2xl mb-5 font-bold">Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        className="text-white border border-[#444] rounded-lg p-3 w-64 mb-2"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="text-white border border-[#444] rounded-lg p-3 w-64 mb-5"
      />
      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      <View className="w-64 space-y-2">
        <DefaultButton className="text-[20px]" title="Login" onPress={handleLogin} />
        <Text className="text-gray-400 text-center mt-3">
          Don't have an account?{' '}
          <Text className="text-blue-500" onPress={() => router.push('/auth/signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
