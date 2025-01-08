import React from "react";
import { Dimensions, Text, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function SwipeableCard({ card, index, onSwipe }) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const stackingOffset = 10; // Stacking offset in pixels

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      rotate.value = event.translationX / 20; // Slight rotation
    },
    onEnd: (event) => {
      if (event.translationX > width / 4) {
        // Swiped right
        runOnJS(onSwipe)("right"); // Trigger the callback immediately
        translateX.value = withSpring(width * 1.5); // Continue the animation
      } else if (event.translationX < -width / 4) {
        // Swiped left
        runOnJS(onSwipe)("left"); // Trigger the callback immediately
        translateX.value = withSpring(-width * 1.5); // Continue the animationr
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    top: "50%",
    left: "50%",
    transform: [
      // Center the cards
      { translateX: -width * 0.3 }, // Offset by half of card's width (50%)
      { translateY: -width * 0.4 }, // Offset by half of card's height (50%)
      // Apply stacking offset
      { translateY: index * stackingOffset },
      // Apply swipe transformations
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <PanGestureHandler
      className="relative w-screen h-3/6 "
      onGestureEvent={gestureHandler}
    >
      <Animated.View
        className="absolute w-3/5 h-full bg-white rounded-3xl border border-gray-300 flex items-center justify-center gap-7"
        style={animatedStyle}
      >
        <Image source={card.image} />
        <Text className="text-lg font-medium">{card.text}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}
