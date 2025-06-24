import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { Ionicons } from '@expo/vector-icons';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

export default function TrophyDetail({ route, navigation }) {
  const { trophy, image, unlocked } = route.params;
  let name, description, IconComponent;

  if (unlocked) {
    IconComponent = image;
  } else {
    IconComponent = BlockedTrophy;
  }

  if (IconComponent === BlockedTrophy) {
    name = '????????';
    description = trophy.description;
  } else {
    name = trophy.name;
    description = trophy.description;
  }

  return (
    <BackgroundGradient>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1 items-center pt-12">
            {/* Botão de voltar */}
            <View className="w-11/12 flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center mb-16">
              <IconComponent
                width={300}
                height={300}
                style={{ marginBottom: 50 }}
              />
              <Text className="text-2xl text-center font-quickbold">
                {name}
              </Text>
              <Text className="mt-4 mb-16 px-16 text-lg text-center font-quickbold text-dark-gray">
                {description}
              </Text>
            </View>
          </View>

          {IconComponent !== BlockedTrophy && (
            <TouchableOpacity
              className="bg-orange rounded-lg w-11/12 py-3"
              style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}
            >
              <Text className="text-xl text-white font-quickbold text-center">
                Partilhar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
