import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepOne = () => {

  const details = {
    title1: "Your Favorite Meals",
    title2: "One Tap away.",
    subText: "Explore delicious food from Ramat Pickup and find exactly what you're craving without waiting in line.",
    imageUrl: image.onboard1,
    position: 0,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepOne