import React from "react";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_Regular: Quicksand_400Regular,
    Quicksand_Bold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-yellow">
      <Text className="text-xl font-bold text-center">
        Olá!{"\n"}Bem-Vindo à{"\n"}LUMICHECK!
      </Text>
    </View>
  );
}
