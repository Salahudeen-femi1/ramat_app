import { useCart } from '@/context/CartContext'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderCard from '../Component/card/OrderCard'
import EmptyStateCard from '../Component/card/EmptyStateCard'

const Cart = () => {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart()

  const subtotal = cartItems.reduce((sum, item) => {
    const base = Number(String(item.price).replace(/,/g, '')) || 0
    return sum + base * item.quantity
  }, 0)
  const formattedSubtotal = subtotal.toLocaleString()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => `${item.id}-${item.extras.map((extra) => extra.id).join('-')}`}
          renderItem={({ item }) => (
            <OrderCard
              {...item}
              onRemove={() => removeFromCart(item.id)}
              onQuantityChange={(nextQuantity: number) => updateQuantity(item.id, nextQuantity)}
            />
          )}
          ListEmptyComponent={
            <EmptyStateCard
              title="Your cart is empty"
            />
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </>

      {
        cartItems.length > 0 && (
          <View className='border-t border-gray-100 bg-white p-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center flex-wrap'>
                <Text className='text-gray-500 text-lg'>SubTotal ({cartItems.length}) items: </Text>
                <Text className='font-bold text-xl'>₦{formattedSubtotal}</Text>
              </View>

              <TouchableOpacity onPress={() => clearCart()} activeOpacity={0.8}>
                <Text className='text-red-500 text-xl'>Clear cart</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/Checkout')}
              activeOpacity={0.8}
              className='flex bg-primary rounded-md items-center justify-center text-white font-semibold h-14 mt-6'>
              <Text className='text-white text-lg font-semibold text-center'>proceed to checkout</Text>
            </TouchableOpacity>
          </View>
        )
      }

    </SafeAreaView>
  )
}

export default Cart;