import React from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Pacote de ícones do Expo

const Achievements = ({ text, description, icon }) => {
    return (
        <View className="flex-row items-center w-full">
            {/* Ícone */}
            <View className="mr-4">
                <Image source={icon} className="w-12 h-12 mr-3" resizeMode="contain" />
            </View>

            {/* Conteúdo de progresso */}
            <View className="flex-1">
                {/* Texto */}
                <Text className="text-lg font-bold">{text}</Text>
                <Text className="text-lg font-bold text-light-gray">{description}</Text>
            </View>

            <View className="ml-auto">
                <MaterialIcons name="chevron-right" size={35} color="#aa82da" />
            </View>
        </View>
    );
};

export default Achievements;
