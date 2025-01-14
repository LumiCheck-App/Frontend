import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import Task from "../components/Task";
import TaskFinished from "../components/TaskFinished";
import { Ionicons } from "@expo/vector-icons";

export default function AllTasks({ navigation }) {
    // Lista de tarefas
    const tasksdiarias = [
        "Estar apenas 2 horas no Insta hoje",
        "Falar com os amigos"
    ];

    const tasksconcluidas = [
        "Ler um livro",
        "Fazer exercício físico",
        "Aprender algo novo",
        "Meditar por 10 minutos",
        "Desconectar do celular por 1 hora",
        "Passar tempo com a família",
        "Planejar a próxima semana",
        "Escrever um diário sobre o dia"
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
                                    <Text className="text-xl font-bold text-black">Tarefas Diárias</Text>
                                    <Text className="text-md font-bold text-orange self-end">7 HORAS</Text>
                                </View>

                                {/* Lista de tarefas */}
                                {tasksdiarias.map((task, index) => (
                                    <Task key={index} taskText={task} isCompleted={index % 2 === 0} />
                                ))}

                            </View>

                            {/* Secção de Tarefas Concluidas */}
                            <View className="w-11/12 mt-8">
                                {/* Cabeçalho */}
                                <View className="mb-4">
                                    <Text className="text-xl font-bold text-black">Tarefas Concluidas</Text>
                                </View>

                                {/* Lista de tarefas */}
                                {tasksconcluidas.map((task, index) => (
                                    <TaskFinished key={index} taskText={task} />
                                ))}

                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundGradient>
    );
}	
