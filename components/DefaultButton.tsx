import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface DefaultButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

const DefaultButton = ({ title, onPress, className }: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-[#FF8700] rounded-lg px-4 py-2 my-2`}
      onPress={onPress}
    >
      <Text className={`text-white text-center font-nunito ${className}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
