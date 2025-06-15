//app/auth/signup/StepPreferences.tsx
import React, { useState } from 'react';
import { View, Text, Button, Switch, TouchableOpacity } from 'react-native';

export default function StepPreferences({ formData, setFormData, submit }: any) {
  const genreOptions = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi'];

  const toggleGenre = (genre: string) => {
    const selected = formData.preferredGenres || [];
    if (selected.includes(genre)) {
      setFormData({
        ...formData,
        preferredGenres: selected.filter((g: string) => g !== genre),
      });
    } else {
      setFormData({
        ...formData,
        preferredGenres: [...selected, genre],
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#1C1C1E] px-4">
      <Text className="text-white text-xl font-bold mb-4">Preferences</Text>

      <Text className="text-white mb-2">Select genres:</Text>
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

      <View className="flex-row items-center mt-4">
        <Text className="text-white mr-2">Dark Mode</Text>
        <Switch
          value={formData.darkMode}
          onValueChange={(val) =>
            setFormData({ ...formData, darkMode: val })
          }
        />
      </View>

      <Button title="Finish" onPress={submit} />
    </View>
  );
}
