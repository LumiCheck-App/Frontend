import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SliderQuestions from '../components/SliderQuestions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRandomUnansweredQuestion,
  submitSingleAnswer,
} from '../redux/answerQuestionSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { NativeModules } from 'react-native';

const { FloatingBubble } = NativeModules;

export default function QuestionPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    text: '',
    score: 0,
    answered: false,
  });

  const { question, loading, error } = useSelector(
    (state) => state.answerQuestion
  );

  useEffect(()=>{
    FloatingBubble.hideBubble()
  },[])

  useEffect(() => {
    dispatch(getRandomUnansweredQuestion());
  }, [dispatch]);

  useEffect(() => {
    if (question) {
      setCurrentQuestion({
        id: question.question_id,
        text: question.question,
        score: 0,
        answered: false,
      });
    }
  }, [question]);

  function handleAnswer() {
    if (currentQuestion.id) {
      dispatch(
        submitSingleAnswer({
          questionId: currentQuestion.id,
          answer: currentQuestion.score,
        })
      ).catch((err) => {
        console.error('Error submitting answer:', err);
      });
    }

    navigation.navigate('HomeTabs');
  }

  function updateScore(questionId, score) {
    setCurrentQuestion((prev) => ({
      ...prev,
      score: score,
    }));
  }

  function GoToHomePage() {
    navigation.navigate('HomeTabs');
  }

  return (
    <View className="flex-1 bg-off-white">
      {/* Header Section */}
      <View className="flex-row h-1/6 w-screen items-center justify-between px-6">
        <TouchableOpacity className="w-1/6" onPress={GoToHomePage}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-5/6 w-screen px-6 items-center">
        <Text className="text-2xl font-quickbold text-dark-gray">
          Para cada uma das afirmações seguintes, sobre o teu uso da internet,
          seleciona um número onde 1 é Raramente e 5 Sempre
        </Text>
        <View className="w-screen h-3/5 px-6 items-center justify-center">
          <View className="relative w-full h-72">
            <SliderQuestions
              key={`slider`}
              question={currentQuestion.text}
              pos={0}
              isAnswered={currentQuestion.answered}
              updateScore={updateScore}
            />
          </View>
        </View>
        <View className="w-screen h-1/5 px-6">
          <TouchableOpacity
            className="bg-orange rounded-lg w-full py-3 items-center"
            onPress={handleAnswer}
          >
            <Text className="text-xl text-white font-quickbold">Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
