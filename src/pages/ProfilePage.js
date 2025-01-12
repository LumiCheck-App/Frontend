import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import TrophyRed from "../../assets/trofeu-vermelho.png";

export default function ProfilePage() {
    const navigation = useNavigation();

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

                            {/* Ícone PNG */}
                            <Image
                                source={require("../../assets/juice_pfp.jpg")}
                                className="w-40 h-40 rounded-full mt-[24px]"
                                resizeMode="contain"
                            />

                            {/* Texto de boas-vindas */}
                            <Text className="text-2xl font-bold text-black mt-6">
                                Rodrigo
                            </Text>
                            <Text className="text-md font-bold text-dark-gray">
                                rodrigograca@gmail.com
                            </Text>
                            {/* Informações */}
                            <View className="flex-row justify-between w-11/12 mt-12">
                                {/* Coluna 1: Perguntas respondidas */}
                                <View className="bg-white rounded-lg flex-1 border border-light-gray p-3">
                                    {/* Linha superior: Ícone e número */}
                                    <View className="flex-row ml-2 mb-2 items-center">
                                        <QuestionIcon width={24} height={24} />
                                        <Text className="text-2xl font-bold ml-2">14</Text>
                                    </View>
                                    {/* Linha inferior: Texto */}
                                    <Text className="text-sm text-dark-gray text-center">Perguntas respondidas</Text>
                                </View>

                                {/* Coluna 2: Conquistas obtidas */}
                                <View className="bg-white rounded-lg flex-1 mx-2 border border-light-gray p-3">
                                    {/* Linha superior: Ícone e número */}
                                    <View className="flex-row ml-2 mb-2 items-center">
                                        <TrophyGoldIcon width={24} height={24} />
                                        <Text className="text-2xl font-bold ml-2">4</Text>
                                    </View>
                                    {/* Linha inferior: Texto */}
                                    <Text className="text-sm text-dark-gray text-center">Conquistas obtidas</Text>
                                </View>
                            </View>


                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-bold text-black">Tarefas Diárias</Text>
                                </View>

                                <View className="flex-row items-center justify-around bg-white rounded-lg mb-2 border border-light-gray">
                                    {/* Texto da tarefa */}
                                    <TouchableOpacity onPress={() => navigation.navigate("TrophyDetail")}>
                                        <Image source={TrophyRed} className="w-20 h-20 m-6" resizeMode="contain" />
                                    </TouchableOpacity>
                                    <View className="w-px h-full bg-light-gray" />
                                    <TouchableOpacity onPress={() => navigation.navigate("TrophyDetail")}>
                                        <Image source={TrophyRed} className="w-20 h-20 m-6" resizeMode="contain" />
                                    </TouchableOpacity>
                                    <View className="w-px h-full bg-light-gray" />
                                    <TouchableOpacity onPress={() => navigation.navigate("TrophyDetail")}>
                                        <Image source={TrophyRed} className="w-20 h-20 m-6" resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>

                                {/* Ver todas */}
                                <TouchableOpacity onPress={() => navigation.navigate("AllTrophyDetail")}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-bold text-orange">VER TODOS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray px-4 py-2 items-center">
                                <TouchableOpacity className="flex-row items-center w-full py-3" onPress={() => navigation.navigate("AllLumiQuestions")}>
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
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-row items-center w-full py-3" onPress={() => navigation.navigate("Settings")}>
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
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-row items-center w-full py-3" onPress={() => navigation.navigate("Login")}>
                                    {/* Ícone */}
                                    <View className="mr-4" style={{ width: 40, alignItems: 'center' }}>
                                        <Feather name="log-out" size={25} color="#da6f6f" />
                                    </View>

                                    {/* Conteúdo de progresso */}
                                    <View className="flex-1">
                                        {/* Texto */}
                                        <Text className="text-lg font-bold text-red">Log Out</Text>
                                    </View>

                                    <View className="ml-auto">
                                        <MaterialIcons name="chevron-right" size={30} color="#da6f6f" />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </LinearGradient >
    );
}
