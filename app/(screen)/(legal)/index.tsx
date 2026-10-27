import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Legal = () => {

  const legalPage = [
    {
      id: 1,
      title: "Privacy Policy",
      icon: "lock-closed-outline",
      route: "/(screen)/(legal)/(pages)/PrivacyPolicyScreen",
    },
    {
      id: 2,
      title: "Terms of Use",
      icon: "bulb-outline",
      route: "/(screen)/(legal)/(pages)/TermOfUse",
    },
    {
      id: 3,
      title: "Help Center",
      icon: "help-circle-outline",
      route: "/(screen)/(legal)/(pages)/HelpCenterScreen",
    },
    {
      id: 4,
      title: "Contact Support",
      icon: "chatbubbles-outline",
      route: "/(screen)/(legal)/(pages)/ContactSupportScreen",
    },
    {
      id: 5,
      title: "Rate Our App",
      icon: "star-outline",
      route: "/(screen)/(legal)/(pages)/RateScreen",
    }
  ] as const;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white p-3">

        {legalPage.map((item, index) => (
          <View key={item.id}>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(item.route)}
              className="flex-row items-center justify-between py-6"
            >

              <View className="flex-row items-center gap-5">

                {/* Icon Circle */}
                <View className="w-16 h-16 rounded-full bg-white items-center justify-center">

                  <Ionicons
                    name={item.icon as any}
                    size={25}
                    color="#14532D"
                  />
                </View>

                {/* Title */}
                <Text className="text-18px] text-black font-poppinsMedium">
                  {item.title}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#7C7C7C"
              />
            </TouchableOpacity>

            {index !== legalPage.length - 1 && (
              <View className="h-[1px] bg-[#ECECE7]" />
            )}
          </View>
        ))}
      </ScrollView>

    </View>
  )
}

export default Legal