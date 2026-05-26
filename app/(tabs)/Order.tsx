import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompletedOrder from "../pages/CompletedOrder";
import OngoingOrder from "../pages/OngoingOrder";

type StatusType = "ongoing" | "completed";

export default function TaskTabs() {

  const [status, setStatus] = useState<StatusType>("ongoing");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "Ongoing Order", value: "ongoing" },
    { label: "Completed Order", value: "completed" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">

        {/* Tabs */}
        <View className="bg-gray-100 rounded-md m-4 px-2 py-4 flex-row items-center justify-center gap-3">
          {tabs.map((tab, index) => {
            const active = status === tab.value;

            return (
              <Pressable
                key={index}
                onPress={() => setStatus(tab.value)}
                className={` w-40 py-5 text-center rounded-md ${active ? "bg-primary" : "bg-transparent"
                  }`}
              >
                <Text
                  className={`font-medium text-center ${active ? "text-white" : "text-black"
                    }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Content */}
        <View className="flex-1">
          {status === "ongoing" && <OngoingOrder />}
          {status === "completed" && <CompletedOrder />}
        </View>

    </SafeAreaView>
  );
}