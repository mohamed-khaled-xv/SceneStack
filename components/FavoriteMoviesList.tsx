import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
} from "react-native";
import { useSQLiteContext } from "../database";
import {
  getAllFavoriteMovies,
  deleteFavoriteMovie,
} from "../database/repositories/FavoriteMoviesRepository";
import { Movie } from "../types/movie"; // Adjust the import path as necessary
import { Swipeable } from "react-native-gesture-handler"; // Ensure you have this package installed

const FavoriteMoviesList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const db = useSQLiteContext(); // Assuming you have a context to access the SQLite database

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchFavoriteMovies = async () => {
        if (!db) return;
        setLoading(true);
        try {
          const response = await getAllFavoriteMovies(db);
          if (isActive) setFavoriteMovies(response);
        } catch (error) {
          if (isActive)
            setError(
              error instanceof Error
                ? error.message
                : "An unexpected error occurred"
            );
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchFavoriteMovies();

      return () => {
        isActive = false;
      };
    }, [db])
  );

  const handleDelete = async (movieId: number) => {
    if (!db) return;
    try {
      await deleteFavoriteMovie(db, movieId);
      setFavoriteMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
      Vibration.vibrate(50);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const renderRightActions = (itemId: number) => (
    <TouchableOpacity
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
      }}
      onPress={() => handleDelete(itemId)}
    >
      <Text className="text-white font-inter">Remove</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading favorite movies...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  if (favoriteMovies.length === 0) {
    return <Text>No favorite movies found.</Text>;
  }
  return (
    <FlatList
      data={favoriteMovies}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      ListHeaderComponent={
        <View className="flex items-center justify-center  mb-4">
          <Text className="text-2xl text-white font-inter rounded-md text-center">
            Favorite Movies
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "../movie/[id]" as const,
                params: { id: String(item.id) },
              })
            }
          >
            <View className="p-4 border-b border-gray-200 flex-row items-center rounded-sm bg-gray-800">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                className="w-16 h-24 rounded-md mr-4"
                resizeMode="cover"
              />
              <View>
                <Text className="text-[24px] text-white font-nunito">
                  {item.title}
                </Text>
                <Text className="text-[24px] text-gray-500 font-nunito">
                  {item.release_date?.split("-")[0]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      )}
    />
  );
};

export default FavoriteMoviesList;
