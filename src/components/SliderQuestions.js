import React, { useState } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";

export default function SliderQuestions({
  question,
  pos,
  isAnswered,
  updateScore,
}) {
  // Animation shared value for position
  const leftPosition = useSharedValue(0);

  // Trigger animation when `isActive` changes
  React.useEffect(() => {
    leftPosition.value = withTiming(!isAnswered ? 0 : 400, {
      duration: 500,
    }); // Move off-screen if not active
  }, [isAnswered]);

  // Animated style for card position
  const animatedStyle = useAnimatedStyle(() => ({
    top: pos * 10,
    left: leftPosition.value,
  }));

  const [value, setValue] = useState(0);

  // Feedback based on the slider value
  const getFeedback = (value) => {
    switch (value) {
      case 0:
        return "Não aplicável";
      case 1:
        return "Raramente";
      case 2:
        return "Ocasionalmente";
      case 3:
        return "Frequentemente";
      case 4:
        return "Muitas Vezes";
      case 5:
        return "Sempre";
      default:
        return "";
    }
  };

  function changeQuestionStatus(val) {
    setValue(val);
    updateScore(pos, val);
  }

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute w-full h-72 py-8 bg-white rounded-3xl border border-gray-300 px-4 items-center justify-center"
    >
      <Text className="font-regular text-lg text-dark-gray">{question}</Text>
      <Slider
        style={{ width: "100%", height: 70, zIndex: 0 }}
        step={1}
        value={value}
        onSlidingComplete={(val) => changeQuestionStatus(val)}
        minimumValue={0}
        maximumValue={5}
        minimumTrackTintColor="#aa82da"
        maximumTrackTintColor="#000000"
        thumbTintColor="#aa82da"
        upperLimit={20}
        lowerLimit={0}
      />
      <Text className="font-bold text-lg text-black">
        {value} : {getFeedback(value)}
      </Text>
    </Animated.View>
  );
}
