import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Lumi from "../../assets/lumis/Lumi.svg"

export default function SpeechBubble() {
  const navigation = useNavigation()
  function RedirectToRegister() {
    navigation.replace("Register")
  }
  return (
    <View className="flex-row items-center gap-2">
      {/* Imagem */}
      <Lumi width={100} height={100} accessible={true} accessibilityLabel="Imagem da Lum" />
      {/* Bubble */}
      <View className="bg-white px-4 py-6 rounded-2xl relative border border-light-gray">
        <TouchableOpacity>
          <Text className="font-quickregular text-2xl text-center" onPress={RedirectToRegister}>
            Clica aqui se ainda
          </Text>
          <Text
            className="font-quickbold text-orange underline underline-offset-1 text-2xl text-center"
            onPress={RedirectToRegister}
          >
            não estás registado
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
