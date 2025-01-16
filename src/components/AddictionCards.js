import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeableCard from "./SwipeableCard";
import FQFirstMessage from "./FQFirstMessage";

import RedesSociais from "../../assets/RedesSociais.png";
import JogosOnline from "../../assets/JogosOnline.png";
import Jogos from "../../assets/Jogos.png";
import ComprasOnline from "../../assets/ComprasOnline.png";
import SwipeIndicator from "../../assets/icons/SwipeIndicator.svg";

export default function AddictionCards({
  onCardSwipe,
  modalVisible,
  CloseModal,
}) {
  const [cards, setCards] = useState([
    { id: 0, text: "Redes Sociais", image: RedesSociais },
    { id: 1, text: "Jogos de sorte", image: JogosOnline },
    { id: 2, text: "Jogos", image: Jogos },
    { id: 3, text: "Compras Online", image: ComprasOnline },
  ]);

  const progress = 50 / cards.length;
  const handleSwipe = (id, direction) => {
    if (direction === "right") {
      //send to database
    }

    if (onCardSwipe) {
      onCardSwipe(progress, id, "SwipeableCard");
    }
  };

  function CloseFQMModal() {
    CloseModal();
  }

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

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

  const rotateInterpolation2 = rotateAnim.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '-50deg'], // Rotação espelhada
  });


  return (
    <View className="flex-1 ">
      <FQFirstMessage modalVisible={modalVisible} CloseModal={CloseFQMModal} />
      {/* Question Section */}
      <View className="w-screen px-6 mb-16 items-center">
        <Text className="font-quickbold text-yellow text-center text-4xl">
          Que dependências queres monitorizar?
        </Text>
      </View>

      {/* Swipeable Cards */}
      <GestureHandlerRootView>
        {cards.map((card, index) => (
          <SwipeableCard
            key={card.id}
            card={card}
            index={index}
            onSwipe={(direction) => handleSwipe(card.id, direction)}
          />
        ))}
      </GestureHandlerRootView>

      {/* Bottom Actions */}
      <View className="w-screen h-2/5 px-4 flex-row justify-around items-center">
        <View className="flex-row items-center gap-3">
          <Text className="text-lg text-red font-quickbold">NÃO</Text>
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
        </View>
        <Text className="text-gray-600 font-medium font-quickregular">
          Desliza para responder
        </Text>
        <View className="flex-row items-center gap-3">
          <Animated.View
            style={{
              transform: [
                { translateY: 15 },
                { rotate: rotateInterpolation2 },
                { translateY: -15 },
                { scaleX: -1 },
              ],
              height: 40,
            }}
          >
            <SwipeIndicator width={40} height={40} style={{ marginRight: 8 }} />
          </Animated.View>
          <Text className="text-lg text-green-600 font-quickbold">SIM</Text>
        </View>
      </View>
    </View>
  );
}
