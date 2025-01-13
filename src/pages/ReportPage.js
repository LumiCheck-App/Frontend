import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ArcProgressBar from "../components/ArcProgressBar";
import MostUsedApps from "../components/MostUsedApps";
import ScreenTimeChart from "../components/ScreenTimeChart";
import Lumi3Colors from "../components/Lumi3Colors";
import LumiQuestion from "../components/LumiQuestion";
import { useNavigation } from "@react-navigation/native";
import Lumi from "../../assets/Lumi.svg";
import ScoreIcon from "../../assets/icons/scoreicon.svg";

export default function ReportPage() {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));

  const perguntas = [
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "4" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
  ];

  // Animação para Lumi
  const lumiPositionY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const lumiPositionX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -160],
    extrapolate: "clamp",
  });

  const lumiScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.25],
    extrapolate: "clamp",
  });

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [150, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <LinearGradient
      colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      {/* Efeito de blur no topo da tela */}
      <Animated.View style={{
        opacity: backgroundOpacity,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 160,
        zIndex: 5,
      }}>
        <LinearGradient
          colors={["#ffe5b4", "#ffe5b4", "#fff9ef00"]}
          locations={[0, 0.60, 1]}
          style={{ flex: 1, opacity: 0.9 }}
        />
      </Animated.View>

      {/* Animação para Lumi */}
      <Animated.View
        style={{
          position: "absolute",
          transform: [{ translateX: lumiPositionX }, { translateY: lumiPositionY }, { scale: lumiScale }],
          zIndex: 10,
          left: "50%",
          top: 90,
          marginLeft: -75,
        }}
        className="flex-1 items-center"
      >
        <Lumi width={140} height={140} />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          transform: [{ translateX: lumiPositionX }, { translateY: lumiPositionY }, { scale: lumiScale }],
          zIndex: 10,
          left: "50%",
          top: 90,
          marginLeft: -75,
        }}
        className="flex-1 items-center"
      >
        <Lumi width={140} height={140} />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View className="flex-1 py-8 px-4">
          <View className="flex-1 justify-center items-center pt-12 gap-10">
            <View className="flex-row items-end gap-2">
              <Text className="text-9xl font-bold text-yellow">34</Text>
              <Text className="text-lg font-bold text-black">/100</Text>
              <ScoreIcon width={24} height={24} />
            </View>
            <Text className="text-2xl font-bold text-yellow">
              Uso regular do telemóvel
            </Text>
          </View>
        </View>
        <View className="flex-1 items-center pt-9 px-4 relative mt-60">
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
          <View className="bg-white rounded-lg w-11/12 p-4 border border-light-gray gap-4 relative">
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

        <View className="flex-1 items-center px-4">
          <Lumi3Colors negative="2" neutral="1" positive="5" />
        </View>

        <View className="flex-1 items-center px-4">
          {perguntas.slice(0, 3).map((pergunta, index) => (
            <LumiQuestion key={index} index={index + 1} text={pergunta.question} score={pergunta.score} />
          ))}

          <TouchableOpacity onPress={() => navigation.navigate("Perfil", { screen: "AllLumiQuestions" })}>
            <View className="mt-2 mb-4 flex-row justify-end w-11/12">
              <Text className="text-md font-bold text-right text-orange pb-20">VER TODAS</Text>
            </View>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>
    </LinearGradient >
  );
}
