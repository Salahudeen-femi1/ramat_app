import { View, Text, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import FoodCard from '../Component/card/FoodCard'
import PromoCarousel from '../Component/banner/PromoCarousel'
import { image } from '../constants/image'
import { useQuery } from '@tanstack/react-query'
import { miniMarketService } from '@/services/authServices'
import { martItem } from '@/utility/interface'
import { ActivityIndicator } from 'react-native'
import EmptyStateCard from '../Component/card/EmptyStateCard'
import SearchBar from '../Component/search/SearchBar'
import { RefreshControl } from 'react-native'

const promoImages = [
  {
    id: "1",
    image: image.banner3,
  },
  {
    id: "2",
    image: image.banner4,
  },
  {
    id: "3",
    image: image.banner6,
  },
];

const Minimart = () => {

  const [activeTab, setActiveTab] = React.useState('All')
  const [searchModal, setSearchModal] = React.useState(false)
  const [martSearch, setMartSearch] = React.useState('')

  const { data: martItems = [], isLoading, isError, refetch: refreshMartItems } = useQuery<martItem[]>({
    queryKey: ["item", martSearch],
    queryFn: () => miniMarketService({
      query: martSearch
    })
  })

  const filteredFoods = React.useMemo(() => {
    if (activeTab === 'All') {
      return martItems
    }

    return martItems.filter(
      (item) => item.category === activeTab
    )

  }, [activeTab, martItems]);

  if (isLoading) {
    return (
      <ActivityIndicator
        color="2D5A27"
        size="large"
        className="my-auto self-cenetr"
      />
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-medium">Something went wrong. Please try again.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="px-4 pt-4 pb-3 flex-row justify-between items-center">

        <View className="flex-row items-center gap-2">
          <Ionicons name="restaurant" size={22} color="#2D5A27" />

          <Text className="font-bold text-base uppercase ">
            Ramat Pickup
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={() => setSearchModal(true)}
            className="mr-2">
            <Ionicons name="search-outline" size={24} color="#2D5A27" />
          </Pressable>

          <Ionicons name="scan-outline" size={26} color="#2D5A27" />

          <TouchableOpacity
            onPress={() => router.push('/Cart')}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={26} color="#2D5A27" />
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
        refreshControl={
          <RefreshControl
            onRefresh={refreshMartItems}
            refreshing={isLoading}
          />
        }

        ListHeaderComponent={
          <View>
            {/* Banner */}
            <PromoCarousel images={promoImages} />
          </View>
        }
        ListEmptyComponent={
          <EmptyStateCard
            title="No items added"
            description="Try adding some mini mart items from the admin side"
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {/* Search modal component (controlled via props) */}
      <SearchBar searchModal={searchModal} setSearchModal={setSearchModal} position="top" />
    </SafeAreaView>
  )
}

export default Minimart