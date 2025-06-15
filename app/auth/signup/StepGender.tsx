import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DefaultButton from '@/components/DefaultButton';

const genderOptions = [ 'Male', 'Female', 'Other'];

export default function StepGender({ formData, setFormData, next }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">

      <View className="w-full flex-row flex-wrap justify-center gap-4 mb-6">
        {genderOptions.map((option) => {
          const isSelected = formData.gender === option;

          return (
            <TouchableOpacity
              key={option}
              onPress={() => setFormData({ ...formData, gender: option })}
              className={`w-36 py-3 px-4 rounded-xl border ${
                isSelected
                  ? 'bg-[#0A84FF] border-[#0A84FF]'
                  : 'bg-[#2C2C2E] border-[#555]'
              }`}
            >
              <Text
                className={`text-center text-base ${
                  isSelected ? 'text-white font-bold' : 'text-gray-300'
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <DefaultButton className="text-[20px]" title="Next" onPress={next} />
    </View>
  );
}
