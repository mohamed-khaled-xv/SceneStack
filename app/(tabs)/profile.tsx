import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { getUserMetadata } from "@/services/firebase/users"; // Adjust the import path as necessary
import { UserMetadataInterface } from "@/types/user";
import { DefaultTheme } from "@react-navigation/native";
import DefaultButton from "@/components/DefaultButton";
import {logout, getCurrentUser} from "@/services/firebase/auth"; // Adjust the import path as necessary
import { useRouter } from "expo-router";
const profile = () => {
  const [userMetadata, setUserMetadata] =
    useState<UserMetadataInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const fetchUserMetadata = async () => {
      setIsLoading(true);
      try {
        const metadata = await getUserMetadata();
        if (metadata) {
          setUserMetadata(metadata);
        } else {
          setError("No user metadata found.");
        }
      } catch (err) {
        console.error("Error fetching user metadata:", err);
        setError("Failed to fetch user metadata.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMetadata();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#181A20]">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#181A20]">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (userMetadata) {
    return (
      <View className="flex-1 bg-[#181A20] p-4">
        <Text className="text-white text-2xl mb-4">Profile</Text>
        <Text className="text-white text-lg mb-2">
          Username: {userMetadata.name}
        </Text>
        <Text className="text-white text-lg mb-2">
          Email: {userMetadata.email}
        </Text>
        <DefaultButton
          title="logout"
onPress={async () => {
  await logout(); 
  console.log(getCurrentUser()); 
  router.push("/auth");
}}

          className="bg-[#FF8700] p-3 rounded-lg"
        />
      </View>
    );
  }
};
export default profile;
