import React from 'react';
import { View, Text, Image } from 'react-native';

const TrophyProgress = ({ text, progress, total, icon }) => {
    const progressWidth = `${(progress / total) * 100}%`;

    return (
        <View className="flex-row items-center w-full">
            {/* Ícone */}
            <View className="mr-4">
                <Image source={icon} className="w-12 h-12 mr-3" resizeMode="contain" />
            </View>

            {/* Conteúdo de progresso */}
            <View className="flex-1">
                {/* Texto */}
                <Text className="text-lg font-regular mb-2">{text}</Text>

                {/* Barra de progresso */}
                <View className="h-3 bg-white rounded-full overflow-hidden border border-light-gray">
                    <View style={{ width: progressWidth }} className="h-full bg-violet rounded-full" />
                </View>

                {/* Contador */}
                <Text className="text-sm text-dark-gray text-right mt-1">{`${progress}/${total}`}</Text>
            </View>
        </View>
    );
};

export default TrophyProgress;
