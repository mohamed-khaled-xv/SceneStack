import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import { getMovies } from "../../services/getMovies";
import { Movie } from "../../types/movie";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // <--- error state
  const router = useRouter();

  const NavigateToMovie = (id: number) => {
    router.push(`/movie/${id}`);
  };

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setError(null); // clear error if empty
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null); // clear old error
      try {
        const data = await getMovies({ query: searchQuery });
        setResults(
          (data.results || []).filter(
            (movie: Movie) => !!movie.poster_path && movie.vote_average !== 0
          )
        );
      } catch (err: any) {
        setResults([]);
        setError(
          err?.response?.data?.status_message ||
            err?.message ||
            "Failed to fetch movies. Please try again."
        );
      }
      setLoading(false);
    }, 400)
  ).current;

  // Clear error when the query changes
  useEffect(() => {
    if (error && query) setError(null);
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const isInitial = !query && !loading && results.length === 0 && !error;

  return (
    <SafeAreaView className="flex-1 bg-[#181A20]">
      {isInitial ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SearchBar value={query} onChangeText={setQuery} />

          {error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500 text-base mt-12 text-center">
                {error}
              </Text>
            </View>
          ) : loading ? (
            <ActivityIndicator color="#FF8700" style={{ marginTop: 32 }} />
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => `movie-${item.id}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center p-3"
                  onPress={() => NavigateToMovie(Number(item.id))}
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
                    }}
                    className="w-16 h-24 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-white text-base font-bold">
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {item.release_date?.split("-")[0]}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Image
                        source={require("../../assets/icons/star.png")}
                        className="w-4 h-4 mr-1"
                        resizeMode="contain"
                      />
                      <Text className="text-yellow-400 text-xs font-semibold">
                        {item.vote_average?.toFixed(1) || "N/A"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() =>
                query && !loading ? (
                  <Text className="text-white text-center mt-10">
                    No results found
                  </Text>
                ) : null
              }
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
