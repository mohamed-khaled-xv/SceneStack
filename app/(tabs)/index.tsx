import { getUserMetadata } from "@/services/firebase/users";
import { getWatchHistory } from "@/services/firebase/watchHistory";
import { getMovieList } from "@/services/getMovieLists";
import { UserMetadataInterface } from "@/types/user";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/icons";
import { MovieGenreMap } from "../../constants/moviegenre";
import { getMovies } from "../../services/getMovies";
import { Movie } from "../../types/movie";
import SectionCarousel from "@/components/SectionCarousel";

const categories = Object.keys(MovieGenreMap);

const IndexScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(true);

  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);

  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedLoading, setTopRatedLoading] = useState(true);

  const [userMetadata, setUserMetadata] =
    useState<UserMetadataInterface | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setMoviesLoading(true);
    const fetchMovies = async () => {
      try {
        const genreId = selectedCategory
          ? MovieGenreMap[selectedCategory]
          : undefined;
        const response = await getMovies({
          sortBy: "popularity.desc",
          genreId,
        });
        setMovies(response.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      setMoviesLoading(false);
    };
    fetchMovies();
  }, [selectedCategory]);

  // Watch History
  useFocusEffect(
    useCallback(() => {
      setHistoryLoading(true);
      let isActive = true;
      const fetchWatchHistory = async () => {
        try {
          const history = await getWatchHistory();
          if (isActive) setWatchHistory(history || []);
        } catch (error) {
          console.error("Failed to fetch watch history:", error);
        }
        setHistoryLoading(false);
      };
      fetchWatchHistory();
      return () => {
        isActive = false;
      };
    }, [])
  );

  // User Metadata
  useEffect(() => {
    setUserLoading(true);
    const fetchUserMetadata = async () => {
      try {
        const metadata = await getUserMetadata();
        setUserMetadata(metadata || null);
      } catch (error) {
        console.error("Failed to fetch user metadata:", error);
      }
      setUserLoading(false);
    };
    fetchUserMetadata();
  }, []);

  // Now Playing
  useEffect(() => {
    setNowPlayingLoading(true);
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await getMovieList("now_playing", 1);
        setNowPlayingMovies(response.results || []);
      } catch (error) {
        console.error("Failed to fetch now playing movies:", error);
      }
      setNowPlayingLoading(false);
    };
    fetchNowPlayingMovies();
  }, []);

  // Upcoming Movies
  useEffect(() => {
    setUpcomingLoading(true);
    const fetchUpcomingMovies = async () => {
      try {
        const response = await getMovieList("upcoming", 1);
        setUpcomingMovies(response.results || []);
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      }
      setUpcomingLoading(false);
    };
    fetchUpcomingMovies();
  }, []);

  // Top Rated Movies
  useEffect(() => {
    setTopRatedLoading(true);
    const fetchTopRatedMovies = async () => {
      try {
        const response = await getMovieList("top_rated", 1);
        setTopRatedMovies(response.results || []);
      } catch (error) {
        console.error("Failed to fetch top rated movies:", error);
      }
      setTopRatedLoading(false);
    };
    fetchTopRatedMovies();
  }, []);

  // Main loading is TRUE if any are loading
  const loading =
    moviesLoading ||
    historyLoading ||
    nowPlayingLoading ||
    userLoading ||
    upcomingLoading ||
    topRatedLoading;

  // ---- Header Rendering ----
  const renderHeader = () => (
    <View>
      {userMetadata && (
        <View className="flex-row items-center justify-between px-5 py-4 bg-[#232732] rounded-3xl shadow-lg mx-3 mt-4">
          {/* Left: Welcome text */}
          <View>
            <Text className="text-gray-400 text-base font-inter">
              Welcome 👋
            </Text>
            <Text className="text-white text-xl font-inter mt-1">
              {userMetadata.name}
            </Text>
          </View>

          {/* Right: Profile avatar */}
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            activeOpacity={0.7}
            className="ml-4"
            style={{}}
          >
            <Image
              source={icons.homeProfile}
              className="w-14 h-14 rounded-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Recently Viewed */}
      {watchHistory.length > 0 && (
        <SectionCarousel
          title="Recently Viewed Movies"
          movies={watchHistory}
          onPressMovie={(movie) =>
            router.push({
              pathname: "../movie/[id]" as const,
              params: { id: String(movie.id) },
            })
          }
        />
      )}

      {/* Now Playing */}
      {nowPlayingMovies.length > 0 && (
        <SectionCarousel
          title="Now Playing"
          movies={nowPlayingMovies}
          onPressMovie={(movie) =>
            router.push({
              pathname: "../movie/[id]" as const,
              params: { id: String(movie.id) },
            })
          }
        />
      )}

      {/* Upcoming Movies */}
      {upcomingMovies.length > 0 && (
        <SectionCarousel
          title="Upcoming Movies"
          movies={upcomingMovies}
          onPressMovie={(movie) =>
            router.push({
              pathname: "../movie/[id]" as const,
              params: { id: String(movie.id) },
            })
          }
        />
      )}

      {/* Top Rated Movies */}
      {topRatedMovies.length > 0 && (
        <SectionCarousel
          title="Top Rated Movies"
          movies={topRatedMovies}
          onPressMovie={(movie) =>
            router.push({
              pathname: "../movie/[id]" as const,
              params: { id: String(movie.id) },
            })
          }
        />
      )}

      {/* Categories */}
      {movies.length > 0 && (
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
                  className={
                    selectedCategory === item
                      ? "text-black font-bold"
                      : "text-white"
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            className="py-5"
          />
        </View>
      )}
    </View>
  );

  // ---- Main Return ----
  return (
    <SafeAreaView className="flex-1 bg-[#181A20]">
      <FlatList
        data={movies}
        keyExtractor={(item) => `movie-${item.id}`}
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
            <Text className="text-white mt-2" numberOfLines={2}>
              {item.title}
            </Text>
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
