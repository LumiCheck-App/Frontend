import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CardForOptions({ options }) {

    const navigation = useNavigation();
    return (
        <View className="bg-white rounded-lg w-11/12 mb-8 border border-light-gray px-4 py-2">
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    className="flex-row items-center w-full py-3 border-b border-gray-200 last:border-b-0"
                    onPress={() => navigation.navigate(option.link)}
                >
                    {/* Ícone */}
                    {option.icon && (
                        <View className="mr-4" style={{ width: 40, alignItems: 'center' }}>
                            {option.icon}
                        </View>
                    )}

                    {/* Conteúdo de progresso */}
                    <View className="flex-1">
                        <Text className={`text-lg font-bold ${option.textColor} ${!option.icon ? "ml-2" : ""}`}>
                            {option.text}
                        </Text>
                    </View>

                    {/* Ícone de seta */}
                    <View className="ml-auto">
                        <MaterialIcons name="chevron-right" size={30} color={option.arrowColor} />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
