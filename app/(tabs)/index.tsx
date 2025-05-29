import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { MovieGenreMap } from "../../constants/moviegenre";
import { getMovies } from "../../services/getMovies";
import { Movie } from "../../types/movie";
import { useRouter } from "expo-router";

const categories = Object.keys(MovieGenreMap);

const IndexScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const genreId = selectedCategory
          ? MovieGenreMap[selectedCategory]
          : undefined;
        const response = await getMovies({
          sortBy: "popularity.desc",
          genreId,
        });
        setMovies(response.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, [selectedCategory]);

  const renderHeader = () => (
    <View>
      <SearchBar />

      <View className="p-4">
        <Text className="text-white text-lg font-inter">Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                item !== selectedCategory
                  ? setSelectedCategory(item)
                  : setSelectedCategory("")
              }
              activeOpacity={0.6}
              className={`p-3 mr-2 rounded-lg ${
                selectedCategory === item ? "bg-[#FF8700]" : "bg-[#2C2C2E]"
              }`}
            >
              <Text
                className={`${
                  selectedCategory === item
                    ? "text-black font-bold"
                    : "text-white"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          className="py-5"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#181A20]">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-1/3 p-2"
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "../movie/[id]" as const,
                params: { id: String(item.id) },
              })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              className="w-full h-60 rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-white mt-2">{item.title}</Text>
            <Text className="text-gray-400 text-sm">
              {item.release_date ? item.release_date.split("-")[0] : "Unknown"}
            </Text>
            <View className="flex-row items-center mt-1">
              <Image
                source={icons.star}
                className="w-4 h-4 mr-1"
                resizeMode="contain"
              />
              <Text className="text-yellow-400">
                {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          loading ? (
            <View className="flex-1 items-center justify-center mt-10">
              <ActivityIndicator size="large" color="#FF8700" />
              <Text className="text-white mt-4">Loading movies...</Text>
            </View>
          ) : (
            <Text className="text-white text-center mt-8">No movies found</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default IndexScreen;
