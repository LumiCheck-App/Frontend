import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import step1 from '../../assets/lumis/Lumi4k.png';
import orangeCorner from '../../assets/onboarding/orange_corner.png';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomePage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef(null);

  const steps = [
    {
      id: 0,
      image: step1,
      text: 'Olá!',
      description:
        'Bem vindo à Lumicheck. É um prazer conhecer-te, eu sou a Lumi! Pronto para comecçar?',
    },
    {
      id: 1,
      image: null,
      text: '',
      description: '',
    },
  ];

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (currentIndex !== currentStep) {
      setCurrentStep(currentIndex);
    }
    if (currentIndex === steps.length - 1) {
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex-1 bg-off-white relative">
      {/* Imagem laranja no canto */}
      <Image
        source={orangeCorner}
        width={100}
        height={100}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      />

      {/* FlatList de onboarding */}
      <FlatList
        ref={flatListRef}
        data={steps}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              height: SCREEN_HEIGHT * 0.7,
              width: SCREEN_WIDTH,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Conteúdo central */}
            <View className="flex-1 justify-around items-center px-6 py-12">
              <Image
                source={item.image}
                style={{
                  height: 200,
                  width: SCREEN_WIDTH * 0.8,
                  resizeMode: 'contain',
                }}
              />
              <View className="gap-4 items-center">
                <Text className="text-4xl font-quickbold text-center">
                  {item.text}
                </Text>
                <Text className="font-quickregular text-center">
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Bolinhas de progresso (fixas no ecrã) */}
      <View className="absolute bottom-36 left-0 right-0 flex-row justify-center items-center">
        {steps.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentStep ? 'bg-orange' : 'bg-[#FFE5B4]'
            }`}
          />
        ))}
      </View>

      {/* Botão "Próximo" */}
      {currentStep < steps.length - 1 && (
        <View className="absolute bottom-24 right-14">
          <TouchableOpacity
            onPress={() => {
              flatListRef.current.scrollToIndex({ index: currentStep + 1 });
            }}
          >
            <MaterialIcons name="arrow-forward" size={40} color={'#ff9d00'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
