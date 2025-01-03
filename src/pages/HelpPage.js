import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function HelpPage() {
    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View className="flex-1 pt-20 pb-8 px-4 items-center">

                    {/* Mapa */}


                    {/* Contactos */}
                    <View className="w-11/12 mt-8">
                        <View className="mb-4">
                            <Text className="text-xl font-bold text-black">Contactos</Text>
                        </View>
                    </View>

                    {/* Posts */}
                    <View className="w-11/12 mt-8">
                        <View className="mb-4">
                            <Text className="text-xl font-bold text-black">Posts</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </LinearGradient>
    );
}
