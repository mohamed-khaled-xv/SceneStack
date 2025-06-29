import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import SectionModal from "./SectionModal"; // Adjust import path as needed

interface SectionCarouselProps {
  title: string;
  movies: any[]; // You can use Movie[] if you have that type
  onPressMovie: (movie: any) => void;
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
  title,
  movies,
  onPressMovie,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (!movies || movies.length === 0) return null;

  return (
    <View className="p-4">
      <Text className="text-white text-lg font-inter mb-2">{title}</Text>
      <TouchableOpacity
        className="absolute right-4 top-4"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text className="text-[#FF8700] text-sm">View All</Text>
      </TouchableOpacity>
      {/* Horizontal carousel */}
      <FlatList
        data={movies.slice(0, 10)} // show only first 10, change as needed
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id?.toString?.() || String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mr-3"
            activeOpacity={0.7}
            onPress={() => onPressMovie(item)}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-white w-32 flex-shrink mt-2" numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Modal for View All */}
      <SectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={title}
        movies={movies}
        onSelectMovie={(movie) => {
          setModalVisible(false);
          onPressMovie(movie);
        }}
      />
    </View>
  );
};

export default SectionCarousel;
