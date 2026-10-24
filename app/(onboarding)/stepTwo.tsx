import React from 'react'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepTwo = () => {

  const details = {
    title1: "Order Easily,",
    title2: "Anytime",
    subText: "Choose your meal, customize your order, and pay securely in just a few taps.",
    imageUrl: image.onboard2,
    position: 1,
    resizeType: "cover",
    badgeTitle: "Fast checkout",
    badgeSubtitle: "Pay in seconds",
  }

  return <OnboardingStructure {...details} />
}

export default stepTwo;
