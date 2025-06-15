import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import DefaultButton from '@/components/DefaultButton';

export default function StepPassword({ formData, setFormData, next }: any) {
  const [error, setError] = useState('');

  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        className="text-white border border-[#444] rounded-lg p-3 w-64 mb-4"
      />
      {error ? <Text className="text-red-500">{error}</Text> : null}
      <DefaultButton
        className="text-[20px]"
        title="Next"
        onPress={() => {
          if (!formData.password || formData.password.length < 6) {
            setError('Minimum 6 characters');
          } else {
            setError('');
            next();
          }
        }}
      />
    </View>
  );
}
