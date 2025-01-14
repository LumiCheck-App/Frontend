import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import CheckIcon from "../../assets/icons/check.svg";

const Task = ({ taskId, taskText, isCompleted: initialIsCompleted, onTaskUpdate }) => {
    const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

    // Função para concluir a tarefa
    const handleCompleteTask = async () => {
        try {
            const response = await fetch(`https://lumicheckbd.onrender.com/tarefas/${taskId}/concluir?user_id=1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setIsCompleted(true);
                if (onTaskUpdate) {
                    onTaskUpdate(taskId, true);
                }
            } else {
                Alert.alert("Erro", "Não foi possível concluir a tarefa.");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao concluir a tarefa.");
            console.error(error);
        }
    };

    return (
        <View className="flex-row items-center justify-between bg-white rounded-lg px-4 mb-2 border border-light-gray">
            {/* Texto da tarefa */}
            <Text className={`text-lg font-quickregular flex-1 py-3 ${isCompleted ? "text-gray-400 line-through" : ""}`}>
                {taskText}
            </Text>

            {/* Separador */}
            <View className="h-full w-[1px] bg-light-gray mx-4" />

            {/* Ícone de check clicável */}
            <TouchableOpacity onPress={isCompleted ? null : handleCompleteTask}>
                <CheckIcon
                    width={24}
                    height={24}
                    style={{ opacity: isCompleted ? 1 : 0.5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Task;
