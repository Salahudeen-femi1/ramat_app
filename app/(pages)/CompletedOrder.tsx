import { CompletedorderProps } from '@/utility/interface'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import EmptyStateCard from '../Component/card/EmptyStateCard'

const CompletedOrder = () => {

  const orderslist: CompletedorderProps[] = [
    {
      id: 1,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 2,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 3,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 4,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 5,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 6,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 7,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 8,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
    {
      id: 9,
      label: 'Ramat Kitchen',
      ordertag: '333004784',
      date: '21st April, 2024',
      time: '12:30 PM',
    },
  ]

  const [loading, setLoading] = React.useState(false)

  return (
    <View className="flex-1 p-4">

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