import { Tabs } from "expo-router";
import "react-native-reanimated";
import { icons } from "./../../constants/icons";
import TabBarIcon from "./../../components/TabBarIcon";
import {SafeAreaView} from "react-native-safe-area-context";
import { View } from "react-native";

export default function TabLayout() {
  return (
            <View className="flex-1 bg-transparent">


    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60, // ⬅️ Increase height here
          paddingBottom: 10, // ⬅️ Adjust padding inside the tab bar
          paddingTop: 10,
          marginVertical: 30, // ⬅️ Add vertical margin
          marginHorizontal: 10, // ⬅️ Add horizontal margin
          borderRadius: 20, // ⬅️ Add rounded corners
          backgroundColor: "#2C2C2E", // ⬅️ Set background color
          position: "absolute", // ⬅️ Ensure it stays at the bottom
          bottom: 0, // ⬅️ Position at the bottom
        },
        tabBarItemStyle: {
          flex: 1, // ⬅️ Ensure each tab takes equal space
          alignItems: "center", // ⬅️ Center items horizontally
          justifyContent: "center", // ⬅️ Center items vertically
        },



      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: () => null, // hide label (we handle it in the component)
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.save} title="Bookmark" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}
