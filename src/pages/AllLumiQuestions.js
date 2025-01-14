import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import { Ionicons } from "@expo/vector-icons";
import LumiQuestion from "../components/LumiQuestion.js";
import Lumi3Colors from "../components/Lumi3Colors.js";

export default function AllLumiQuestions({ navigation }) {

    const perguntas = [
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "4" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
        { question: "Mexeste mais no insta hoje do que achas que devias?", score: "3" },
    ];

    return (
        <BackgroundGradient>
            <ScrollView>
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1">
                        <View className="flex-1 items-center pt-12">
                            {/* Botão de voltar */}
                            <View className="w-11/12 flex-row items-center">
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Lumi3Colors negative="2" neutral="1" positive="5" />

                            {perguntas.map((pergunta, index) => (
                                <LumiQuestion key={index} index={index + 1} text={pergunta.question} score={pergunta.score} />
                            ))}

                        </View>
                    </View>

                </View>
            </ScrollView >
        </BackgroundGradient >
    );
}
