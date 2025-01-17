import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackgroundGradient from "../components/BackgroundGradient";
import Task from "../components/Task";
import Lumi from "../../assets/lumis/Lumi.svg";
import TrophyGoldIcon from "../../assets/icons/trophygold.svg";
import QuestionIcon from "../../assets/icons/question.svg";
import HelpContactsIcon from "../../assets/icons/helpcontacts.svg";
import { FontAwesome } from "@expo/vector-icons";
import ArcProgressBar from "../components/ArcProgressBar";
import { requestNotificationPermission, sendPushNotification } from "../components/NotificationSetup";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";


export default function HomePage() {
    const navigation = useNavigation();
    const [dailyTasks, setDailyTasks] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");
    const [scrollY] = useState(new Animated.Value(0));
    const [isMonitoring, setIsMonitoring] = useState(false); // Estado para controlar a monitorização
    const [progress, setProgress] = useState(0); // Estado do progresso

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
            const { screen } = response.notification.request.content.data;
            if (screen && navigation) {
                //adiconar tempo de espera de 30 segundos
                setProgress(35)
                navigation.navigate(screen); // Redirecionar para a tela especificada
            }
        });

        return () => subscription.remove(); // Limpar o listener ao desmontar o componente
    }, [navigation]); // Adicione `navigation` como dependência


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

    const backgroundOpacity = scrollY.interpolate({
        inputRange: [150, 200],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <BackgroundGradient>
            {/* Efeito de blur no topo da tela */}
            <Animated.View style={{
                opacity: backgroundOpacity,
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
                    <Text className="text-lg font-quickbold mr-2">14</Text>
                    <QuestionIcon width={24} height={24} />
                </Animated.View>

                <Animated.View
                    style={{
                        transform: [{ translateY: trophyIconPositionY }],
                    }}
                    className="flex-row items-center"
                >
                    <Text className="text-lg font-quickbold mr-2">2</Text>
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
                        <Text className="text-2xl font-quickbold text-gray-800 mt-4">
                            Olá, Rodrigo!
                        </Text>

                        {/* Mostrar o botão ou o card baseado no estado */}
                        {!isMonitoring ? (
                            <TouchableOpacity
                                className="bg-yellow rounded-lg w-11/12 py-3 mt-12 items-center"
                                onPress={async () => {
                                    const permissionGranted = await requestNotificationPermission();
                                    if (permissionGranted) {
                                        // Configurar progresso inicial como 0%
                                        setIsMonitoring(true);

                                        // Agendar notificação com 30 segundos de atraso
                                        sendPushNotification(
                                            "Pergunta da Lumi",
                                            "A Lumi tem uma nova pergunta para tu responderes!",
                                            { screen: "QuestionPage" } // Dados para redirecionamento
                                        );
                                    }
                                }}
                            >
                                <Text className="text-xl text-white font-quickbold">Começar Monitorização</Text>
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 flex-row items-center">
                                {/* Ícone circular à esquerda */}
                                <View className="flex-row items-center flex-1">
                                    <ArcProgressBar size={80} strokeWidth={8} progress={progress} />
                                    <View className="flex-1 mr-4 py-8">
                                        <Text className="font-quickbold text-md text-black text-center">
                                            O seu relatório está quase terminado!
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity className="absolute top-2 right-2">
                                    <FontAwesome name="gear" size={20} color="#d0d0d0" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}

                        {/* Secção de Tarefas Diárias */}
                        <View className="w-11/12 mt-8">
                            {/* Cabeçalho da seção */}
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-xl font-quickbold text-black">Tarefas Diárias</Text>
                                <Text className="text-md font-quickbold text-orange self-end">{timeLeft}</Text>
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
                            <Text className="text-xl font-quickregular text-dark-gray">Sabias que</Text>
                            <Text className="text-md font-quickbold my-3">Ter uma adição pode prejudicar seriamente o nosso trabalho e as nossas relações.</Text>
                            <View className="flex-row items-center justify-end">
                                <Text className="text-sm font-quickregular text-light-gray">Aprender mais em</Text>
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
                            <Text className="text-md font-quickbold my-3">Existem 4270 profissionais de saúde à tua disposição. Não hesites em contacta-los.</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Animated.ScrollView>
        </BackgroundGradient>
    );
}