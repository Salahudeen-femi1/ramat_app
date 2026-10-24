import React from 'react'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepThree = () => {

  const details = {
    title1: "Order. Pay.",
    title2: "Pick Up.",
    subText: "Get your pickup code and collect your freshly prepared meal at Ramat Pickup.",
    imageUrl: image.onboard3,
    position: 2,
    resizeType: "cover",
    badgeTitle: "Pickup ready",
    badgeSubtitle: "Collect your order",
  }

  return <OnboardingStructure {...details} />
}

export default stepThree;
