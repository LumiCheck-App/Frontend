import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ArcProgressBar from "../components/ArcProgressBar";
import MostUsedApps from "../components/MostUsedApps";
import ScreenTimeChart from "../components/ScreenTimeChart";

export default function ReportPage() {
  return (
    <LinearGradient
      colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1 justify-center items-center pt-12 gap-10">
            <Image
              source={require("../../assets/Lumi.png")}
              className="w-40 h-40"
              resizeMode="contain"
            />
            <View className="flex-row items-end gap-1 ">
              <Text
                className="text-9xl font-bold text-light-yellow"
                style={{
                  textShadowColor: "#ff9d00",
                  textShadowOffset: { width: 2, height: 1 },
                  textShadowRadius: 5,
                }}
              >
                34
              </Text>
              <Text className="text-2xl font-bold text-black">/100</Text>
            </View>
            <Text className="text-2xl font-bold text-yellow">
              Uso regular do telemóvel
            </Text>
          </View>
        </View>
        <View className="flex-1 items-center pt-9 px-4 relative">
          <View className="bg-white rounded-lg w-11/12 p-4 border border-light-gray items-center justify-center gap-4">
            <ArcProgressBar />
            <Text className="text-lg font-regular">
              O seu relatório está quase terminado.
            </Text>
            <Text className="text-lg font-bold">
              O LumiScore é apenas uma previsão!
            </Text>
            <TouchableOpacity className="absolute top-2 right-2">
              <FontAwesome name="gear" size={20} color="#d0d0d0" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 items-center pt-9 px-4">
          <View className="bg-white rounded-lg w-11/12 p-4 border border-light-gray gap-4">
            <Text className="text-lg font-bold">Tempo de ecrã</Text>
            <ScreenTimeChart />
          </View>
        </View>
        <View className="flex-1 items-center pt-9 px-4">
          <View className="bg-white rounded-lg w-11/12 p-4 border border-light-gray gap-4">
            <Text className="text-lg font-bold">Apps mais usadas</Text>
            <MostUsedApps />
          </View>
        </View>

        <View className="flex-1 items-center pt-9 px-4 mb-10">
          <View className="bg-white rounded-lg w-11/12 p-4 border border-light-gray items-center justify-center gap-4">
            <Text className="text-lg font-regular">Perguntas da Lumi</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
