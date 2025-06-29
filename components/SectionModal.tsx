import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import Modal from "react-native-modal";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface SectionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  movies: any[]; // You can use Movie[] if you have a type for movie
  onSelectMovie?: (movie: any) => void; // Optional callback
}
export default function SectionModal({ visible, onClose, title, movies, onSelectMovie }: SectionModalProps) {
    return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropOpacity={0.45}
      propagateSwipe
    >
      <View
        className="bg-[#181A20] rounded-t-3xl px-4 pt-4 pb-6"
        style={{ minHeight: SCREEN_HEIGHT * 0.80, maxHeight: SCREEN_HEIGHT * 0.85 }}
      >
        {/* Drag Handle */}
        <View className="items-center mb-2">
          <View className="w-10 h-1.5 bg-[#333] rounded-full mb-3" />
        </View>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-xl font-bold">{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* 3-Column List */}
        <FlatList
          data={movies}
          numColumns={3}
          key={3}
          keyExtractor={(item) => item.id?.toString?.() || String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectMovie?.(item)}
              className="flex-1 justify-center mb-4"
              style={{ maxWidth: "33%" }} // Adjust as needed
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className="w-28 h-48 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-white w-32 text-m text-left mt-2" numberOfLines={2} >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </View>
    </Modal>
  );
}
