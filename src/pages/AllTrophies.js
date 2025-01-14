import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import { Ionicons } from "@expo/vector-icons";
import Achievements from "../components/Achievements";
import PrimeiroPasso from "../../assets/trophies/primeiropasso.svg";
import BomDiaAlegria from "../../assets/trophies/bomdiaalegria.svg";
import BomProgresso from "../../assets/trophies/bomprogresso.svg";

export default function AllTrophies({ navigation }) {

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

    const trophiesblocked = [{
        text: "Autoconsciênte",
        description: "Ver o relatório das apps mais usadas todos os dias de uma semana",
        icon: null
    },
    {
        text: "Marco das 20",
        description: "Responder a 20 perguntas da Lumi",
        icon: null
    }
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

                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="flex-row items-center justify-between mb-4">
                                    <Text className="text-xl font-quickbold text-black">Troféus conquistados</Text>
                                </View>

                                {trophieswon.map((trophy, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigation.navigate("TrophyDetail", { trophy })}
                                    >
                                        <Achievements key={index} text={trophy.text} description={trophy.description} icon={trophy.icon} />
                                    </TouchableOpacity>
                                ))}

                            </View>

                            <View className="w-11/12 mt-8">

                                <View className="flex-row items-center justify-between mb-4">
                                    <Text className="text-xl font-quickbold text-black">Troféus bloqueados</Text>
                                </View>

                                {trophiesblocked.map((trophy, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigation.navigate("TrophyDetail", { trophy })}
                                    >
                                        <Achievements key={index} text={"???????"} description={trophy.description} icon={null} />
                                    </TouchableOpacity>
                                ))}

                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundGradient>
    );
}	
