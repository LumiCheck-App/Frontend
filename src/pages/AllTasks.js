import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import TaskFinished from '../components/TaskFinished';
import { Ionicons } from '@expo/vector-icons';
import DailyTasks from '../components/DailyTasks';

export default function AllTasks({ navigation }) {
  const [timeLeft, setTimeLeft] = useState('');

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

  useEffect(() => {
    calculateTimeLeft();

    // Atualizar o tempo restante a cada minuto
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const tasksconcluidas = [
    'Ler um livro',
    'Fazer exercício físico',
    'Aprender algo novo',
    'Meditar por 10 minutos',
    'Desconectar do celular por 1 hora',
    'Passar tempo com a família',
    'Planejar a próxima semana',
    'Escrever um diário sobre o dia',
  ];

  return (
    <BackgroundGradient>
      <ScrollView>
        <View className="flex-1 py-8 px-4">
          <View className="flex-1">
            <View className="flex-1 items-center pt-12">
              {/* Botão de voltar */}
              <View className="w-11/12 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>

              {/* Secção de Tarefas Diárias */}
              <View className="w-11/12 mt-8">
                {/* Cabeçalho da seção */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Tarefas Diárias
                  </Text>
                  <Text className="text-md font-quickbold text-orange self-end">
                    {timeLeft}
                  </Text>
                </View>

                <DailyTasks userId={6} />
              </View>

              {/* Secção de Tarefas Concluidas */}
              <View className="w-11/12 mt-8">
                {/* Cabeçalho */}
                <View className="mb-4">
                  <Text className="text-xl font-quickbold text-black">
                    Tarefas Concluidas
                  </Text>
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
