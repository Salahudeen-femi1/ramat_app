// components/EmptyStateCard.tsx
import React from "react";
import { View, Text , Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { image } from "@/app/constants/image";
interface EmptyStateCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function EmptyStateCard({
  icon = "bag-handle-outline",
  title,
  description,
}: EmptyStateCardProps) {
  return (
    <View className="items-center justify-center px-5 mt-10">
      <Image source={image.emptybox} className="" style={{ width: 200, height: 170 }} resizeMode="cover" />
      

      <Text className="text-lg text-center font-medium mt-6 text-gray-400">
        {title}
      </Text>

      {description && (
        <Text className="text-center text-gray-500 mt-2">
          {description}
        </Text>
      )}
    </View>
  );
}