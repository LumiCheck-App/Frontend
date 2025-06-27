import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import TrophyGoldIcon from '../../assets/icons/trophygold.svg';
import QuestionIcon from '../../assets/icons/question.svg';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../redux/authSlice';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAnswers } from '../redux/userAnswersSlice';
import { loadUserFromStorage } from '../redux/userSlice';

import { fetchUnlockedAchievements } from '../redux/unlockedAchievementsSlice';

import { getTrophyIcon } from '../../assets/trophies';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

export default function ProfilePage() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { answers: perguntas } = useSelector((state) => state.userAnswers);
  const user = useSelector((state) => state.user.data);

  const trophieswon =
    useSelector((state) => state.unlockedAchievements.achievements) || [];
  const trophiesCount = trophieswon.length;

  useEffect(() => {
    dispatch(fetchUnlockedAchievements());
    dispatch(loadUserFromStorage());
    dispatch(fetchUserAnswers());
  }, [dispatch]);

  const questionCount = perguntas.length;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Ícone PNG */}
              <Image
                source={require('../../assets/user.png')}
                className="w-32 h-32 rounded-full mt-[20px]"
                resizeMode="contain"
              />
              {/* Texto de boas-vindas */}
              <Text className="text-2xl font-quickbold text-black mt-6">
                {user?.username || 'Utilizador'}
              </Text>
              <Text className="text-md font-quickbold text-dark-gray">
                {user?.email || 'utilizador@mail.com'}
              </Text>
              {/* Informações */}
              <View className="flex-row justify-between w-11/12 mt-12">
                {/* Coluna 1: Perguntas respondidas */}
                <View className="bg-white rounded-lg flex-1 border border-light-gray p-3">
                  {/* Linha superior: Ícone e número */}
                  <View className="flex-row ml-2 mb-2 items-center">
                    <QuestionIcon width={24} height={24} />
                    <Text className="text-2xl font-quickbold ml-2">
                      {questionCount}
                    </Text>
                  </View>
                  {/* Linha inferior: Texto */}
                  <Text className="text-sm text-dark-gray text-center">
                    Perguntas respondidas
                  </Text>
                </View>

                {/* Coluna 2: Conquistas obtidas */}
                <View className="bg-white rounded-lg flex-1 mx-2 border border-light-gray p-3">
                  {/* Linha superior: Ícone e número */}
                  <View className="flex-row ml-2 mb-2 items-center">
                    <TrophyGoldIcon width={24} height={24} />
                    <Text className="text-2xl font-quickbold ml-2">
                      {trophiesCount}
                    </Text>
                  </View>
                  {/* Linha inferior: Texto */}
                  <Text className="text-sm text-dark-gray text-center">
                    Troféus obtidos
                  </Text>
                </View>
              </View>
              {/* Secção de Tarefas Diárias */}
              <View className="w-11/12 mt-8">
                <View className="mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Sala de Troféus
                  </Text>
                </View>

                <View className="flex-row bg-white rounded-lg mb-2 border border-light-gray overflow-hidden">
                  {[0, 1, 2].map((i) => {
                    const trophy = trophieswon[i];
                    const isLast = i === 2;
                    const TrophyIcon = trophy
                      ? getTrophyIcon(trophy.image)
                      : BlockedTrophy;

                    return (
                      <React.Fragment key={i}>
                        <View className="flex-1 items-center justify-center py-4">
                          <TouchableOpacity
                            onPress={() =>
                              trophy &&
                              navigation.navigate('TrophyDetail', {
                                trophy,
                                image: TrophyIcon,
                                unlocked: true,
                              })
                            }
                            disabled={!trophy}
                          >
                            <TrophyIcon width={80} height={80} />
                          </TouchableOpacity>
                        </View>

                        {/* Linha vertical entre colunas, menos na última */}
                        {!isLast && <View className="w-px bg-light-gray" />}
                      </React.Fragment>
                    );
                  })}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Troféus', { screen: 'AllTrophies' })
                  }
                >
                  <View className="mb-4 flex-row justify-end">
                    <Text className="text-md font-quickbold text-orange">
                      VER SALA
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray px-4 py-2 items-center">
                <TouchableOpacity
                  className="flex-row items-center w-full py-3"
                  onPress={() => navigation.navigate('AllLumiQuestions')}
                >
                  {/* Ícone */}
                  <View
                    className="mr-4"
                    style={{ width: 40, alignItems: 'center' }}
                  >
                    <FontAwesome6
                      name="clipboard-question"
                      size={25}
                      color="#ff9d00"
                    />
                  </View>

                  {/* Conteúdo de progresso */}
                  <View className="flex-1">
                    {/* Texto */}
                    <Text className="text-lg font-quickbold">
                      Perguntas da Lumi
                    </Text>
                  </View>

                  <View className="ml-auto">
                    <MaterialIcons
                      name="chevron-right"
                      size={30}
                      color="#000000"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center w-full py-3"
                  onPress={() => navigation.navigate('Settings')}
                >
                  {/* Ícone */}
                  <View
                    className="mr-4"
                    style={{ width: 40, alignItems: 'center' }}
                  >
                    <FontAwesome name="gear" size={25} color="#ff9d00" />
                  </View>

                  {/* Conteúdo de progresso */}
                  <View className="flex-1">
                    {/* Texto */}
                    <Text className="text-lg font-quickbold">Definições</Text>
                  </View>

                  <View className="ml-auto">
                    <MaterialIcons
                      name="chevron-right"
                      size={30}
                      color="#000000"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center w-full py-3"
                  onPress={handleLogout}
                >
                  {/* Ícone */}
                  <View
                    className="mr-4"
                    style={{ width: 40, alignItems: 'center' }}
                  >
                    <Feather name="log-out" size={25} color="#da6f6f" />
                  </View>

                  {/* Conteúdo de progresso */}
                  <View className="flex-1">
                    {/* Texto */}
                    <Text className="text-lg font-quickbold text-red">
                      Log Out
                    </Text>
                  </View>

                  <View className="ml-auto">
                    <MaterialIcons
                      name="chevron-right"
                      size={30}
                      color="#da6f6f"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
