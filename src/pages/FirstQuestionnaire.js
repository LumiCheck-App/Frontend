import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AddictionCards from "../components/AddictionCards";
import FirstFiveQuestions from "../components/FirstFiveQuestions";
import FQFinalMessage from "../components/FQFinalMessage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

export default function FirstQuestionnaire() {
  const navigation = useNavigation();

  const progress = useSharedValue(0);

  const [AddiCards, setAddiCards] = useState(true);
  const [questions, setQuestions] = useState(false);
  const [finalmessage, setFinalMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

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
        setFinalMessage(true);
      }
    }
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  function CloseTheFirstMessage() {
    setModalVisible(false);
  }

  function handleBack() {
    if (AddiCards) {
      navigation.replace("Login");
    }

    if (questions) {
      setAddiCards(true);
      setQuestions(false);
      progress.value = withTiming(0, { duration: 500 });
    }

    if (finalmessage) {
      setQuestions(true);
      setFinalMessage(false);
      progress.value = withTiming(50, { duration: 500 });
    }
  }

  return (
    <View className="flex-1 bg-off-white">
      {/* Header Section */}
      <View className="flex-row h-1/6 w-screen items-center justify-between px-6">
        <TouchableOpacity className="w-1/6" onPress={handleBack}>
          <FontAwesome name="arrow-left" size={20} color="#686868" />
        </TouchableOpacity>
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
      {AddiCards && (
        <AddictionCards
          onCardSwipe={handleProgress}
          modalVisible={modalVisible}
          CloseModal={CloseTheFirstMessage}
        />
      )}
      {questions && <FirstFiveQuestions onButtonClick={handleProgress} />}
      {finalmessage && <FQFinalMessage />}
    </View>
  );
}
