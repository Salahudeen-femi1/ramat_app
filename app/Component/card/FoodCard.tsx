import { extras } from '@/utility/data'
import { cardType } from '@/utility/interface'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Modal from '../modal/Modal'

export default function FoodCard({ title, description, price, image }: cardType) {

    const [openModal, setOpenModal] = React.useState(false)
    const [showExtras, setShowExtras] = React.useState(false)
    const [extrasCount, setExtrasCount] = React.useState<Record<string, number>>({})
    const [quantity, setQuantity] = React.useState(1)

    const basePrice = Number(String(price).replace(/,/g, '')) || 0
    const extrasTotal = Object.entries(extrasCount).reduce((sum, [extraId, cnt]) => {
        const extra = extras.find((item) => item.id === extraId)
        return sum + (extra ? Number(extra.price) * (cnt || 0) : 0)
    }, 0)
    const totalPrice = (basePrice + extrasTotal) * quantity
    const formattedTotal = totalPrice.toLocaleString()

    const incrementExtra = (extraId: string) => {
        setExtrasCount((prev) => {
            const current = prev[extraId] || 0;

            return {
                ...prev,
                [extraId]: Math.min(current + 1, 6),
            };
        });
    };

    const decrementExtra = (extraId: string) => {
        setExtrasCount((prev) => {
            const current = prev[extraId] || 0
            if (current <= 1) {
                const next = { ...prev }
                delete next[extraId]
                return next
            }
            return { ...prev, [extraId]: current - 1 }
        })
    }

    const handleAddtoCart = () => {
        setOpenModal(false)
        router.push('/Cart')
    }

    return (
        <>

            <View className="flex-row justify-between mx-5 border-b border-gray-100 px-4 py-4">
                <View className="flex-1 pr-4">
                    <Text className="font-semibold text-[16px] ">{title}</Text>
                    <Text className="text-gray-500 mt-1">{description}</Text>

                    <Text className="font-bold text-primary mt-3">
                        ₦{price}
                    </Text>
                </View>

                <View>

                    <Image
                        source={image}
                        resizeMode="cover"
                        className="w-[100px] h-[90px] rounded-t-md  "
                    />
                    <TouchableOpacity
                        onPress={() => setOpenModal(true)}
                        className="bg-[#ebf5ff] h-12 px-3 flex-row items-center justify-center rounded-md"
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={20} color="black" />
                        <Text className="ml-1">Add</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <Modal visible={openModal} onClose={() => setOpenModal(false)} customModet>
                <Image
                    source={image}
                    resizeMode="cover"
                    className="w-full h-[200px] rounded-t-[20px]  "
                />
                <View className='relative flex-1'>
                    <ScrollView className='flex-1 pb-28 bg-white'>
                        <View className="p-4">
                            <Text className="font-semibold text-[18px]">{title}</Text>
                            <Text className="text-gray-500 mt-1">{description}</Text>

                            <Text className="font-bold text-primary mt-3">
                                ₦{price}
                            </Text>
                        </View>

                        <View className='bg-gray-200 p-4'>
                            <TouchableOpacity
                                onPress={() => setShowExtras(!showExtras)}
                                className='flex-row items-center justify-between'
                                activeOpacity={0.8}
                            >
                                <Text className='text-2xl font-semibold'>Extras</Text>
                                <Ionicons
                                    name={showExtras ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'}
                                    size={24}
                                    color='#2D5A27'
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {showExtras && (
                                <View className='mt-4 space-y-3'>
                                    {extras.map((extra) => {
                                        const count = extrasCount[extra.id] || 0
                                        return (
                                            <View
                                                key={extra.id}
                                                className={`flex-row items-center justify-between border-b border-gray-100 p-4 rounded-xl`}
                                            >
                                                <View className=''>
                                                    <Text className='text-base font-semibold'>{extra.label}</Text>
                                                    <Text className="text-gray-500 mt-1">+ ₦{extra.price}</Text>
                                                </View>
                                                <View className='flex-row items-center'>
                                                    {count > 0 ? (
                                                        <View className='flex-row items-center gap-4 space-x-6'>
                                                            <TouchableOpacity
                                                                onPress={() => decrementExtra(extra.id)}
                                                                activeOpacity={0.8}
                                                                className='rounded-full p-2 bg-gray-100'
                                                            >
                                                                <Ionicons name='remove' size={20} color='black' />
                                                            </TouchableOpacity>
                                                            <Text className='text-base font-semibold'>{count}</Text>
                                                            <TouchableOpacity
                                                                onPress={() => incrementExtra(extra.id)}
                                                                activeOpacity={0.8}
                                                                className='rounded-full p-2 bg-gray-100'
                                                            >
                                                                <Ionicons name='add' size={20} color='black' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity
                                                            onPress={() => incrementExtra(extra.id)}
                                                            activeOpacity={0.8}
                                                        >
                                                            <Ionicons name='add-circle-outline' size={22} color='#2D5A27' />
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            )}
                        </View>

                    </ScrollView>
                    {/* ✅ STICKY FOOTER */}
                    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">

                        <TouchableOpacity
                            onPress={handleAddtoCart}
                            activeOpacity={0.8}
                            className="border border-primary rounded-md h-[50px] flex-row items-center justify-between p-4 mb-5 bg-primary"
                        >
                            <Text className='text-white font-semibold text-lg'>Proceed to order {quantity} </Text>
                            <Text className='text-white font-semibold text-lg'> ₦{formattedTotal}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}