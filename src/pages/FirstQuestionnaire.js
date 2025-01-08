import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import AddictionCards from "../components/AddictionCards";
import FirstFiveQuestions from "../components/FirstFiveQuestions";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { FontAwesome } from "@expo/vector-icons";

export default function FirstQuestionnaire() {
  const progress = useSharedValue(0);
  const [AddiCards, setAddiCards] = useState(true);
  const [questions, setQuestions] = useState(false);

  const handleProgress = (quantity, array_id, part) => {
    progress.value = withTiming(progress.value + quantity, { duration: 500 });
    if (part === "SwipeableCard") {
      if (array_id === 0) {
        setAddiCards(false);
        setQuestions(true);
      }
    }

    if (part === "FirstFiveQuestions") {
      if (array_id === 0) {
        setQuestions(false);
      }
    }
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View className="flex-1 bg-off-white">
      {/* Header Section */}
      <View className="flex-row h-1/6 w-screen items-center justify-between px-6">
        <FontAwesome
          className="w-1/6"
          name="arrow-left"
          size={20}
          color="#686868"
        />
        <View className="flex-grow h-4 w-5/6 bg-white border-solid border-x border-y border-light-gray relative rounded-full overflow-hidden">
          {/* Animated Progress Bar */}
          <Animated.View
            className="bg-violet"
            style={[
              {
                height: "100%",
                borderRadius: 999,
              },
              progressBarStyle,
            ]}
          ></Animated.View>
        </View>
      </View>
      {AddiCards && <AddictionCards onCardSwipe={handleProgress} />}
      {questions && <FirstFiveQuestions onButtonClick={handleProgress} />}
    </View>
  );
}
