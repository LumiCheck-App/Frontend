import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  FlatList,
  Dimensions,
} from "react-native";
import Lumi from "../../assets/lumis/Lumi.svg";
import SwipeIndicator from "../../assets/icons/SwipeIndicator.svg";

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
      navigation.replace("Login");
    }
  };

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentStep === 0) {
      startAnimation();
    }
  }, [currentStep]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 50, // Rotate 50 degrees
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0, // Rotate back to 0 degrees
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '50deg'],
  });


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
            <Animated.View
              style={{
                transform: [
                  { translateY: 15 },
                  { rotate: rotateInterpolation },
                  { translateY: -15 },
                ],
                height: 40,
              }}
            >
              <SwipeIndicator width={40} height={40} style={{ marginRight: 8 }} />
            </Animated.View>

            <Text className="text-lg font-bold">Desliza</Text>
          </View>
        ) : (
          <View style={{ height: 68 }} />
        )}
      </View>
    </View>
  );
}
