import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompleteOrder from "../pages/CompleteOrder";
import OngoingOrder from "../pages/OngoingOrder";

export default function TaskTabs() {
  const [status, setStatus] = useState<'ongoing' | 'completed'>('ongoing');

  const tabs = [
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
    <View className="mt-8 mr-8">

      {/* Tabs */}
      <View className="bg-gray-300 rounded-md m-5 px-2 py-5 flex-row items-center justify-center">
        {tabs.map((tab, index) => {
          const active = status === tab.value;

          return (
            <Pressable
              key={index}
              onPress={() => setStatus(tab.value)}
              className={`px-6 w-48 py-5 flex-1 text-center rounded-md mr-5 ${
                active ? "bg-primary" : "bg-transparent"
              }`}
            >
              <Text
                className={`font-medium text-center ${
                  active ? "text-white" : "text-black"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Content */}
      <View className="mt-6">
        {status === "ongoing" && <OngoingOrder />}
        {status === "completed" && <CompleteOrder />}
      </View>

    </View>

    </SafeAreaView>
  );
}