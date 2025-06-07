import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllMovies } from '../../database/repositories/MovieRepository';
import { Movie } from '../../types/Movie';

import { useFocusEffect } from 'expo-router';
import React from 'react';

const Bookmark = () => {
  const db = useSQLiteContext();
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  const fetchBookmarkedMovies = useCallback(async () => {
    const response = await getAllMovies(db);
    setBookmarkedMovies(response);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchBookmarkedMovies();
    }, [fetchBookmarkedMovies])
  );

  if(!bookmarkedMovies.length) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#1C1C1E]">
        <Text className="text-white">No Bookmarked Movies</Text>
      </SafeAreaView>
    );
  }

  return (
    
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
      <View className="p-4">
        <Text className="text-white text-lg font-bold mb-4">Bookmarked Movies</Text>
        {bookmarkedMovies.map(movie => (
          <View key={movie.id} className="mb-4">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              className="w-1/2 h-48 rounded-lg mb-2"
            />
            <Text className="text-white">{movie.title}</Text>
            <Text className="text-gray-400">{movie.release_date}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default Bookmark;