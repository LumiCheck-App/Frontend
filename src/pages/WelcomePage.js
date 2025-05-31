import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import step1 from '../../assets/onboarding/step1.png';
import orangeCorner from '../../assets/onboarding/orange_corner.png';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WelcomePage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);

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

  const flatListRef = useRef(null);

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
    <View className="flex-1 justify-between items-center p-24 bg-off-white">
      <Image
        source={orangeCorner}
        width={100}
        height={100}
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      />
      <View className="w-screen h-full">
        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={({ item }) => (
            <View>
              {/* Imagem */}
              <View className="justify-center items-center">
                <Image
                  source={item.image}
                  style={{ height: 300, aspectRatio: 1 }}
                />
              </View>
              {/* Texto principal */}
              <View className="justify-center items-center py-24 gap-4">
                <Text className="text-4xl font-quickbold text-center w-screen px-12">
                  {item.text}
                </Text>
                <Text className="font-quickregular text-center w-screen px-12">
                  {item.description}
                </Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleScroll}
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16} // Optimize scroll updates
        />
      </View>

      {/* Barra de progresso */}
      <View className="flex-col justify-center items-center mt-6 absolute z-10 bottom-24">
        <View className="flex-row justify-center items-center m-12">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? 'bg-orange' : 'bg-[#FFE5B4]'}`}
            />
          ))}
        </View>

        {/* Botão "Próximo" */}
        <View
          className={`flex-row justify-end w-screen px-10 ${currentStep === steps.length - 1 ? 'hidden' : 'block'}`}
        >
          {/* Botão Próximo */}
          <TouchableOpacity
            className="px-6 rounded-lg"
            onPress={() => {
              if (currentStep < steps.length - 1) {
                flatListRef.current.scrollToIndex({ index: currentStep + 1 });
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <MaterialIcons name="arrow-forward" size={40} color={'#ff9d00'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
