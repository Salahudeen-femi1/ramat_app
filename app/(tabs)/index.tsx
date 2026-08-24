import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PromoCarousel from "../Component/banner/PromoCarousel";
import EmptyStateCard from "../Component/card/EmptyStateCard";
import FoodCard from "../Component/card/FoodCard";
import { image } from "../constants/image";
import { useQuery } from "@tanstack/react-query";
import { getMenuService } from "@/services/authServices";
import { FoodProps } from "@/utility/interface";

const promoImages = [
  {
    id: "1",
    image: image.banner1,
  },
  {
    id: "2",
    image: image.banner2,
  },
  {
    id: "3",
    image: image.banner5,
  },
];

export default function Index() {

  const [activeTab, setActiveTab] = React.useState('All')
  const { user } = useAuth()
  const { cartCount } = useCart()

  const { data: foods = [], isLoading, isError } = useQuery<FoodProps[]>({
    queryKey: ["foods", activeTab],
    queryFn: () => getMenuService(activeTab),
  });

  const filteredFoods = React.useMemo(() => {
    if (activeTab === 'All') {
      return foods;
    }

    const normalizedTab = activeTab.toLowerCase();

    return foods.filter((item) => {
      const normalizedCategory = String(item.category ?? '').toLowerCase();
      return normalizedCategory === normalizedTab;
    });
  }, [activeTab, foods]);

  if (isLoading) {
    return (<ActivityIndicator size="large" />)
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-medium">Something went wrong. Please try again.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View>

        {/* FIXED HEADER */}
        <View className="px-4 pt-4 pb-3 flex-row justify-between items-center">
          <View className="flex-row items-center gap-1 bg-gray-100 w-40 px-4 py-2 rounded-md">
            <Ionicons name="location-outline" size={22} color="#2D5A27" />

            <Text className="text-sm">Saki west...</Text>
          </View>

          <View className="flex-row items-center gap-4">

            <Ionicons name="scan-outline" size={26} color="#2D5A27" />

            <TouchableOpacity
              onPress={() => router.push('/Cart')}
              activeOpacity={0.8}
            >
              <View className="relative">
                <Ionicons name="cart-outline" size={26} color="#2D5A27" />
                {cartCount > 0 && (
                  <View className="absolute -top-2 -right-2 min-w-5 h-5 rounded-full bg-red-500 items-center justify-center px-1">
                    <Text className="text-[10px] text-white font-bold">{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

        </View>


        {/* Welcome */}
        <View className="px-4 py-2">
          <Text className="text-xl font-bold">
            Welcome, {user?.first_name}
          </Text>

          <Text className="text-sm text-gray-500">
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
            <PromoCarousel images={promoImages} />
          </View>
        }
        ListEmptyComponent={
          <EmptyStateCard
            title="No items added"
            description="Try adding food contenet from the admin side"
          />
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {cartCount > 0 && (
        <TouchableOpacity
          onPress={() => router.push('/Cart')}
          activeOpacity={0.85}
          className="absolute bottom-4 left-4 right-4 mx-4 rounded-xl bg-primary px-4 py-3 flex-row items-center justify-between"
        >
          <View>
            <Text className="text-white font-semibold">Proceed to order</Text>
            <Text className="text-white/90 text-sm">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <Text className="text-white font-semibold">View cart</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
