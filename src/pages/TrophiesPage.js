import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Task from "../components/Task";
import TrophyProgress from "../components/TrophyProgress";
import Achievements from "../components/Achievements";

import PrimeiroPasso from "../../assets/trophies/primeiropasso.svg";
import BomDiaAlegria from "../../assets/trophies/bomdiaalegria.svg";
import BomProgresso from "../../assets/trophies/bomprogresso.svg";
import ChestIcon from "../../assets/chest.png";

export default function TrophiesPage() {
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
                                <TouchableOpacity onPress={() => navigation.navigate("AllTasks")}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-bold text-orange">VER TODAS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Secção de Troféus */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-bold text-black">Icon Exclusivo</Text>
                                </View>

                                {/* Icon exclusivo */}
                                <View className="bg-white rounded-lg border border-light-gray p-4 items-center">
                                    <TrophyProgress
                                        text="Complete 30 Tarefas Diárias"
                                        progress={7}
                                        total={30}
                                        icon={"Chest"}
                                    />
                                </View>


                                <View className="bg-white rounded-lg border border-light-gray p-4 mt-8">
                                    <View className="mb-4">
                                        <Text className="text-xl font-bold text-black">Outros Prémios</Text>
                                    </View>
                                    <View className="mb-4">
                                        <TrophyProgress
                                            text="Ver o relatório das apps mais usadas todos os dias de uma semana"
                                            progress={4}
                                            total={7}
                                            icon={null}
                                        />
                                    </View>
                                    <View className="mb-4">
                                        <TrophyProgress
                                            text="Responder a 20 perguntas da Lumi"
                                            progress={7}
                                            total={20}
                                            icon={null}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-bold text-black">Sala de Troféus</Text>
                                </View>

                                {/* Icon exclusivo */}
                                <Achievements text="Primeiro Passo" description="Completar o teste inicial" icon={PrimeiroPasso} />

                                <Achievements text="Bom Dia Alegria" description="Não usar o telemóvel nos primeiros 30 minutos após acordar durante 3 dias consecutivos" icon={BomDiaAlegria} />

                                <Achievements text="Bom Progresso" description="Reduzir o uso médio de uma app considerada viciante em 1h por dia durante a semana" icon={BomProgresso} />

                                {/* Ver todas */}
                                <TouchableOpacity onPress={() => navigation.navigate("AllTrophies")}>
                                    <View className="mb-4 flex-row justify-end">
                                        <Text className="text-md font-bold text-orange">VER SALA</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </LinearGradient>
    );
}
