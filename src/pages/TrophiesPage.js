import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import { useNavigation } from "@react-navigation/native";
import Task from "../components/Task";
import TrophyProgress from "../components/TrophyProgress";
import Achievements from "../components/Achievements";

import PrimeiroPasso from "../../assets/trophies/primeiropasso.svg";
import BomDiaAlegria from "../../assets/trophies/bomdiaalegria.svg";
import BomProgresso from "../../assets/trophies/bomprogresso.svg";

export default function TrophiesPage() {
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
    }];

    const trophiesblocked = [{
        text: "Autoconsciênte",
        description: "Ver o relatório das apps mais usadas todos os dias de uma semana",
        progress: 4,
        total: 7,
        icon: null
    },
    {
        text: "Marco das 20",
        description: "Responder a 20 perguntas da Lumi",
        progress: 7,
        total: 20,
        icon: null
    }];

    const chest = {
        text: "Icon Exclusivo",
        description: "Complete 30 Tarefas Diárias",
        progress: 6,
        total: 30,
        icon: "Chest"
    };

    return (
        <BackgroundGradient>
            <ScrollView>
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1">
                        <View className="flex-1 items-center pt-12">

                            {/* Secção de Tarefas Diárias */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-quickbold text-black">Tarefas Diárias</Text>
                                </View>

                                {/* Tarefas */}
                                <Task taskText="Estar apenas 2 horas no Insta hoje" isCompleted={true} />
                                <Task taskText="Falar com os amigos" isCompleted={false} />

                                {/* Ver todas */}
                                <TouchableOpacity onPress={() => navigation.navigate("AllTasks")}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-quickbold text-orange">VER TODAS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Secção de Troféus */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-quickbold text-black">Icon Exclusivo</Text>
                                </View>

                                {/* Icon exclusivo */}
                                <View className="bg-white rounded-lg border border-light-gray p-4 items-center">
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("TrophyDetail", { trophy: chest })}
                                    >
                                        <TrophyProgress
                                            text={chest.text}
                                            description={chest.description}
                                            progress={chest.progress}
                                            total={chest.total}
                                            icon={chest.icon}
                                        />
                                    </TouchableOpacity>
                                </View>


                                <View className="bg-white rounded-lg border border-light-gray p-4 mt-8">
                                    <View className="mb-4">
                                        <Text className="text-xl font-quickbold text-black">Outros Prémios</Text>
                                    </View>
                                    {trophiesblocked.map((trophy, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => navigation.navigate("TrophyDetail", { trophy })}
                                            className="mb-4"
                                        >
                                            <TrophyProgress
                                                text={trophy.text}
                                                description={trophy.description}
                                                progress={trophy.progress}
                                                total={trophy.total}
                                                icon={trophy.icon}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-quickbold text-black">Sala de Troféus</Text>
                                </View>
                                {trophieswon.map((trophy, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigation.navigate("TrophyDetail", { trophy })}
                                    >
                                        <Achievements
                                            text={trophy.text}
                                            description={trophy.description}
                                            icon={trophy.icon}
                                        />
                                    </TouchableOpacity>
                                ))}
                                {/* Ver todas */}
                                <TouchableOpacity onPress={() => navigation.navigate("AllTrophies")}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-quickbold text-orange">VER SALA</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </BackgroundGradient>
    );
}
