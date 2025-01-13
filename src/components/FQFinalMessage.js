import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Lumi from "../../assets/Lumi.svg";

export default function FQFinalMessage() {
  const navigation = useNavigation();

  function HomeRedirect() {
    navigation.replace("HomeTabs");
  }
  return (
    <View className="w-screen h-4/5 px-6 justify-center items-center gap-6">
      <Text className="text-dark-gray font-bold text-lg px-16 text-center">
        Temos uma ideia da situação em que te encontras
      </Text>
      <Text className="text-yellow text-center font-bold text-4xl py-6 px-16">
        Avança para descobrir!
      </Text>
      <Lumi height={100} width={100} style={{ margin: 50 }} />
      <TouchableOpacity
        className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
        onPress={HomeRedirect}
      >
        <Text className="text-xl text-white font-bold">Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}
