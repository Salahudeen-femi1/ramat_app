import React from 'react'
import { ActivityIndicator, View, Text, FlatList } from 'react-native'
import EmptyStateCard from '../Component/card/EmptyStateCard'
import { OngoingOrderProps } from '@/utility/interface';

interface onGoingProps {
  orders: OngoingOrderProps[];
  isLoading: boolean;
  isError: boolean;
}

export default function OngoingOrder({ orders, isLoading, isError }: onGoingProps) {

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-medium">Something went wrong. Please try again.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-4">

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#2D5A27"
          className="my-auto self-center"
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className='flex-row justify-between items-center p-3 border-b border-gray-100 mb-3'>
              <View>
                <Text className='text-base font-semibold'>{item}</Text>
                <Text>{item}</Text>
              </View>
              <View className='align-items-start '>
                <Text>{item.ordertag}</Text>
                <Text>{item.time}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyStateCard
              title='You have no ongoing order'
              description='Your order history will appear here.'
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

    </View>
  )
}