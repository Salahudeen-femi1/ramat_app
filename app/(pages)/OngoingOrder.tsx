import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import EmptyStateCard from '../Component/card/EmptyStateCard'

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
        <EmptyStateCard 
        title='No ongoing orders yet.'
        description='Your active order will appear here once you place one'
        />
       
      )}
    </View>
    )
}