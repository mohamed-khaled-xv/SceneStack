import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Ionicons } from "@expo/vector-icons";

type TooltipMenuProps = {
  icon: React.ReactNode; // The trigger icon
  actions: {
    icon: string; // Ionicons name
    name:string; // Action name
    onPress: () => void;
    color?: string;
  }[];
};

export default function TooltipMenu({ icon, actions }: TooltipMenuProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      isVisible={visible}
      content={
        <View className="flex-column gap-2 min-w-70
        ">
          {actions.map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row  px-4 py-2 rounded-lg bg-gray-800"
              onPress={() => {
                setVisible(false);
                item.onPress();
              }}
            >
              <Text className="text-white font-inter text-m mr-2">{item.name}</Text>
              <Ionicons name={item.icon as any} size={24} color={item.color || "#fff"} />
            </TouchableOpacity>
          ))}
        </View>
      }
      placement="bottom"
      onClose={() => setVisible(false)}
      showChildInTooltip={false}
      backgroundColor="rgba(0,0,0,0.75)"
      useInteractionManager={true}
      disableShadow={true}
      arrowSize={{ width: 12, height: 8 }}
      displayInsets={{ top: 16, bottom: 16, left: 16, right: 16 }}
      contentStyle={{ backgroundColor: "#222", borderRadius: 12, padding: 12 }}
    >
      <TouchableOpacity onPress={() => setVisible(true)}>{icon}</TouchableOpacity>
    </Tooltip>
  );
}
