import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeableCard from "./SwipeableCard";
import FQFirstMessage from "./FQFirstMessage";

import RedesSociais from "../../assets/RedesSociais.png";
import JogosOnline from "../../assets/JogosOnline.png";
import Jogos from "../../assets/Jogos.png";
import ComprasOnline from "../../assets/ComprasOnline.png";

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

  return (
    <View className="flex-1 ">
      <FQFirstMessage modalVisible={modalVisible} CloseModal={CloseFQMModal} />
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
            className={`${!modalVisible ? "swipe_anime" : "dont_swipe"}`}
          />
        </View>
        <Text className="text-gray-600 font-medium">
          Desliza para responder
        </Text>
        <View className="flex-row items-center gap-3">
          <Image
            source={require("../../assets/Swipe_Icon.png")}
            className={`${
              !modalVisible ? "swipe_anime flip" : "dont_swipe flip"
            }`}
          />
          <Text className="text-lg text-green-600 font-semibold">SIM</Text>
        </View>
      </View>
    </View>
  );
}
