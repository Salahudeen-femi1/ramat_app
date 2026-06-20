import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
// import { icon } from '@/app/constants/icon'
import { Ionicons } from '@expo/vector-icons'

const TabIcon = ({ focused, icon, title }: any) => {
    return (
        <View className="size-full justify-center items-center">
            <Ionicons
                name={icon}
                size={26}
                color={focused ? "#2D5A27" : "#757872"}
            />

            <Text
                className={`font-semibold ${focused
                    ? "text-sm text-primary"
                    : "text-sm text-neutral"
                    }`}
            >
                {title}
            </Text>
        </View>
    )
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 15
                },
                tabBarStyle: {
                    backgroundColor: "white"
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Menu',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon='restaurant'
                            title="Menu"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Minimart'
                options={{
                    title: 'minimart',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon='basket-outline'
                            title="Minimart"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Order'
                options={{
                    title: 'Order',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon='cart'
                            title="Order"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon='person'
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout;