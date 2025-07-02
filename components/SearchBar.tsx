//components/SearchBar.tsx
import { View, Image, TextInput } from 'react-native';
import React from 'react';
import { icons } from "../constants/icons";

const SearchBar = ({
  value,
  onChangeText,
  onSubmitEditing, // optional: for handling submit/search action
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}) => {
  return (
    <View className="h-15 bg-[#2C2C2E] flex-row items-center my-5 mx-3 px-5 py-2 gap-2 rounded-3xl">
      <Image source={icons.search} className="w-7 h-7" resizeMode="contain" />
      <TextInput
        placeholder="Search for movies"
        placeholderTextColor="#A9A9A9"
        className="flex-1 text-white"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
