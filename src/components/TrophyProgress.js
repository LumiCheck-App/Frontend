import React from 'react';
import { View, Text, Image } from 'react-native';
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';
import ChestIcon from "../../assets/trophies/chest.png";

const TrophyProgress = ({ text, description, progress, total, icon }) => {
    const progressWidth = `${(progress / total) * 100}%`;
    let IconComponent = icon || BlockedTrophy;

    if (icon === "Chest") {
        IconComponent = ChestIcon;
    }


    const descriptionCutted = description.length > 32 ? `${description.substring(0, 30)}...` : description;

    return (
        <View className="flex-row items-center w-full">
            {/* Ícone */}
            <View className="mr-4">
                {/* se for chest mete Image se for outro mete o svg */}
                {icon === "Chest" ? (
                    <Image
                        source={IconComponent}
                        className="w-12 h-12"
                        resizeMode="contain"
                    />
                ) : (
                    <IconComponent width={50} height={50} />
                )}
            </View>

            {/* Conteúdo de progresso */}
            <View className="flex-1">
                {/* Texto */}
                <Text className="text-lg font-regular mb-2">{descriptionCutted}</Text>

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
