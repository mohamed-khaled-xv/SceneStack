import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCastDetails, getCastMovies } from "../../services/getCastDetails";
import { CastDetail } from "../../types/Cast";
import { MovieDetailsInterface } from "../../types/movie";

const CastDetails = () => {
  const { id } = useLocalSearchParams();
  const [castDetails, setCastDetails] = useState<CastDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [castMovies, setCastMovies] = useState<MovieDetailsInterface[]>([]);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getCastDetails(Number(id));
        setCastDetails(details);
        console.log("Cast Details:", details.id);
      } catch (error) {
        console.error("Failed to fetch cast details:", error);
        setError(
          `Failed to fetch cast details: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [id]);

  useEffect(() => {
    const fetchCastMovies = async () => {
      if (castDetails) {
        try {
          const movies = await getCastMovies(castDetails.id);
          setCastMovies(movies);
        } catch (error) {
          console.error("Failed to fetch cast movies:", error);
        }
      }
    };
    fetchCastMovies();
  }, [castDetails]);

  const handleMoviePress = (movieId: number) => {
    router.push({
      pathname: "../movie/[id]" as const,
      params: { id: String(movieId) },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1C1C1E]">
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text className="text-white mt-4">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1C1C1E] p-4">
        <Text className="text-red-400 text-center">{error}</Text>
      </View>
    );
  }

  if (!castDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1C1C1E]">
        <Text className="text-gray-400">No cast details found.</Text>
      </View>
    );
  }

  const openIMDB = () => {
    if (castDetails.imdb_id) {
      Linking.openURL(`https://www.imdb.com/name/${castDetails.imdb_id}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#1C1C1E]">
      {/* Image with Gradient and Close Button */}
      <View className="relative">
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${castDetails.profile_path}`,
          }}
          className="w-full h-96"
          imageStyle={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          {/* Gradient overlay */}
          <LinearGradient
            colors={["transparent", "rgba(28,28,30,0.8)", "#1C1C1E"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          />

          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-5 z-50"
          >
            <Ionicons name="arrow-back-circle" size={36} color="white" />
          </TouchableOpacity>

          {/* Name overlay */}
          <View className="absolute bottom-4 left-5" style={{ zIndex: 10 }}>
            <Text className="text-3xl font-bold text-white">
              {castDetails.name}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Known For */}
        <Text className="text-lg text-gray-400 mb-1">
          Known For:{" "}
          <Text className="text-white">{castDetails.known_for_department}</Text>
        </Text>

        {/* Place of Birth */}
        {castDetails.place_of_birth && (
          <Text className="text-lg text-gray-400 mb-1">
            Place of Birth:{" "}
            <Text className="text-white">{castDetails.place_of_birth}</Text>
          </Text>
        )}

        {/* Date of Birth */}
        {castDetails.birthday && (
          <Text className="text-lg text-gray-400 mb-4">
            Date of Birth:{" "}
            <Text className="text-white">
              {new Date(castDetails.birthday).toLocaleDateString()}
            </Text>
          </Text>
        )}

        {/* Biography */}
        <Text className="text-lg text-white font-nunito leading-6 mb-4">
          {castDetails.biography}
        </Text>

        {/* IMDb Button */}
        {castDetails.imdb_id && (
          <TouchableOpacity
            onPress={openIMDB}
            className="bg-yellow-400 py-3 px-6 rounded-lg items-center"
          >
            <Text className="text-black font-semibold text-base">
              View on IMDb
            </Text>
          </TouchableOpacity>
        )}

        <Text className="text-lg font-inter text-white mt-6 mb-2">
          List of Movies:
        </Text>

        {/* Movies Section */}
        <FlatList
          data={castMovies}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className=" max-w-32 mr-4"
              onPress={() => handleMoviePress(item.id)}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                className="w-32 h-48 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-white text-lg">{item.title}</Text>
              <Text className="text-gray-400 text-sm">
                {new Date(item.release_date).getFullYear()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CastDetails;
