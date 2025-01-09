import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FQFinalMessage() {
  const navigation = useNavigation();

  function HomeRedirect() {
    navigation.replace("HomeTabs");
  }
  return (
    <View className="w-screen h-4/5 px-6 justify-center items-center gap-6">
      <Text className="text-yellow text-center font-bold text-4xl">
        Temos uma ideia da situação em que te encontras
      </Text>
      <Text className="text-dark-gray font-regular text-2xl">
        Avança para descobrir!
      </Text>
      <Image
        className="transform scale-50"
        source={require("../../assets/Lumi.png")}
      />
      <TouchableOpacity
        className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
        onPress={HomeRedirect}
      >
        <Text className="text-xl text-white font-bold">Avançar!</Text>
      </TouchableOpacity>
    </View>
  );
}
