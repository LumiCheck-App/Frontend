import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation }) {

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
                                <View className="flex-1"></View>
                            </View>

                            <View className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray px-4 py-2 items-center">
                                <View className="flex-row items-center w-full py-3">
                                    {/* Ícone */}
                                    <View className="mr-4" style={{ width: 40, alignItems: 'center' }}>
                                        <FontAwesome6 name="clipboard-question" size={25} color="#fcc766" />
                                    </View>

                                    {/* Conteúdo de progresso */}
                                    <View className="flex-1">
                                        {/* Texto */}
                                        <Text className="text-lg font-bold">Perguntas da Lumi</Text>
                                    </View>

                                    <View className="ml-auto">
                                        <MaterialIcons name="chevron-right" size={30} color="#000000" />
                                    </View>
                                </View>

                                <View className="flex-row items-center w-full py-3">
                                    {/* Ícone */}
                                    <View className="mr-4" style={{ width: 40, alignItems: 'center' }}>
                                        <FontAwesome name="gear" size={25} color="#fcc766" />
                                    </View>

                                    {/* Conteúdo de progresso */}
                                    <View className="flex-1">
                                        {/* Texto */}
                                        <Text className="text-lg font-bold">Definições</Text>
                                    </View>

                                    <View className="ml-auto">
                                        <MaterialIcons name="chevron-right" size={30} color="#000000" />
                                    </View>
                                </View>

                                <View className="flex-row items-center w-full py-3">
                                    {/* Ícone */}
                                    <View className="mr-4" style={{ width: 40, alignItems: 'center' }}>
                                        <Feather name="log-out" size={25} color="#da6f6f" />
                                    </View>

                                    {/* Conteúdo de progresso */}
                                    <View className="flex-1">
                                        {/* Texto */}
                                        <Text className="text-lg font-bold">Log Out</Text>
                                    </View>

                                    <View className="ml-auto">
                                        <MaterialIcons name="chevron-right" size={30} color="#da6f6f" />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}	
