import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Easing, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import step1 from "../../assets/onboarding/step1.png";
import step2 from "../../assets/onboarding/step2.png";
import step3 from "../../assets/onboarding/step3.png";
import step4 from "../../assets/onboarding/step4.png";
import step5 from "../../assets/onboarding/step5.png";
import step6 from "../../assets/onboarding/step6.png";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Onboarding({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      image: step1,
      text: "Olá mais uma vez!",
      description: "Agora um pequeno tutorial, para entenderes a app que pode mudar os teus hábitos de vida",
    },
    {
      id: 1,
      image: step2,
      text: "Monitorização",
      description:
        "Ao iniciar a monitorização, a Lumi vai fazendo questões sobre os teus hábitos, para complementar as perguntas que já te foram feitas e mostrando sempre esses resultados!",
    },
    {
      id: 2,
      image: step3,
      text: "Tarefas e Troféus",
      description:
        "Conclui pequenos desafios de modo a melhorar a tua qualidade de vida e ganha troféus juntamente com o teu progresso!",
    },
    {
      id: 3,
      image: step4,
      text: "Ajuda Profissional",
      description: "Existem diversas pessoas que te querem ajudar, encontra-as no nosso mapa!",
    },
    {
      id: 4,
      image: step5,
      text: "Aprender Mais",
      description:
        "Se quiseres aprender mais sobre bons hábitos digitais, acede aos posts que fornecemos na página de ajuda!",
    },
    {
      id: 5,
      image: step6,
      text: "Estás perdido?",
      description:
        "Na pagina de perfil podes voltar a ver este mini tutorial e esclarecer todas as tuas duvidas acerca desta app fantástica!",
    },
  ];

  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (currentIndex !== currentStep) {
      setCurrentStep(currentIndex);
    }
  };

  return (
    <View className="flex-1 justify-between items-center p-36 bg-off-white">
      <View className="w-screen h-full">
        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={({ item }) => (
            <View>
              {/* Imagem */}
              <View className="justify-center items-center">
                <Image source={item.image} style={{ height: 300, aspectRatio: 1 }} />
              </View>
              {/* Texto principal */}
              <View className="justify-center items-center py-20">
                <Text className="text-4xl font-quickbold text-center mb-6 w-screen px-12">{item.text}</Text>
                <Text className="text-xl font-quickregular text-center mb-6 w-screen px-12">{item.description}</Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleScroll}
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16} // Optimize scroll updates
        />
      </View>

      {/* Barra de progresso */}
      <View className="flex-col justify-center items-center mt-6 absolute z-10 bottom-24">
        <View className="flex-row justify-center items-center m-12">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? "bg-orange" : "bg-[#FFE5B4]"}`}
            />
          ))}
        </View>

        {/* Botões "Saltar" e "Próximo" */}
        <View
          className={`flex-row justify-between w-screen px-10 ${currentStep === steps.length - 1 ? "hidden" : "block"}`}
        >
          {/* Botão Saltar */}
          <TouchableOpacity
            className="border-2 border-orange bg-white px-6 py-2 rounded-lg"
            onPress={() => flatListRef.current.scrollToIndex({ index: steps.length - 1 })}
          >
            <Text className="text-orange text-lg font-quickbold">Saltar</Text>
          </TouchableOpacity>

          {/* Botão Próximo */}
          <TouchableOpacity
            className="bg-orange px-6 py-2 rounded-lg"
            onPress={() => {
              if (currentStep < steps.length - 1) {
                flatListRef.current.scrollToIndex({ index: currentStep + 1 });
              }
            }}
          >
            <Text className="text-white text-lg font-quickbold">Próximo</Text>
          </TouchableOpacity>
        </View>

        {/* Botões "Inicio" e "Concluir" */}
        <View
          className={`flex-row justify-between w-screen px-10 ${currentStep === steps.length - 1 ? "block" : "hidden"}`}
        >
          {/* Botão Inicio */}
          <TouchableOpacity
            className="border-2 border-orange bg-white px-6 py-2 rounded-lg"
            onPress={() => flatListRef.current.scrollToIndex({ index: 0 })}
          >
            <Text className="text-orange text-lg font-quickbold">Inicio</Text>
          </TouchableOpacity>

          {/* Botão Concluir */}
          <TouchableOpacity className="bg-orange px-6 py-2 rounded-lg" onPress={() => navigation.replace("HomeTabs")}>
            <Text className="text-white text-lg font-quickbold">Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
