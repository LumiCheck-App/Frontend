import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import BackgroundGradient from "../components/BackgroundGradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile({ navigation }) {
    const [username, setUname] = useState("Rodrigo");
    const [mail, setMail] = useState("rodrigograca@gmail.com");
    const [profileImage, setProfileImage] = useState(require("../../assets/juice_pfp.jpg"));
    const [newImage, setNewImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setNewImage(result.assets[0].uri);
        }
    };


    const handleSaveChanges = () => {
        if (newImage) {
            setProfileImage({ uri: newImage });
            setNewImage(null);
        }
        alert("Alterações guardadas com sucesso!");
    };

    return (
        <BackgroundGradient>
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

                            <TouchableOpacity className="relative" onPress={pickImage}>
                                <Image
                                    source={newImage ? { uri: newImage } : profileImage}
                                    className="w-40 h-40 rounded-full"
                                    resizeMode="contain"
                                />

                                <View
                                    className="bg-black opacity-50 rounded-full"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        padding: 8,
                                    }}
                                >
                                    <Ionicons name="pencil" size={20} color="white" />
                                </View>
                            </TouchableOpacity>

                            <View className="w-11/12 mt-6">
                                <Text className="text-xl font-quickbold text-black mb-4">Username</Text>
                                <TextInput
                                    className="bg-white text-dark-gray border border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                                    onChangeText={setUname}
                                    value={username}
                                    placeholder="Username"
                                />
                            </View>

                            <View className="w-11/12 mt-6">
                                <Text className="text-xl font-quickbold text-black mb-4">Email</Text>
                                <TextInput
                                    className="bg-white text-dark-gray border border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                                    onChangeText={setMail}
                                    value={mail}
                                    placeholder="Username"
                                />
                            </View>

                            <TouchableOpacity
                                className="w-11/12 bg-yellow rounded-lg py-3 mt-20"
                                onPress={handleSaveChanges}
                            >
                                <Text className="text-xl text-white font-quickbold text-center">
                                    Guardar Alterações
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundGradient>
    );
}
