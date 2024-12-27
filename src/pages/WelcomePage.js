import React, { useState } from "react";
import { View, Text, Image, PanResponder } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function WelcomePage({ navigation }) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { text: "Olá! Bem-vindo ao LUMICHECK!", image: require("../../assets/Lumi.png") },
        { text: "Eu sou a Lumi. É um prazer poder conhecer-te!", image: require("../../assets/Lumi.png") },
        { text: "Vamos começar?", image: require("../../assets/Lumi.png") },
    ];

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigation.replace("Login");
        }
    };

    // Configuração do PanResponder para capturar gestos
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            // Detecta se o movimento horizontal é significativo
            return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -50) {
                // Movimento de deslizar para a esquerda
                handleNextStep();
            }
        },
    });

    return (
        <View
            className="flex-1 justify-center items-center bg-yellow"
            {...panResponder.panHandlers}
        >
            {/* Texto principal */}
            <Text className="text-xl font-bold text-center mb-6">{steps[currentStep].text}</Text>

            {/* Imagem */}
            <Image source={steps[currentStep].image} />

            {/* Barra de progresso */}
            <View className="flex-row justify-center items-center mt-6">
                {[...Array(steps.length + 1)].map((_, index) => (
                    <View
                        key={index}
                        className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? "bg-orange" : "bg-white"
                            }`}
                    />
                ))}
            </View>

            {/* Texto fixo indicando para deslizar */}
            <View className="flex-row items-center mt-10">
                <Text className="text-lg font-bold text-blue-600">Desliza</Text>
                <FontAwesome name="arrow-right" size={24} color="#1E90FF" className="ml-2" />
            </View>
        </View>
    );
}
