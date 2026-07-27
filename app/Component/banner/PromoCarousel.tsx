import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ImageSourcePropType,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width - 32;

type PromoImageType = {
    id: string;
    image: ImageSourcePropType
}

type PromoCarouselImages = {
    images: PromoImageType[];
}

export default function PromoCarousel({ images }: PromoCarouselImages) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
  };

  return (
    <View className="mt-4 mx-4 mb-6">
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <Image
              source={item.image}
              className="h-52 rounded-xl"
              style={{ width: "100%" }}
            />
          </View>
        )}
      />

      <View className="flex-row justify-center mt-3">
        {images.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              activeIndex === index ? "bg-[#2D5A27]" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
