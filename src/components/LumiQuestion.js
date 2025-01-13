import React from 'react';
import { View, Text } from 'react-native';

const LumiQuestion = ({ index, text, score }) => {
    const scoreWidth = `${(score / 5) * 100}%`;

    return (
        <View className="w-11/12 mt-8">
            <View className="bg-white rounded-lg border border-light-gray p-4">
                <View className="mb-2">
                    <Text className="text-xl font-bold text-black">Pergunta {index}</Text>
                </View>
                <View className="flex-row items-center w-full">
                    <View className="flex-1">
                        {/* Texto */}
                        <Text className="text-lg font-regular mb-6">{text}</Text>

                        <Text className="text-lg text-dark-gray font-bold">Resposta</Text>

                        {/* Barra de progresso */}
                        <View className="flex-row items-center w-full">
                            {/* Barra de progresso */}
                            <View className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-light-gray">
                                <View
                                    style={{ width: scoreWidth }}
                                    className="h-full bg-violet rounded-full"
                                />
                            </View>

                            {/* Contador */}
                            <View className="w-1/6">
                                <Text className="text-lg text-violet font-bold text-right mr-4">{score}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LumiQuestion;
