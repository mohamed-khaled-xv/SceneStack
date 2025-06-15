import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import DefaultButton from '@/components/DefaultButton';

const genreOptions = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi'];

export default function StepGenres({ formData, setFormData, next }: any) {
  const toggleGenre = (genre: string) => {
    const current = formData.preferredGenres || [];
    if (current.includes(genre)) {
      setFormData({ ...formData, preferredGenres: current.filter((g: string) => g !== genre) });
    } else {
      setFormData({ ...formData, preferredGenres: [...current, genre] });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <Text className="text-white text-xl mb-4">Select your favorite genres</Text>
      <View className="flex-row flex-wrap justify-center mb-4">
        {genreOptions.map((genre) => (
          <TouchableOpacity
            key={genre}
            onPress={() => toggleGenre(genre)}
            className={`px-3 py-2 m-1 rounded-lg ${
              formData.preferredGenres.includes(genre)
                ? 'bg-blue-500'
                : 'bg-gray-600'
            }`}
          >
            <Text className="text-white">{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <DefaultButton className="text-[20px]" title="Next" onPress={next} />
    </View>
  );
}
