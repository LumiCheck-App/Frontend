import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BlockedTrophy from '../../assets/trophies/trophyblocked.svg';
import ChestIcon from "../../assets/chest.png";

export default function TrophyDetail({ route, navigation }) {
    const { trophy } = route.params;
    let text, description, IconComponent;

    if (trophy.icon === "Chest") {
        IconComponent = ChestIcon;
    } else {
        IconComponent = trophy.icon || BlockedTrophy;
    }

    if (IconComponent === BlockedTrophy) {
        text = "????????"
        description = trophy.description;
    } else {
        text = trophy.text;
        description = trophy.description;
    }

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1 items-center pt-12">
                        {/* Botão de voltar */}
                        <View className="w-11/12 flex-row items-center">
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-1 justify-center items-center mb-16">
                            {trophy.icon === "Chest" ? (
                                <Image
                                    source={IconComponent}
                                    className="w-72 h-72 mb-14"
                                    resizeMode="contain"
                                />
                            ) : (
                                <IconComponent width={300} height={300} style={{ marginBottom: 50 }} />
                            )}
                            <Text className="text-2xl text-center font-bold">{text}</Text>
                            <Text className="mt-4 mb-16 px-16 text-lg text-center font-bold text-dark-gray">
                                {description}
                            </Text>
                        </View>
                    </View>

                    {IconComponent !== BlockedTrophy && (
                        <TouchableOpacity className="bg-yellow rounded-lg w-11/12 py-3" style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
                            <Text className="text-xl text-white font-bold text-center">Partilhar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
