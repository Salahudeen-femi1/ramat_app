import { CompletedorderProps } from '@/utility/interface'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function CompleteOrder() {

  const orderslist: CompletedorderProps[]  = [
    {
      id: 1,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
    }
  ]

  const [loading, setLoading] = React.useState(false)

  return (
    <View className="flex-1 p-5">

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="my-3 self-center"
        />
      ) : (
        <FlatList
          data={orderslist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className=" p-4 mt-10">
              <Text className="font-semibold ">{item.label}</Text>
              <Text className="">{item.ordertag}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Text className="text-lg font-medium text-center">
                You have no completed order yet.
              </Text>

              <Text className="text-sm text-gray-500 text-center mt-2">
                Your order histories will appear here.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  )
}