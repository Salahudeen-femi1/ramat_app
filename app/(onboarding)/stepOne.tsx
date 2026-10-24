import React from 'react'
import { OnboardingStructure } from '../Component/OnboardingStructure'
import { image } from '../constants/image'

const stepOne = () => {

  const details = {
    title1: "Your Favorite Meals",
    title2: "One Tap Away",
    subText: "Discover delicious meals from Ramat Pickup and find something you'll love, without waiting in line.",
    imageUrl: image.onboard1,
    position: 0,
    resizeType: "cover",
    badgeTitle: "Skip the queue",
    badgeSubtitle: "Walk in, collect",
  }

  return <OnboardingStructure {...details} />
}

export default stepOne
