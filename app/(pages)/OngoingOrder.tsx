import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
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
        <Text className="font-medium">Something went wrong. Please try again.</Text>
      </View>
    )
  }

  return (
    <View className="p-5">
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="my-3 self-center"
        />
      ) : (
        <EmptyStateCard
          title='No ongoing orders yet.'
          description='Your active order will appear here once you place one'
        />

      )}
    </View>
  )
}