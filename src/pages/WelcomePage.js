import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  FlatList,
} from "react-native";

export default function WelcomePage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      text: "Olá! Bem-vindo ao LUMICHECK!",
    },
    {
      id: 1,
      text: "Eu sou a Lumi. É um prazer poder conhecer-te!",
    },
    {
      id: 2,
      text: "Vamos começar?",
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace("Login");
    }
  };

  // Configuração do PanResponder para capturar gestos
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Detecta se o movimento horizontal é significativo
      return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        // Movimento de deslizar para a esquerda
        handleNextStep();
      }
    },
  });

  return (
    <Animated.View
      className="flex-1 justify-between items-center p-20 bg-yellow"
      {...panResponder.panHandlers}
    >
      {/* Texto principal */}
      <View className="w-screen h-screen">
        {/*  Renderizar os textos */}
        <FlatList
          data={steps}
          renderItem={({ item }) => (
            <>
              <View>
                <View className="h-2/6 justify-center items-center">
                  <Text
                    className={`text-4xl font-bold text-center mb-6 w-screen px-12`}
                  >
                    {item.text}
                  </Text>
                </View>
                {/* Imagem */}
                <View className="justify-center items-center">
                  <Image source={require("../../assets/Lumi.png")} />
                </View>
              </View>
            </>
          )}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          keyExtractor={(item) => item.id}
        />
      </View>

      <View className="flex-col justify-center items-center mt-6 absolute z-10 bottom-24">
        {/* Barra de progresso */}
        <View className="flex-row justify-center items-center mt-6">
          {[...Array(steps.length + 1)].map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentStep ? "bg-orange" : "bg-white"
              }`}
            />
          ))}
        </View>

        {/* Texto fixo indicando para deslizar */}
        <View
          className={`flex items-end w-screen px-12 mt-1 transition-opacity ${
            currentStep === 0 ? "opacity-1" : "opacity-0"
          }`}
        >
          <Image
            source={require("../../assets/Swipe_Icon.png")}
            className="swipe_anime"
          />
          <Text className="text-lg font-bold">Desliza</Text>
        </View>
      </View>
    </Animated.View>
  );
}
