import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CardForOptions from "../components/CardForOptions";

export default function Settings({ navigation }) {

    const Conta = [
        {
            link: "EditProfile",
            text: "Editar Perfil",
            textColor: "text-black",
            arrowColor: "#000000",
            icon: null,
        },
        {
            link: "EditProfile",
            text: "Opções de Monitorização",
            textColor: "text-black",
            arrowColor: "#000000",
            icon: null,
        },
        {
            link: "EditProfile",
            text: "Termos e Condições",
            textColor: "text-black",
            arrowColor: "#000000",
            icon: null,
        },
    ];

    const Suporte = [
        {
            link: "EditProfile",
            text: "Onboarding",
            textColor: "text-black",
            arrowColor: "#000000",
            icon: null,
        },
        {
            link: "EditProfile",
            text: "Enviar Feedback",
            textColor: "text-black",
            arrowColor: "#000000",
            icon: null,
        },
    ];


    const Logout = [
        {
            link: "Login",
            text: "Log Out",
            textColor: "text-red",
            arrowColor: "#da6f6f",
            icon: <Feather name="log-out" size={25} color="#da6f6f" />,
        },
    ];


    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View className="flex-1 py-8 px-4">
                    <View className="flex-1">
                        <View className="flex-1 items-center pt-12">
                            {/* Botão de voltar */}
                            <View className="w-11/12 flex-row items-center">
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={require("../../assets/juice_pfp.jpg")}
                                className="w-40 h-40 rounded-full"
                                resizeMode="contain"
                            />

                            {/* Texto de boas-vindas */}
                            <Text className="text-2xl font-bold text-black mt-6">
                                Rodrigo
                            </Text>
                            <Text className="text-md font-bold text-dark-gray">
                                rodrigograca@gmail.com
                            </Text>

                            <View className="w-11/12 mt-8 mb-4">
                                <Text className="text-xl font-bold text-black">Conta</Text>
                            </View>
                            <CardForOptions options={Conta} />

                            <View className="w-11/12 mb-4">
                                <Text className="text-xl font-bold text-black">Suporte</Text>
                            </View>
                            <CardForOptions options={Suporte} />

                            <View className="mt-2">
                                <CardForOptions options={Logout} />
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}	
