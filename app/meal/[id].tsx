import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const FoodDetails = () => {

    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>foodDetails: {id}</Text>
        </View>
    )
}

export default FoodDetails