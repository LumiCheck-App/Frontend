import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile({ navigation }) {

    const [username, setUname] = useState("Rodrigo");
    const [mail, setMail] = useState("rodrigograca@gmail.com");

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
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={require("../../assets/juice_pfp.jpg")}
                                className="w-40 h-40 rounded-full"
                                resizeMode="contain"
                            />

                            <View className="w-11/12 mt-6">
                                <Text className="text-xl font-bold text-black mb-4">Username</Text>
                                <TextInput
                                    className="bg-white text-dark-gray border border-light-gray rounded-lg p-4 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
                                    onChangeText={setUname}
                                    value={username}
                                    placeholder="Username"
                                />
                            </View>


                            <View className="w-11/12 mt-6">
                                <Text className="text-xl font-bold text-black mb-4">Email</Text>
                                <TextInput
                                    className="bg-white text-dark-gray border border-light-gray rounded-lg p-4 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
                                    onChangeText={setMail}
                                    value={mail}
                                    placeholder="Username"
                                />
                            </View>

                            <TouchableOpacity className="w-11/12 bg-yellow rounded-lg py-3 mt-12">
                                <Text className="text-xl text-white font-bold text-center">Guardar Alterações</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}	
