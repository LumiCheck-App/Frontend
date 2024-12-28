import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";

export default function HomePage() {
    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.3, 1]}
            className="flex-1"
        >
            <View className="flex-1 items-center pt-12">
                {/* Ícone PNG */}
                <Image
                    source={require("../../assets/Lumi.png")} // Caminho do ícone grande (fogo)
                    className="w-20 h-20"
                    resizeMode="contain"
                />

                {/* Texto de boas-vindas */}
                <Text className="text-2xl font-bold text-gray-800 mt-2">
                    Olá, Rodrigo!
                </Text>

                {/* Botão de Monitorização */}
                <TouchableOpacity className="bg-yellow-500 rounded-full py-2 px-6 mt-5">
                    <Text className="text-white font-bold text-base">Começar Monitorização</Text>
                </TouchableOpacity>

                {/* Secção de Tarefas Diárias */}
                <View className="w-11/12 bg-white rounded-lg p-4 mt-8 shadow">
                    <Text className="text-lg font-bold text-gray-600 mb-4">
                        Tarefas Diárias
                    </Text>

                    {/* Primeira tarefa */}
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-gray-600 flex-1">
                            Estar apenas 2 horas no Insta hoje
                        </Text>
                        <SvgUri
                            width={24}
                            height={24}
                            uri="../../assets/icons/check.svg" // Caminho do ícone SVG
                        />
                    </View>

                    {/* Segunda tarefa */}
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-gray-600 flex-1">
                            Falar com os amigos
                        </Text>
                        <SvgUri
                            width={24}
                            height={24}
                            uri="../..assets/icons/check.svg" // Caminho do ícone SVG
                        />
                    </View>
                </View>

                {/* Secção de Ícones e Pontos */}
                <View className="flex-row justify-between items-center w-28 mt-8">
                    {/* Ícone de "?" */}
                    <View className="items-center">
                        <SvgUri
                            width={24}
                            height={24}
                            uri="../../assets/icons/question.svg" // Caminho do ícone SVG
                        />
                        <Text className="text-sm font-bold text-gray-600 mt-1">14</Text>
                    </View>

                    {/* Ícone de troféu */}
                    <View className="items-center">
                        <SvgUri
                            width={24}
                            height={24}
                            uri="../../assets/icons/trophygold.svg" // Caminho do ícone SVG
                        />
                        <Text className="text-sm font-bold text-gray-600 mt-1">2</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}
