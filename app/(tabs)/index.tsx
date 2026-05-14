import { foods } from "@/utility/data";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodCard from "../Component/card/FoodCard";
import { router } from "expo-router";

export default function Index() {

  const [activeTab, setActiveTab] = React.useState('All')

  const filteredFoods = React.useMemo(() => {
    if (activeTab === 'All') return foods;
    if (activeTab === 'Rice') return foods.filter(item => item.title.includes('Rice'));
    if (activeTab === 'Drinks') return foods.filter(item => ['Bottle Water', 'Coke', 'Yoghurt'].includes(item.title));
    if (activeTab === 'Okele') return foods.filter(item => ['Fufu', 'Semo'].includes(item.title));
    return foods;
  }, [activeTab]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>

        {/* FIXED HEADER */}
        <View className="px-4 pt-4 pb-3 flex-row justify-between items-center">

          <View className="flex-row items-center gap-2">
            <Ionicons name="restaurant" size={22} color="#2D5A27" />

            <Text className="font-bold text-lg uppercase ">
              Ramat Pickup
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
              <Ionicons name="location-outline" size={22} color="#2D5A27" />

              <Text>Saki west...</Text>
            </View>

            <Ionicons name="scan-circle-outline" size={22} color="#2D5A27" />

            <TouchableOpacity
              onPress={() => router.push('/pages/Cart')}
              activeOpacity={0.8}
            >
              <Ionicons name="bag-outline" size={22} color="#2D5A27" />
            </TouchableOpacity>
          </View>

        </View>


        {/* Welcome */}
        <View className="px-4 py-2">
          <Text className="text-2xl font-bold">
            Welcome, Salahudeen
          </Text>

          <Text className="text-gray-500">
            What would you like to eat today?
          </Text>
        </View>

        <View>

        </View>

        {/* Tabs */}
        <View className="px-4 py-2">
          <View className="flex-row">
            {['All', 'Rice', 'Drinks', 'Swallow'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md mr-2 ${activeTab === tab ? 'bg-[#2D5A27] text-white' : 'bg-gray-100'
                  }`}
              >
                <Text className={activeTab === tab ? 'text-white' : 'text-black'}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>

      {/* SCROLLABLE CONTENT */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard {...item} />
        )}

        ListHeaderComponent={
          <View>
            {/* Banner */}
            <View className="bg-primary/20 mt-4 mx-4 h-52 mb-6 rounded-md" />
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}
