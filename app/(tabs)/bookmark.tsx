import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import FavoriteMoviesList from "../../components/FavoriteMoviesList";
import ToWatchMoviesList from "../../components/ToWatchMoviesList";
import { SafeAreaView } from "react-native-safe-area-context";

// Render your tab scenes
const renderScene = SceneMap({
  favorite: FavoriteMoviesList,
  to_watch: ToWatchMoviesList,
});

// Dots indicator component (NativeWind style)
type DotIndicatorProps = {
  total: number;
  active: number;
};

function DotIndicator({ total, active }: DotIndicatorProps) {
  return (
    <View className="flex-row justify-center items-center">
      {[...Array(total)].map((_, i) => (
        <View
          key={i}
          className={`w-12 h-2  mx-1 ${
            i === active ? "bg-white" : "bg-gray-600"
          }`}
        />
      ))}
    </View>
  );
}

export default function BookmarkScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: "favorite", title: "Favorite Movies" },
    { key: "to_watch", title: "To Watch" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#1C1C1E]">
      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => null}
          style={{ backgroundColor: "#1C1C1E" }}
        />
        {/* Absolute position, so always on screen */}
        <View className="absolute left-0 right-0 bottom-10">
          <DotIndicator total={routes.length} active={index} />
        </View>
      </View>
    </SafeAreaView>
  );
}
