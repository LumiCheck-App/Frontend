import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

const Achievements = ({ text, description, icon }) => {
    const IconComponent = icon || BlockedTrophy;

    return (
        <View className="bg-white rounded-lg border border-light-gray p-4 items-center mb-4">
            <View className="flex-row items-center w-full">
                {/* Ícone */}
                <View className="mr-4">
                    <IconComponent width={50} height={50} />
                </View>

                {/* Conteúdo de progresso */}
                <View className="flex-1">
                    {/* Texto */}
                    <Text className="text-lg font-bold">{text}</Text>
                    <Text className="text-lg font-regular text-light-gray">{description}</Text>
                </View>

                <View className="ml-auto">
                    <MaterialIcons name="chevron-right" size={30} color="#aa82da" />
                </View>
            </View>
        </View >
    );
};

export default Achievements;
