import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { useNavigation } from '@react-navigation/native';
import TrophyProgress from '../components/TrophyProgress';
import Achievements from '../components/Achievements';
import DailyTasks from '../components/DailyTasks';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUnlockedAchievements } from '../redux/unlockedAchievementsSlice';
import { fetchLockedAchievements } from '../redux/lockedAchievementsSlice';
import { checkModoZenProgress } from '../redux/modoZenSlice';

import { getTrophyIcon } from '../../assets/trophies';

export default function TrophiesPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkModoZenProgress());
    dispatch(fetchUnlockedAchievements());
    dispatch(fetchLockedAchievements());
  }, [dispatch]);

  const modoZen = useSelector((state) => state.modoZen.data) || {};

  const trophiesunlocked =
    useSelector((state) => state.unlockedAchievements.achievements) || [];
  const trophieswon = trophiesunlocked.filter(
    (trophy) => trophy.tag !== 'modozen'
  );

  const trophiesnotwon =
    useSelector((state) => state.lockedAchievements.achievements) || [];
  const trophieslocked = trophiesnotwon.filter(
    (trophy) => trophy.tag !== 'modozen'
  );

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Secção de Tarefas Diárias */}
              <View className="w-11/12 mt-8">
                {/* Cabeçalho */}
                <View className="mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Tarefas Diárias
                  </Text>
                </View>

                <DailyTasks userId={6} />

                {/* Ver todas */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllTasks')}
                >
                  <View className="mb-4 flex-row justify-end">
                    <Text className="text-md font-quickbold text-orange">
                      VER TODAS
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Secção de Troféus */}
              <View className="w-11/12 mt-8">
                {/* Cabeçalho */}
                <View className="mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Troféu Especial
                  </Text>
                </View>

                {/* Icon exclusivo */}
                <View className="bg-white rounded-lg border border-light-gray p-4 items-center">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TrophyDetail', {
                        trophy: modoZen.achievement,
                        image: getTrophyIcon(modoZen.achievement.image),
                        unlocked: modoZen.unlocked,
                      })
                    }
                  >
                    <TrophyProgress
                      text={modoZen?.achievement?.name}
                      description={modoZen?.achievement?.description}
                      progress={modoZen?.progress}
                      total={modoZen?.total}
                      icon={
                        modoZen?.unlocked
                          ? getTrophyIcon(modoZen?.achievement.image)
                          : ''
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View className="bg-white rounded-lg border border-light-gray p-4 mt-8">
                  <View className="mb-4">
                    <Text className="text-xl font-quickbold text-black">
                      Outros Troféus
                    </Text>
                  </View>
                  {trophieslocked.slice(0, 3).map((trophy, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate('TrophyDetail', {
                          trophy,
                          image: getTrophyIcon(trophy.image),
                          unlocked: false,
                        })
                      }
                      className="mb-4"
                    >
                      <TrophyProgress
                        text={trophy.name}
                        description={trophy.description}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="w-11/12 mt-8">
                {/* Cabeçalho */}
                <View className="mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Sala de Troféus
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
                      text={trophy.name}
                      description={trophy.description}
                      icon={getTrophyIcon(trophy.image)}
                    />
                  </TouchableOpacity>
                ))}
                {/* Ver todas */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllTrophies')}
                >
                  <View className="mb-4 flex-row justify-end">
                    <Text className="text-md font-quickbold text-orange">
                      VER SALA
                    </Text>
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
