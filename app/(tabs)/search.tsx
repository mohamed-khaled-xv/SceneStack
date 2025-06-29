import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";

import React from "react";

const search = () => {
  return <SafeAreaView className="flex-1 bg-[#181A20]">
    <View className="flex-1 justify-center items-center">
      <Text className="text-white text-lg">Search Screen</Text>
        <SearchBar />
    </View>
  </SafeAreaView>;
};

export default search;
