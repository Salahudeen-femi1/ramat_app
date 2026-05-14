import { extras } from '@/utility/data'
import { cardType } from '@/utility/interface'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Modal from '../modal/Modal'

export default function FoodCard({ title, description, price, image }: cardType) {

    const [openModal, setOpenModal] = React.useState(false)
    const [showExtras, setShowExtras] = React.useState(false)

    return (
        <>

            <View className="flex-row justify-between mx-5 border-b border-gray-100 px-4 py-4">
                <View className="flex-1 pr-4">
                    <Text className="font-semibold text-[18px] ">{title}</Text>
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

            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
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
                                    {extras.map((extra) => (
                                        <TouchableOpacity
                                            key={extra.id}
                                            className='flex-row items-center justify-between border-b border-gray-100 p-4 rounded-xl'
                                            activeOpacity={0.8}
                                        >
                                            <View className=''>
                                                <Text className='text-base font-semibold'>{extra.label}</Text>
                                                <Text className="text-gray-500 mt-1">+ ₦{extra.price}</Text>
                                            </View>
                                            <Ionicons name='add-circle-outline' size={20} color='#2D5A27' />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                    </ScrollView>
                    {/* ✅ STICKY FOOTER */}
                    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">

                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="border border-primary rounded-md h-[50px] flex items-center justify-center"
                        >
                            <Text>Add to Cart</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </>
    )
}