import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepOne = () => {

  const details = {
    title1: "Your Property",
    title2: "Our Promise.",
    subText: "A seamless buyback experience built on trust, transparency and real value for you.",
    imageUrl: image.image,
    position: 0,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepOne