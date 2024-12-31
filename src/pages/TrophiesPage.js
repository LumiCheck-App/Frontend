import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";

// Importar os ícones SVG diretamente
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HelpContactsIcon from "../../assets/icons/helpcontacts.svg";
export default function TrophiesPage() {
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

                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-bold text-black">Tarefas Diárias</Text>
                                </View>

                                {/* Tarefas */}
                                <Task taskText="Estar apenas 2 horas no Insta hoje" isCompleted={true} />
                                <Task taskText="Falar com os amigos" isCompleted={false} />

                                {/* Ver todas */}
                                <View className="mb-4">
                                    <Text className="text-md font-bold text-orange">VER TODAS</Text>
                                </View>
                            </View>

                            {/* Literacia */}
                            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border-2 border-violet p-4">
                                <Text className="text-xl text-dark-gray">Sabias que</Text>
                                <Text className="text-md font-bold my-2">Ter uma adição pode prejudicar seriamente o nosso trabalho e as nossas relações.</Text>
                                <View className="flex-row items-center justify-end">
                                    <Text className="text-sm text-light-gray">Aprender mais em</Text>
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
