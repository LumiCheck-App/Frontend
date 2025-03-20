import React from "react";
import { Text, View } from "react-native";
import { Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import App from "./App";

export default function FontDefiner() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-off'white">
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return <App />;
}
