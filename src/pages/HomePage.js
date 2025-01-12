import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HelpContactsIcon from "../../assets/icons/helpcontacts.svg";
import { BlurView } from "expo-blur";

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
                .slice(0, 2);

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
                height: 110,
                zIndex: 5,
            }}>
                <BlurView intensity={50} tint="light" style={{ flex: 1, borderRadius: 20, backgroundColor: "#ffdc9b", opacity: 0.8 }} />
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
                <Image
                    source={require("../../assets/Lumi.png")}
                    className="w-40 h-40"
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Conteúdo rolável */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1 items-center pt-60">
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
                            <Text className="text-md font-bold my-2">Existem 4270 profissionais de saúde à tua disposição. Não hesites em contacta-los.</Text>
                        </TouchableOpacity>


                        <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 items-center">
                            <HelpContactsIcon width={100} height={100} />
                            <Text className="text-md font-bold my-2">Todos eles querem te ajudar da melhor forma que podem.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 items-center">
                            <HelpContactsIcon width={100} height={100} />
                            <Text className="text-md font-bold my-2">Todos eles querem te ajudar da melhor forma que podem.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>
        </LinearGradient>
    );
}