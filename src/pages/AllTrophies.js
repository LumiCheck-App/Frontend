import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { Ionicons } from '@expo/vector-icons';
import Achievements from '../components/Achievements';
import TrophyProgress from '../components/TrophyProgress';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUnlockedAchievements } from '../redux/unlockedAchievementsSlice';
import { fetchLockedAchievements } from '../redux/lockedAchievementsSlice';
import { checkModoZenProgress } from '../redux/modoZenSlice';

import { getTrophyIcon } from '../../assets/trophies';

export default function AllTrophies({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkModoZenProgress());
    dispatch(fetchUnlockedAchievements());
    dispatch(fetchLockedAchievements());
  }, [dispatch]);

  const trophieswon =
    useSelector((state) => state.unlockedAchievements.achievements) || [];

  const trophieslocked =
    useSelector((state) => state.lockedAchievements.achievements) || [];

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Botão de voltar */}
              <View className="w-11/12 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/* Secção de Tarefas Diárias */}
              <View className="w-11/12 mt-8">
                {/* Cabeçalho */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Troféus conquistados
                  </Text>
                </View>

                {trophieswon.map((trophy, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('TrophyDetail', {
                        trophy,
                        image: getTrophyIcon(trophy.image),
                        unlocked: true,
                      })
                    }
                  >
                    <Achievements
                      key={index}
                      text={trophy.name}
                      description={trophy.description}
                      icon={getTrophyIcon(trophy.image)}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View className="w-11/12 mt-8">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Troféus bloqueados
                  </Text>
                </View>

                {trophieslocked.map((trophy, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('TrophyDetail', {
                        trophy,
                        image: getTrophyIcon(trophy.image),
                        unlocked: false,
                      })
                    }
                  >
                    <Achievements
                      key={index}
                      text={'???????'}
                      description={trophy.description}
                      icon={null}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
