import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";

// Importar os ícones SVG diretamente
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HelpContactsIcon from "../../assets/icons/helpcontacts.svg";

export default function HomePage() {
    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View className="flex-1 py-8 px-4">

                    <View className="flex-1">
                        {/* Secção de Ícones e Pontos */}
                        <View className="absolute top-8 right-5 items-end">
                            {/* Ícone de "?" */}
                            <View className="flex-row items-center mb-2">
                                <Text className="text-lg font-bold mr-2">14</Text>
                                <QuestionIcon width={24} height={24} />
                            </View>

                            {/* Ícone de troféu */}
                            <View className="flex-row items-center">
                                <Text className="text-lg font-bold mr-2">2</Text>
                                <TrophyGoldIcon width={24} height={24} />
                            </View>
                        </View>


                        <View className="flex-1 items-center pt-12">
                            {/* Ícone PNG */}
                            <Image
                                source={require("../../assets/Lumi.png")} // Caminho do ícone grande (fogo)
                                className="w-40 h-40"
                                resizeMode="contain"
                            />

                            {/* Texto de boas-vindas */}
                            <Text className="text-2xl font-bold text-gray-800 mt-6">
                                Olá, Rodrigo!
                            </Text>

                            {/* Botão de Monitorização */}
                            <TouchableOpacity className="bg-yellow rounded-lg w-11/12 py-3 mt-12 items-center">
                                <Text className="text-xl text-white font-bold">Começar Monitorização</Text>
                            </TouchableOpacity>

                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho da seção */}
                                <View className="flex-row items-center justify-between mb-4">
                                    <Text className="text-xl font-bold text-black">Tarefas Diárias</Text>
                                    <Text className="text-md font-bold text-orange self-end">7 HORAS</Text>
                                </View>

                                {/* Tarefas */}
                                <Task taskText="Estar apenas 2 horas no Insta hoje" isCompleted={true} />
                                <Task taskText="Falar com os amigos" isCompleted={false} />
                            </View>

                            {/* Literacia */}
                            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border-2 border-violet p-4">
                                <Text className="text-xl font-regular text-dark-gray">Sabias que</Text>
                                <Text className="text-md font-bold my-2">Ter uma adição pode prejudicar seriamente o nosso trabalho e as nossas relações.</Text>
                                <View className="flex-row items-center justify-end">
                                    <Text className="text-sm font-regular text-light-gray">Aprender mais em</Text>
                                    <Image
                                        source={require("../../assets/sintome.png")}
                                        className="w-16 ml-2"
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* Informação de contactos */}
                            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 items-center">
                                <HelpContactsIcon width={100} height={100} />
                                <Text className="text-md font-bold my-2">Existem 96 profissionais de saúde à tua disposição. Não hesites em contacta-los.</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </LinearGradient>
    );
}
