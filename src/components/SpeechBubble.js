import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SpeechBubble() {
  const navigation = useNavigation();
  function RedirectToRegister() {
    navigation.replace("Register");
  }
  return (
    <View className="flex-row items-center gap-2">
      {/* Imagem */}
      <Image
        className="w-28 h-28"
        resizeMode="contain"
        source={require("../../assets/Lumi.png")}
      />
      {/* Bubble */}
      <View className="bg-white px-4 py-6 rounded-2xl relative border border-light-gray">
        <Text className="font-normal text-black text-xl text-center">
          Ainda não estás registado?
        </Text>
        <TouchableOpacity>
          <Text
            className="font-bold text-orange underline underline-offset-1 text-2xl text-center"
            onPress={RedirectToRegister}
          >
            Clica aqui
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
