import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';

const Achievements = ({ text, description, icon }) => {
    const IconComponent = icon || BlockedTrophy;

    const descriptionCutted = description.length > 28 ? `${description.substring(0, 26)}...` : description;

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
                    <Text className="text-lg font-quickbold">{text}</Text>
                    <Text className="text-lg font-quickregular text-light-gray">{descriptionCutted}</Text>
                </View>

                <View className="ml-auto">
                    <MaterialIcons name="chevron-right" size={30} color="#000000" />
                </View>
            </View>
        </View >
    );
};

export default Achievements;
