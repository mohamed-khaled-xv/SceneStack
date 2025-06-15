import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DefaultButton from "../../../components/DefaultButton"; // Adjust the import path as necessary

export default function StepName({ formData, setFormData, next }: any) {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5 z-50"
      >
        <Ionicons name="arrow-back-circle" size={36} color="white" />
      </TouchableOpacity>
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        className="text-white border border-[#444] rounded-lg p-3 w-64 mb-4"
      />
      <DefaultButton title="Next" onPress={next} />
    </View>
  );
}
