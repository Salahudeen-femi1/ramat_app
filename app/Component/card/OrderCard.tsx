import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function OrderCard({ image, title, description, price }: any) {

  const [count, setCount] = React.useState(1)

  const basePrice = Number(String(price).replace(/,/g, "")) || 0
  const totalPrice = basePrice * count
  const formattedPrice = totalPrice.toLocaleString()

  return (
    <View className='flex-row gap-2 items-center border-b border-gray-100 px-4 py-4'>
      <Image
        source={image}
        resizeMode="cover"
        className="w-[90px] h-[100px] rounded-md  "
      />

      <View className='flex-1'>
        <View className='flex-row items-center justify-between'>
          <Text className="font-semibold text-[18px] ">{title}</Text>
          <Ionicons name='trash-outline' size={22} />
        </View>
        <Text className="text-gray-500 mt-1">{description}</Text>

        <View className='flex-row justify-between items-center mt-3'>
          <View className='flex-row bg-button rounded-md px-4 py-2 items-center gap-3'>
            <TouchableOpacity
              onPress={() => setCount((prev) => Math.max(1, prev - 1))}
              activeOpacity={0.8}
            >
              <Ionicons name='remove-outline' size={20} className='font-bold' />
            </TouchableOpacity>
            <Text className='text-base font-semibold'>{count}</Text>
            <TouchableOpacity
              onPress={() => setCount((prev) => Math.min(6, prev + 1))}
              activeOpacity={0.8}
            >
              <Ionicons name='add-outline' size={20} className='font-bold'/>
            </TouchableOpacity>
          </View>

          <Text className="font-bold text-primary">
            ₦{formattedPrice}
          </Text>
        </View>
      </View>
    </View>
  )
}