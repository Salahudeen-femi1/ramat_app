import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface OrderCardProps {
  image: any
  title: string
  description: string
  price: string | number
  quantity?: number
  onRemove?: () => void
  onQuantityChange?: (nextQuantity: number) => void
}

export default function OrderCard({
  image,
  title,
  description,
  price,
  quantity = 1,
  onRemove,
  onQuantityChange,
}: OrderCardProps) {
  const basePrice = Number(String(price).replace(/,/g, "")) || 0
  const totalPrice = basePrice * quantity
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
          <Text className="font-semibold text-[14px] ">{title}</Text>
          <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
            <Ionicons name='trash-outline' size={18} />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 mt-1 text-sm">{description}</Text>

        <View className='flex-row justify-between items-center mt-3'>
          <View className='flex-row bg-button rounded-md px-4 py-2 items-center gap-3'>
            <TouchableOpacity
              onPress={() => onQuantityChange?.(Math.max(1, quantity - 1))}
              activeOpacity={0.8}
            >
              <Ionicons name='remove' size={20} className='font-bold' />
            </TouchableOpacity>
            <Text className='text-base font-semibold'>{quantity}</Text>
            <TouchableOpacity
              onPress={() => onQuantityChange?.(Math.min(6, quantity + 1))}
              activeOpacity={0.8}
            >
              <Ionicons name='add' size={20} className='font-bold'/>
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