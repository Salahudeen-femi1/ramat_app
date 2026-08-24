import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import EmptyStateCard from '../Component/card/EmptyStateCard'
import { CompletedorderProps } from '@/utility/interface'

interface completeOrderProps {
  orders: CompletedorderProps[]
  isLoading: boolean;
  isError: boolean;
}

const CompletedOrder = ({ orders, isLoading, isError }: completeOrderProps) => {

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-medium">Something went wrong. Please try again.</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-4">

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="my-3 self-center"
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='flex-row justify-between items-center p-3 border-b border-gray-100 mb-3'>
              <View>
                <Text className='text-base font-semibold'>{item.label}</Text>
                <Text>{item.date}</Text>
              </View>
              <View className='align-items-start '>
                <Text>{item.ordertag}</Text>
                <Text>{item.time}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyStateCard
              title='You have no completed order yet'
              description='Your order history will appear here.'
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  )
}

export default CompletedOrder;