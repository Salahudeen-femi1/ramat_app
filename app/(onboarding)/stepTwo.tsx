import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepTwo = () => {

  const details = {
    title1: "Order easily, Anytime",
    subText: "Choose your meal, customize your order and pay securely and pay securely without the hassle.",
    imageUrl: image.onboard2,
    position: 0,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepTwo;