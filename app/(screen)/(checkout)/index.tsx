import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Checkout() {

  const [pickupTime, setPickupTime] = React.useState('')

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10)

    setPickupTime(
      now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    )
  }, []);

  // const {} = useCart()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Pickup Details */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm mb-2">
            Pickup Time
          </Text>

          <View className="border border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
            <Text className="text-gray-900 font-medium">
              {pickupTime}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-gray-500 text-sm mb-2">
            Pickup Outlet
          </Text>

          <View className="border border-gray-200 rounded-xl px-4 py-4 bg-gray-50">
            <Text className="text-gray-900 font-medium">
              Ramat Kitchen
            </Text>
          </View>
        </View>

        {/* Order Summary */}
        {/* Order Summary */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-semibold text-lg text-gray-900">
              Order Summary
            </Text>

            <Pressable onPress={() => router.push("/(tabs)")}>
              <Text className="text-primary font-medium text-sm">
                Add more items
              </Text>
            </Pressable>
          </View>

          <View className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Main Food */}
            <View className="px-4 py-4 border-b border-gray-100">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">
                    Jollof Rice
                  </Text>

                  <Text className="text-gray-500 text-sm mt-1">
                    2 × ₦2,000
                  </Text>
                </View>

                <Text className="font-semibold text-gray-900">
                  ₦4,000
                </Text>
              </View>

              {/* Extras */}
              <View className="mt-3 ml-2 pl-3 border-l-2 border-gray-200">
                <Text className="text-xs text-gray-400 mb-2">
                  EXTRAS
                </Text>

                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-sm text-gray-600">
                    Fried Chicken × 1
                  </Text>

                  <Text className="text-sm text-gray-500">
                    ₦1,500
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-gray-600">
                    Plantain × 1
                  </Text>

                  <Text className="text-sm text-gray-500">
                    ₦500
                  </Text>
                </View>
              </View>
            </View>

            {/* Another Food */}
            <View className="px-4 py-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">
                    Fried Rice
                  </Text>

                  <Text className="text-gray-500 text-sm mt-1">
                    1 × ₦2,000
                  </Text>
                </View>

                <Text className="font-semibold text-gray-900">
                  ₦2,000
                </Text>
              </View>

              {/* Extras */}
              <View className="mt-3 ml-2 pl-3 border-l-2 border-gray-200">
                <Text className="text-xs text-gray-400 mb-2">
                  EXTRAS
                </Text>

                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-gray-600">
                    Beef × 1
                  </Text>

                  <Text className="text-sm text-gray-500">
                    ₦1,000
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Total */}
          <View className="mt-5 border-t border-gray-200 pt-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">
                Subtotal
              </Text>

              <Text className="text-gray-900">
                ₦10,500
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="font-semibold text-base text-gray-900">
                Total
              </Text>

              <Text className="font-bold text-lg text-gray-900">
                ₦10,500
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(screen)/(payment)')}
            activeOpacity={0.8}
            className='flex bg-primary rounded-md items-center justify-center text-white font-semibold h-14 mt-6'>
            <Text className='text-white text-lg font-semibold text-center'>Make payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}