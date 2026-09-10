import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function SettingsPagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Feather name="chevron-left" size={24} color="#201C1C" />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="cart"
        options={{ title: "Cart" }}
      ></Stack.Screen>
    </Stack>
  );
}
