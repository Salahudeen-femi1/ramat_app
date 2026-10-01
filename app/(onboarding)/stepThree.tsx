import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepThree = () => {

  const details = {
    title1: "Order. Pay. Pickup",
    subText: "Get you pickup code and collect your freshly prepared meal directly from Ramat pickup",
    imageUrl: image.onboard3,
    position: 0,
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingStructure {...details} />
    </SafeAreaView>
  )
}

export default stepThree;