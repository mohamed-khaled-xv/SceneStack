import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import DefaultButton from "@/components/DefaultButton";

export default function StepLanguage({ formData, setFormData, submit }: any) {
  const languages = ["English", "Arabic"];
  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <Text className="text-white text-xl mb-4">Language Preference</Text>

      <View className=" rounded-lg mb-4 w-64">
        {languages.map((lang) => {
          const isSelected = formData.language === lang;


          return (
          <View key={lang} className="flex-row items-center py-2 px-3">
            <TouchableOpacity
              onPress={() => setFormData({ ...formData, language: lang })}
              className={`flex-1 ${isSelected ? 'bg-[#0A84FF]' : 'bg-[#2C2C2E]'} rounded-lg p-2`}
            >
              <Text className={`text-center text-base ${isSelected ? 'text-white font-bold' : 'text-gray-300'}`}>
                {lang}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      </View>

      <DefaultButton className="text-[20px]" title="Finish" onPress={submit} />
    </View>
  );
}
