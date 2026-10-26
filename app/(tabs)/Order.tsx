import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompletedOrder from "../(screen)/CompletedOrder";
import OngoingOrder from "../(screen)/OngoingOrder";
import { useQuery } from "@tanstack/react-query";
import { getOrderService } from "@/services/authServices";
import { useLocalSearchParams } from "expo-router";

type StatusType = "ongoing" | "completed";

export default function TaskTabs() {
  const { order_id: routeOrderId } = useLocalSearchParams<{ order_id?: string }>();
  const order_id = typeof routeOrderId === "string" ? routeOrderId : "";

  const [status, setStatus] = useState<StatusType>("ongoing");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "Ongoing Order", value: "ongoing" },
    { label: "Completed Order", value: "completed" },
  ];

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders', status, order_id],
    queryFn: () => getOrderService(
      status, order_id
    ),
    enabled: status === "completed" || Boolean(order_id),
  })

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Tabs */}
      <View style={{marginTop: 20, marginLeft: 20}}
      className=" mx-4 my-4 py-2 bg-gray-100 rounded-full flex-row items-center justify-center gap-3">
        {tabs.map((tab, index) => {
          const active = status === tab.value;

          return (
            <Pressable
              key={index}
              onPress={() => setStatus(tab.value)}
              className={`px-8 py-4 rounded-full ${active ? "bg-primary" : "bg-transparent"
                }`}
            >
              <Text
                className={` font-poppinsMedium text-lg text-center ${active ? "text-white" : "text-black"
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
        {status === "ongoing" && <OngoingOrder
          orders={orders}
          isLoading={isLoading}
          isError={isError}
        />}
        {status === "completed" && <CompletedOrder
          orders={orders}
          isLoading={isLoading}
          isError={isError}
        />}
      </View>

    </SafeAreaView>
  );
}
