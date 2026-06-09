import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function OngoingOrder() {

    const [loading, setLoading] = React.useState(false)

    return (
        <View className="p-5">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="my-3 self-center"
        />
      ) : (
        <View className="items-center justify-center py-10">
          <Text className="text-lg font-medium text-center">
            No ongoing orders yet.
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2">
            Your active orders will appear here once you place one.
          </Text>
        </View>
      )}
    </View>
    )
}