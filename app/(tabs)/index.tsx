import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/icons";
import SearchBar from "../../components/SearchBar";

const categories = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

const index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Action");

  return (
    <View className="flex-1 bg-[#181A20]">
      <View className="h-20 bg-[#FF8700] flex-row items-center px-4 gap-2">
        <Text className="font-bold text-white flex-1">
          Welcome, Let's relax and watch a movie!
        </Text>
        <Image
          source={icons.person}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>

      <SearchBar />

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-white text-lg font-bold">Categories</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row py-5"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.6}
                className={`
    p-3 mx-1 rounded-lg
    ${selectedCategory === category ? "bg-[#FF8700]" : "bg-[#2C2C2E]"}
  `}
              >
                <Text
                  className={`
      ${selectedCategory === category ? "text-black font-bold" : "text-white"}
    `}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
