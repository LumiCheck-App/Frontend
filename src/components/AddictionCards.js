import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeableCard from "./SwipeableCard";

export default function AddictionCards({ onCardSwipe }) {
  const [cards, setCards] = useState([
    { id: 0, text: "Redes Sociais", image: "../../assets/RedesSociais.png" },
    { id: 1, text: "Jogos de sorte", image: "../../assets/JogosOnline.png" },
    { id: 2, text: "Jogos", image: "../../assets/Jogos.png" },
    { id: 3, text: "Compras Online", image: "../../assets/ComprasOnline.png" },
  ]);

  const progress = 50 / cards.length;
  const handleSwipe = (id, direction) => {
    //console.log(`Swiped ${direction} on: ${id}`);

    if (direction === "right") {
      //send to database
    }

    if (onCardSwipe) {
      onCardSwipe(progress, id, "SwipeableCard");
    }
  };

  return (
    <View className="flex-1 ">
      {/* Question Section */}
      <View className="w-screen px-6 mb-16 items-center">
        <Text className="font-bold text-yellow text-center text-4xl">
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
          <Text className="text-lg text-red-600 font-semibold">NÃO</Text>
          <Image
            source={require("../../assets/Swipe_Icon.png")}
            className="swipe_anime"
          />
        </View>
        <Text className="text-gray-600 font-medium">
          Desliza para responder
        </Text>
        <View className="flex-row items-center gap-3">
          <Image
            source={require("../../assets/Swipe_Icon.png")}
            className="swipe_anime flip"
          />
          <Text className="text-lg text-green-600 font-semibold">SIM</Text>
        </View>
      </View>
    </View>
  );
}
