import React from "react";
import { ImageSourcePropType, Text, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon, title }) => {
  const scale = useSharedValue(focused ? 1.1 : 1);

  React.useEffect(() => {
    scale.value = withTiming(focused ? 1.1 : 1, { duration: 150 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 12,
          minHeight: 45,
          minWidth: focused ? 100 : 90,
          borderRadius: 10,
          backgroundColor: focused ? "#FF8700" : "transparent",
        },
        animatedStyle,
      ]}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          marginBottom: 2,
          tintColor: focused ? "#fff" : "#999",
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: focused ? "#fff" : "#999",
          fontSize: 11,
          fontWeight: focused ? "600" : "400",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

export default TabBarIcon;
