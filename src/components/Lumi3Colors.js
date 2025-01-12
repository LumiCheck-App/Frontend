import React from "react";
import { View, Text, Image } from "react-native";

const Lumi3Colors = ({ negative, neutral, positive }) => {

    const marginHorizontal = 2.2;
    const marginFactor = marginHorizontal * 2;
    const total = Number(negative) + Number(neutral) + Number(positive);

    const adjustedWidthFactor = 100 - marginFactor;
    const negativeWidth = `${(negative / total) * adjustedWidthFactor}%`;
    const neutralWidth = `${(neutral / total) * adjustedWidthFactor}%`;
    const positiveWidth = `${(positive / total) * adjustedWidthFactor}%`;

    return (
        <View className="w-11/12 mt-8">
            <View className="bg-white rounded-lg border border-light-gray p-4">
                {/* Título */}
                <View className="mb-4">
                    <Text className="text-xl font-bold text-black">Perguntas da Lumi</Text>
                </View>

                {/* Barras combinadas */}
                <View className="flex-row items-center h-3 overflow-hidden rounded-full mb-6">
                    {/* Barra Negativa */}
                    <View
                        style={{ width: negativeWidth }}
                        className="h-full bg-red rounded-full"
                    />
                    {/* Barra Neutra */}
                    <View
                        style={{ width: neutralWidth }}
                        className="h-full bg-orange rounded-full mx-2"
                    />
                    {/* Barra Positiva */}
                    <View
                        style={{ width: positiveWidth }}
                        className="h-full bg-light-yellow border border-yellow rounded-full"
                    />
                </View>

                <View className="flex-row items-center">
                    {/* Barra Negativa */}
                    <View className="flex-row items-center w-full justify-between">
                        <View className="flex-col items-center">
                            <Text className="text-sm text-dark-gray mb-2">Negativas</Text>
                            <View className="flex-row items-center justify-center">
                                <Image
                                    source={require("../../assets/Lumi.png")}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-bold ml-2">{negative}</Text>
                            </View>
                        </View>

                        <View className="flex-col items-center">
                            <Text className="text-sm text-dark-gray mb-2">Neutras</Text>
                            <View className="flex-row items-center justify-center">
                                <Image
                                    source={require("../../assets/Lumi.png")}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-bold ml-2">{neutral}</Text>
                            </View>
                        </View>

                        <View className="flex-col items-center">
                            <Text className="text-sm text-dark-gray mb-2">Positivas</Text>
                            <View className="flex-row items-center justify-center">
                                <Image
                                    source={require("../../assets/Lumi.png")}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-bold ml-2">{positive}</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </View >
        </View >
    );
};

export default Lumi3Colors;
