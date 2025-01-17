import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import PrimeiroPasso from "../../assets/trophies/primeiropasso.svg";
import BomDiaAlegria from "../../assets/trophies/bomdiaalegria.svg";
import BomProgresso from "../../assets/trophies/bomprogresso.svg";
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

export default function ProfilePage() {
    const navigation = useNavigation();

    const trophieswon = [{
        text: "Primeiro Passo",
        description: "Completar o teste inicial",
        icon: PrimeiroPasso,
    },
    {
        text: "Bom Dia Alegria",
        description: "Não usar o telemóvel nos primeiros 30 minutos após acordar durante 3 dias consecutivos",
        icon: BomDiaAlegria
    },
    {
        text: "Bom Progresso",
        description: "Reduzir o uso médio de uma app considerada viciante em 1h por dia durante a semana",
        icon: BomProgresso
    }
    ];

    return (
        <BackgroundGradient>
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
                            <Text className="text-2xl font-quickbold text-black mt-6">
                                Rodrigo
                            </Text>
                            <Text className="text-md font-quickbold text-dark-gray">
                                rodrigograca@gmail.com
                            </Text>
                            {/* Informações */}
                            <View className="flex-row justify-between w-11/12 mt-12">
                                {/* Coluna 1: Perguntas respondidas */}
                                <View className="bg-white rounded-lg flex-1 border border-light-gray p-3">
                                    {/* Linha superior: Ícone e número */}
                                    <View className="flex-row ml-2 mb-2 items-center">
                                        <QuestionIcon width={24} height={24} />
                                        <Text className="text-2xl font-quickbold ml-2">14</Text>
                                    </View>
                                    {/* Linha inferior: Texto */}
                                    <Text className="text-sm text-dark-gray text-center">Perguntas respondidas</Text>
                                </View>

                                {/* Coluna 2: Conquistas obtidas */}
                                <View className="bg-white rounded-lg flex-1 mx-2 border border-light-gray p-3">
                                    {/* Linha superior: Ícone e número */}
                                    <View className="flex-row ml-2 mb-2 items-center">
                                        <TrophyGoldIcon width={24} height={24} />
                                        <Text className="text-2xl font-quickbold ml-2">4</Text>
                                    </View>
                                    {/* Linha inferior: Texto */}
                                    <Text className="text-sm text-dark-gray text-center">Conquistas obtidas</Text>
                                </View>
                            </View>


                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-quickbold text-black">Sala de Troféus</Text>
                                </View>

                                <View className="flex-row items-center justify-around bg-white rounded-lg mb-2 border border-light-gray">
                                    {/* Troféus disponíveis */}
                                    {trophieswon.slice(0, 3).map((trophy, index) => (
                                        <React.Fragment key={index}>
                                            <TouchableOpacity onPress={() => navigation.navigate("TrophyDetail", { trophy })}>
                                                <trophy.icon width={80} height={80} style={{ margin: 16 }} />
                                            </TouchableOpacity>

                                            {index < 2 && <View className="w-px h-full bg-light-gray" />}
                                        </React.Fragment>
                                    ))}

                                    {/* Troféu bloqueado caso não hajam 3 trofeus */}
                                    {Array.from({ length: 3 - trophieswon.length }).map((_, index) => (
                                        <React.Fragment key={`blocked-${index}`}>
                                            <TouchableOpacity disabled>
                                                <BlockedTrophy width={80} height={80} style={{ margin: 16 }} />
                                            </TouchableOpacity>

                                            {trophieswon.length + index < 2 && <View className="w-px h-full bg-light-gray" />}
                                        </React.Fragment>
                                    ))}
                                </View>


                                {/* Ver todas */}
                                <TouchableOpacity onPress={() => navigation.navigate("Troféus", { screen: "AllTrophies" })}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-quickbold text-orange">VER SALA</Text>
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
                                        <Text className="text-lg font-quickbold">Perguntas da Lumi</Text>
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
                                        <Text className="text-lg font-quickbold">Definições</Text>
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
                                        <Text className="text-lg font-quickbold text-red">Log Out</Text>
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
        </BackgroundGradient >
    );
}
