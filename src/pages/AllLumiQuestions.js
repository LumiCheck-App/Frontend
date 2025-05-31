import React, { useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { Ionicons } from '@expo/vector-icons';
import LumiQuestion from '../components/LumiQuestion.js';
import Lumi3Colors from '../components/Lumi3Colors.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAnswers } from '../redux/userAnswersSlice';

export default function AllLumiQuestions({ navigation }) {
  const dispatch = useDispatch();
  const {
    answers: perguntas,
    loading,
    error,
  } = useSelector((state) => state.userAnswers);

  useEffect(() => {
    dispatch(fetchUserAnswers());
  }, [dispatch]);

  if (loading) return <Text>A carregar...</Text>;
  if (error) return <Text>Erro: {error}</Text>;

  // Função para obter a legenda com base na pontuação
  const getCaptionFromScore = (score) => {
    switch (score) {
      case 0:
        return 'Não aplicável';
      case 1:
        return 'Raramente';
      case 2:
        return 'Ocasionalmente';
      case 3:
        return 'Frequentemente';
      case 4:
        return 'Muitas Vezes';
      case 5:
        return 'Sempre';
      default:
        return '';
    }
  };

  const negativeCount = perguntas.filter(
    (p) => p.answer === 4 || p.answer === 5
  ).length;
  const neutralCount = perguntas.filter(
    (p) => p.answer === 2 || p.answer === 3
  ).length;
  const positiveCount = perguntas.filter(
    (p) => p.answer === 0 || p.answer === 1
  ).length;

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Botão de voltar */}
              <View className="w-11/12 flex-row items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Relatório')}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <Lumi3Colors
                negative={negativeCount.toString()}
                neutral={neutralCount.toString()}
                positive={positiveCount.toString()}
              />

              {perguntas.map((pergunta, index) => (
                <LumiQuestion
                  key={index}
                  index={index + 1}
                  text={pergunta.question}
                  score={pergunta.answer?.toString() || '0'}
                  caption={getCaptionFromScore(pergunta.answer)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
