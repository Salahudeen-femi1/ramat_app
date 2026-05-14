import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { martItems } from '@/utility/data'
import FoodCard from '../Component/card/FoodCard'

const Minimart = () => {

  const [activeTab, setActiveTab] = React.useState('All')

  const filteredFoods = React.useMemo(() => {
    if (activeTab === 'All') return martItems;
    if (activeTab === 'Fruit') return martItems.filter(item => ['Apple', 'Smoothies', 'Strawberry'].includes(item.title));
    return martItems;
  }, [activeTab]);
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="px-4 pt-4 pb-3 flex-row justify-between items-center">

        <View className="flex-row items-center gap-2">
          <Ionicons name="restaurant" size={22} color="#2D5A27" />

          <Text className="font-bold text-lg uppercase ">
            Ramat Pickup
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="items-center gap- bg-gray-100 py-2 rounded-md">
            <Ionicons name="search" size={22} color="#2D5A27" />
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

      {/* Tabs */}
      <View className="px-4 py-2">
        <View className="flex-row">
          {['All', 'Fruit'].map((tab) => (
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
  )
}

export default Minimart