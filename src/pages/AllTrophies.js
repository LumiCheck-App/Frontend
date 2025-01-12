import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Achievements from "../components/Achievements";

export default function AllTrophies({ navigation }) {

    const trophieswon = [{
        text: "Troféu 1",
        description: "Descrição do troféu 1",
        icon: require("../../assets/trofeu-vermelho.png")
    },
    {
        text: "Troféu 2",
        description: "Descrição do troféu 2",
        icon: require("../../assets/trofeu-azul.png")
    }
    ];

    const trophiesblocked = [{
        text: "Troféu 3",
        description: "Descrição do troféu 3",
        icon: require("../../assets/trofeu-vermelho.png")
    },
    {
        text: "Troféu 4",
        description: "Descrição do troféu 4",
        icon: require("../../assets/trofeu-azul.png")
    }
    ];


    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
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

                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="flex-row items-center justify-between mb-4">
                                    <Text className="text-xl font-bold text-black">Trofeus conquistados</Text>
                                </View>

                                {trophieswon.map((trophy, index) => (
                                    <Achievements key={index} text={trophy.text} description={trophy.description} icon={trophy.icon} />
                                ))}

                            </View>

                            <View className="w-11/12 mt-8">

                                <View className="flex-row items-center justify-between mb-4">
                                    <Text className="text-xl font-bold text-black">Trofeus bloqueados</Text>
                                </View>

                                {trophiesblocked.map((trophy, index) => (
                                    <Achievements key={index} text={"???????"} description={trophy.description} icon={null} />
                                ))}

                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}	
