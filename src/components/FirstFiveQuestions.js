import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";

export default function FirstFiveQuestions({ onButtonClick }) {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      text: "Com que frequência ficas online mais tempo do que pretendias?",
      score: 0,
      answered: false,
    },
    {
      id: 1,
      text: "Com que frequência deixas de fazer as tarefas de casa para poderes ficar mais tempo online?",
      score: 0,
      answered: false,
    },
    {
      id: 2,
      text: "Com que frequência preferes o entusiasmo da internet ao convívio com os teus amigos?",
      score: 0,
      answered: false,
    },
    {
      id: 3,
      text: "Com que frequência crias novas relações com outros utilizadores online?",
      score: 0,
      answered: false,
    },
    {
      id: 4,
      text: "Com que frequência as outras pessoas se queixam em relação à quantidade de tempo que passas online?",
      score: 0,
      answered: false,
    },
  ]);

  const [SlideCardsNumber, setSlideCardnumb] = useState(questions.length - 1);

  const progress = 50 / questions.length;

  function handleAnswers() {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];

      updatedQuestions[SlideCardsNumber].answered = true;

      return updatedQuestions;
    });

    //send to DB

    if (onButtonClick) {
      onButtonClick(progress, SlideCardsNumber, "FirstFiveQuestions");
    }

    setSlideCardnumb((prevSlideCardsNumber) => prevSlideCardsNumber - 1);
  }

  return (
    <View className="h-5/6 w-screen px-6 items-center">
      <Text className="text-2xl font-bold text-dark-gray">
        Para cada uma das afirmações seguintes, sobre o teu uso da internet,
        seleciona um número onde 1 é Raramente e 5 Sempre
      </Text>
      <View className="w-screen h-3/5 px-6 items-center justify-center">
        <View className="relative w-full h-72">
          {questions.map((question, index) => {
            return (
              <SliderQuestions
                key={`slider_${index}`}
                question={question.text}
                pos={question.id}
                isAnswered={question.answered}
              />
            );
          })}
        </View>
      </View>
      <View className="w-screen h-1/5 px-6">
        <TouchableOpacity
          className="bg-yellow rounded-lg w-full py-3 items-center"
          onPress={handleAnswers}
        >
          <Text className="text-xl text-white font-bold">Próxima pergunta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SliderQuestions({ question, pos, isAnswered }) {
  // Animation shared value for position
  const leftPosition = useSharedValue(0);

  // Trigger animation when `isActive` changes
  React.useEffect(() => {
    leftPosition.value = withTiming(!isAnswered ? 0 : 400, { duration: 400 }); // Move off-screen if not active
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
        onSlidingComplete={(val) => setValue(val)}
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
