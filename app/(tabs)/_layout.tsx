import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
// import { icon } from '@/app/constants/icon'
import { Ionicons } from '@expo/vector-icons'

const TabIcon = ({ focused, icon, title }: any) => {
    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons
                name={icon}
                size={26}
                color={focused ? "#2D5A27" : "#757872"}
            />

            <Text
                style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: focused ? '#2D5A27' : '#757872'
                }}
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
                    paddingVertical: 4,
                },
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 78,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: '#2D5A27',
                tabBarInactiveTintColor: '#757872',
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
                            icon='storefront-sharp'
                            title="Minim"
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
                            title="Profil"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout;