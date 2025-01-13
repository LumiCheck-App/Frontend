import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";
import Lumi from "../../assets/Lumi.svg";
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HelpContactsIcon from "../../assets/icons/helpcontacts.svg";
import { FontAwesome } from "@expo/vector-icons";

export default function HomePage() {
    const [dailyTasks, setDailyTasks] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");
    const [scrollY] = useState(new Animated.Value(0));

    // Função para calcular o tempo restante até a meia-noite
    const calculateTimeLeft = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours === 0) setTimeLeft(`${minutes} MINUTOS`);
        else if (hours === 1) setTimeLeft(`${hours} HORA`);
        else setTimeLeft(`${hours} HORAS`);
    };

    // Função para buscar tarefas do endpoint
    const fetchTasks = async () => {
        try {
            const response = await fetch("https://lumicheckbd.onrender.com/tarefas/1/tarefas/nao_concluidas");
            const tasks = await response.json();

            // Filtrar tarefas não concluídas e selecionar 2 aleatoriamente
            const selectedTasks = tasks
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            setDailyTasks(selectedTasks);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        calculateTimeLeft();

        // Atualizar o tempo restante a cada minuto
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    // Animação para Lumi
    const lumiPositionY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -80],
        extrapolate: "clamp",
    });

    const lumiPositionX = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -160],
        extrapolate: "clamp",
    });

    const lumiScale = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0.25],
        extrapolate: "clamp",
    });

    // Animação para os ícones e números
    const questionIconPositionX = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -65], // Move o ícone de "?" para a esquerda
        extrapolate: "clamp",
    });

    const trophyIconPositionY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -32], // Move o ícone de troféu para cima
        extrapolate: "clamp",
    });

    const blurOpacity = scrollY.interpolate({
        inputRange: [150, 200],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            {/* Efeito de blur no topo da tela */}
            <Animated.View style={{
                opacity: blurOpacity,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 160,
                zIndex: 5,
            }}>
                <LinearGradient
                    colors={["#ffe5b4", "#ffe5b4", "#fff9ef00"]}
                    locations={[0, 0.60, 1]}
                    style={{ flex: 1, opacity: 0.9 }}
                />
            </Animated.View>

            {/* Ícones fixos no topo */}
            <View className="absolute top-20 right-10 z-10 items-end">
                <Animated.View
                    style={{
                        transform: [{ translateX: questionIconPositionX }],
                    }}
                    className="flex-row items-center mb-2"
                >
                    <Text className="text-lg font-bold mr-2">14</Text>
                    <QuestionIcon width={24} height={24} />
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [{ translateY: trophyIconPositionY }],
                    }}
                    className="flex-row items-center"
                >
                    <Text className="text-lg font-bold mr-2">2</Text>
                    <TrophyGoldIcon width={24} height={24} />
                </Animated.View>
            </View>

            {/* Animação para Lumi */}
            <Animated.View
                style={{
                    position: "absolute",
                    transform: [{ translateX: lumiPositionX }, { translateY: lumiPositionY }, { scale: lumiScale }],
                    zIndex: 10,
                    left: "50%",
                    top: 90,
                    marginLeft: -75,
                }}
                className="flex-1 items-center"
            >
                <Lumi width={140} height={140} />
            </Animated.View>

            {/* Conteúdo rolável */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View className="flex-1 pt-8 pb-20 px-4">
                    <View className="flex-1 items-center pt-60">
                        {/* Texto de boas-vindas */}
                        <Text className="text-2xl font-bold text-gray-800 mt-4">
                            Olá, Rodrigo!
                        </Text>

                        {/* Botão de Monitorização */}
                        <TouchableOpacity className="bg-yellow rounded-lg w-11/12 py-3 mt-12 items-center">
                            <Text className="text-xl text-white font-bold">Começar Monitorização</Text>
                        </TouchableOpacity>


                        <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 flex-row items-center">
                            {/* Ícone circular à esquerda */}
                            <View className="flex-row items-center flex-1">
                                <Image
                                    source={require("../../assets/Lumi.png")} // Substitua pelo caminho correto do arquivo
                                    className="w-16 h-16 ml-2"
                                    resizeMode="contain"
                                />
                                <View className="flex-1 mr-4 py-8">
                                    <Text className="font-bold text-md text-black text-center">
                                        O seu relatório está quase terminado!
                                    </Text>
                                </View>
                            </View>

                            {/* Ícone de engrenagem à direita */}
                            <View className="absolute right-4 top-4">
                                <FontAwesome name="gear" size={25} color="#d0d0d0" />
                            </View>
                        </TouchableOpacity>


                        {/* Secção de Tarefas Diárias */}
                        <View className="w-11/12 mt-8">
                            {/* Cabeçalho da seção */}
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-xl font-bold text-black">Tarefas Diárias</Text>
                                <Text className="text-md font-bold text-orange self-end">{timeLeft}</Text>
                            </View>

                            {dailyTasks.map(task => (
                                <Task
                                    key={task.id}
                                    taskId={task.id}
                                    taskText={task.descricao}
                                    isCompleted={task.done}
                                    onTaskUpdate={(taskId, completed) => {
                                        console.log(`Tarefa ${taskId} concluída: ${completed}`);
                                    }} />
                            ))}
                        </View>

                        {/* Literacia */}
                        <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-6 border-2 border-violet p-4">
                            <Text className="text-xl font-regular text-dark-gray">Sabias que</Text>
                            <Text className="text-md font-bold my-3">Ter uma adição pode prejudicar seriamente o nosso trabalho e as nossas relações.</Text>
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
                            <Text className="text-md font-bold my-3">Existem 4270 profissionais de saúde à tua disposição. Não hesites em contacta-los.</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Animated.ScrollView>
        </LinearGradient>
    );
}