import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import DefaultButton from "@/components/DefaultButton";

export default function StepEmail({ formData, setFormData, next }: any) {
  const [error, setError] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        className="text-white border border-[#444] rounded-lg p-3 w-64 mb-2"
      />
      {error ? <Text className="text-red-500">{error}</Text> : null}
      <DefaultButton
        className="text-[20px]"
        title="Next"
        onPress={async () => {
          if (!formData.email) {
            setError("Email is required");
            return;
          }

          try {
            const methods = await fetchSignInMethodsForEmail(
              auth,
              formData.email
            );

            if (methods.length > 0) {
              setError("Email already exists. Please use a different one.");
            } else {
              setError("");
              next();
            }
          } catch (err) {
            console.error(err);
            setError("Invalid email format or network issue.");
          }
        }}
      />
    </View>
  );
}
