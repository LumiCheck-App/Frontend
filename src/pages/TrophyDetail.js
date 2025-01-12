import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";
import TaskFinished from "../components/TaskFinished";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function TrophyDetail({ navigation }) {

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1 items-center pt-12">
                        {/* Botão de voltar */}
                        <View className="w-11/12 flex-row items-center">
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-1 justify-center items-center mb-16">
                            <Image
                                source={require("../../assets/trophydetail.png")}
                                className="w-72 h-72 mb-16"
                                resizeMode="contain"
                            />
                            <Text className="text-2xl text-center font-bold">A Penantes</Text>
                            <Text className="mt-4 mb-16 px-16 text-lg text-center font-bold text-dark-gray">
                                Sair à rua para fazer uma caminhada em 5 dias distintos
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-yellow rounded-lg w-11/12 py-3" style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
                        <Text className="text-xl text-white font-bold text-center">Partilhar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
