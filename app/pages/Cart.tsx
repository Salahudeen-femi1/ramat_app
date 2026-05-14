import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderCard from '../Component/card/OrderCard'
import { image } from '../constants/image'
import { router } from 'expo-router'

const Cart = () => {

  const cart = [
    {
      id: '1',
      title: 'A plate of Rice with Chicken',
      description: "1 plate of jollof rice, plantain and chicken",
      price: '3,200',
      image: image.jollof,
    },
    {
      id: '2',
      title: 'A plate of Rice with Beef',
      description: "1 plate of jollof rice, plantain and beef",
      price: '2,200',
      image: image.jollof,
    },
    {
      id: '3',
      title: 'Chicken Shawarma',
      description: "1 plate of jollof rice, plantain and beef",
      price: '2,200',
      image: image.shawarma,
    },
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <>
        <View className=' p-4'>
          <Text className=' font-semibold text-primary text-2xl '>My Order</Text>
          <Text className='text-gray-500'>Review your selection for a taste of the continent.</Text>
        </View>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard {...item} />
          )}

          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </>

      <View className='border-t border-gray-100 bg-white p-4'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <Text className='text-gray-500 text-lg'>SubTotal ({cart.length}) items: </Text>
            <Text className='font-bold text-xl'>6,400 </Text>
          </View>

          <Text className='text-red-500 text-xl'>Clear cart</Text>

        </View>

        <TouchableOpacity
          onPress={() => router.push('/pages/Checkout')}
          activeOpacity={0.8}
          className='flex bg-primary rounded-md items-center justify-center text-white font-semibold h-14 mt-6'>
          <Text className='text-white text-lg font-semibold text-center'>proceed to checkout</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default Cart;