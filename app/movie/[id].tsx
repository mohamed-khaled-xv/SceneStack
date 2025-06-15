import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants/icons";
import { useSQLiteContext } from "../../database";
import {
  insertFavoriteMovie,
  isMovieFavorite,
  deleteFavoriteMovie,
} from "../../database/repositories/FavoriteMoviesRepository";
import {
  insertToWatchMovie,
  isMovieToWatch,
  deleteToWatchMovie,
} from "../../database/repositories/ToWatchMoviesRepository";
import { getCast } from "../../services/getCast";
import { getMovieDetails } from "../../services/getMovieDetails";
import { CastMember } from "../../types/Cast";
import { MovieDetailsInterface } from "../../types/movie";
import TooltipMenu from "../../components/TooltipMenu";
import {addToWatchHistory} from "@/services/firebase/watchHistory";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [Bookmark, setBookmark] = useState(false);
  const [movieDetails, setMovieDetails] =
    useState<MovieDetailsInterface | null>(null);
  const [toWatch, setToWatch] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const router = useRouter();
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const details = await getMovieDetails(Number(id));
        setMovieDetails(details);
        await addToWatchHistory(details.id.toString());
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      if (movieDetails) {
        try {
          const castData = await getCast(movieDetails.id);
          setCast(castData);
        } catch (error) {
          console.error("Failed to fetch cast:", error);
        }
      }
    };
    fetchCast();
  }, [movieDetails]);

  useEffect(() => {
    const checktoWatch = async () => {
      if (movieDetails) {
        const toWatch = await isMovieToWatch(db, movieDetails.id);
        setToWatch(toWatch);
      }
    };
    checktoWatch();
  }, [movieDetails]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (movieDetails) {
        const isFav = await isMovieFavorite(db, movieDetails.id);
        setFavorite(isFav);
      }
    };
    checkFavorite();
  }, [movieDetails]);



  const watchlistHandler = async (movieDetails: MovieDetailsInterface) => {
    if (!toWatch) {
      setToWatch(true);
      await insertToWatchMovie(db, {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
      });
      console.log("Saved to watchlist:", movieDetails);
    } else {
      setToWatch(false);
      await deleteToWatchMovie(db, movieDetails.id);
      console.log("Removed from watchlist:", movieDetails);
    }
  };

  const favoriteHandler = async (movieDetails: MovieDetailsInterface) => {
    if (!favorite) {
      setFavorite(true);
      await insertFavoriteMovie(db, {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
      });
    } else {
      setFavorite(false);
      await deleteFavoriteMovie(db, movieDetails.id);
    }
  };

  return (
    <View className="flex-1 bg-[#1C1C1E]">

      {movieDetails ? (
        <ScrollView>
          <ScrollView className="width-full h-96 ">
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
              }}
              className="bg-center bg-cover"
            >
              {/* Back Button */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-10 left-5 z-50"
              >
                <Ionicons name="arrow-back-circle" size={36} color="white" />
              </TouchableOpacity>

              {/* Bookmark Button */}
              <View className="absolute top-10 right-5 z-50">
                <TooltipMenu
                  icon={
                    <Ionicons
                      name={Bookmark ? "heart" : "heart-outline"}
                      size={32}
                      color="white"
                    />
                  }
                  actions={[
                    {
                      icon: toWatch ? "list-circle" : "list-circle-outline",
                      onPress: () => watchlistHandler(movieDetails!),
                      color: "orange",
                      name: toWatch
                        ? "Remove from Watchlist"
                        : "Add to Watchlist",
                    },

                    {
                      icon: favorite ? "star" : "star-outline",
                      onPress: () => favoriteHandler(movieDetails!),
                      color: "orange",
                      name: favorite
                        ? "Remove from Favorites"
                        : "Add to Favorites",
                    },
                  ]}
                />
              </View>

              {/* Gradient fade at the bottom */}
              <LinearGradient
                colors={["transparent", "#181A20"]}
                style={{ height: 350, width: "100%" }}
              />
            </ImageBackground>
          </ScrollView>

          {/* Movie Details Section */}
          <View className="p-4 ml-0">
            <View className="flex-row ml-2">
              <Image source={icons.star} className="w-6 h-6" />
              <Text className="text-yellow-400 font-bold font-nunito text-xl ml-1">
                {movieDetails.vote_average.toFixed(1)}
              </Text>
              <Text className="text-white text-xl font-nunito-semibold ml-3">
                ({movieDetails.vote_count} votes)
              </Text>
            </View>
            <Text className="text-white text-[36px] font-inter  ml-3">
              {movieDetails.title}
            </Text>
            <View className="flex-row  mt-2 ml-3">
              {movieDetails.genres.map((genre) => (
                <View
                  className="bg-gray-600 rounded-full px-3 py-1 mr-2"
                  key={genre.id}
                >
                  <Text
                    className="text-white text-base font-nunito"
                    key={genre.id}
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text className="text-white text-xl font-nunito mt-2 ml-3">
              {movieDetails.overview}
            </Text>
            <Text className="text-white font-inter text-[20px] py-5  ml-3">
              Cast
            </Text>
            <FlatList
              data={cast}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="ml-3"
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mr-4 max-w-24"
                  onPress={() =>
                    router.push({
                      pathname: "../cast/[id]" as const,
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                    }}
                    className="w-24 h-24 rounded-[40px] border-2 border-gray-600"
                  />
                  <Text className="text-white text-sm font-nunito mt-2">
                    {item.name}
                  </Text>
                  <Text className="text-gray-400 text-xs font-nunito">
                    {item.character}
                  </Text>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default MovieDetails;
