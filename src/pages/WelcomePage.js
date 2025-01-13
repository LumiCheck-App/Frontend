import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Lumi from "../../assets/Lumi.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function WelcomePage({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, text: "Olá! Bem-vindo ao LUMICHECK!" },
    { id: 1, text: "Eu sou a Lumi. É um prazer poder conhecer-te!" },
    { id: 2, text: "Vamos começar?" },
    { id: 3, text: " " },
  ];

  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (currentIndex !== currentStep) {
      setCurrentStep(currentIndex);
    }
    if (currentIndex === steps.length - 1) {
      navigation.replace("HomeTabs");
    }
  };

  return (
    <View className="flex-1 justify-between items-center p-20 bg-yellow">
      {/* Texto principal */}
      <View className="w-screen h-screen">
        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={({ item }) => (
            <View>
              <View className="h-2/6 justify-center items-center">
                <Text className="text-4xl font-bold text-center mb-6 w-screen px-12">
                  {item.text}
                </Text>
              </View>
              {/* Imagem */}
              <View
                className={`justify-center items-center ${item.id === steps.length - 1 ? "hidden" : "block"
                  }`}
              >
                <Lumi width={200} height={200} />
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
        <View className="flex-row justify-center items-center mt-6">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? "bg-orange" : "bg-white"
                }`}
            />
          ))}
        </View>

        {/* Texto fixo indicando para deslizar */}
        {currentStep === 0 ? (
          <View className="flex items-end w-screen px-12 mt-1">
            <Image
              id="swipe_Icon"
              source={require("../../assets/Swipe_Icon.png")}
              className="swipe_anime"
            />
            <Text className="text-lg font-bold">Desliza</Text>
          </View>
        ) : (
          <View className="flex items-end w-screen px-12 mt-1">
            <View style={{ height: 67.5 }} />
          </View>
        )}
      </View>
    </View>
  );
}
