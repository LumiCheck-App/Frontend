import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SliderQuestions from "./SliderQuestions";

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

    setSlideCardnumb((prevSlideCardsNumber) => prevSlideCardsNumber - 1);

    if (onButtonClick) {
      onButtonClick(progress, SlideCardsNumber, "FirstFiveQuestions");
    }
  }

  function updateScore(questionId, score) {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];

      updatedQuestions[questionId].score = score;

      return updatedQuestions;
    });
  }

  return (
    <View className="h-5/6 w-screen px-6 items-center">
      <Text className="text-2xl font-quickbold text-dark-gray">
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
                updateScore={updateScore}
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
          <Text className="text-xl text-white font-quickbold">Próxima pergunta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
