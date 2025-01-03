import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, FlatList, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { markersOnMap } from "../psicologos";

const distritos = [
    "Aveiro",
    "Beja",
    "Braga",
    "Bragança",
    "Castelo Branco",
    "Coimbra",
    "Évora",
    "Faro",
    "Guarda",
    "Leiria",
    "Lisboa",
    "Portalegre",
    "Porto",
    "Santarém",
    "Setúbal",
    "Viana do Castelo",
    "Vila Real",
    "Viseu",
    "Açores",
    "Madeira",
    "Outros",
];

export default function HelpPage() {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 39.3999,
        longitude: -8.2245,
        latitudeDelta: 5,
        longitudeDelta: 5,
    });
    const [selectedDistrito, setSelectedDistrito] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permissão negada",
                    "Não foi possível acessar sua localização. Ative a permissão para usar essa funcionalidade."
                );
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = userLocation.coords;
            setLocation({ latitude, longitude });
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            });
        })();
    }, []);

    const filteredMarkers = selectedDistrito
        ? markersOnMap.filter((marker) => {
            const markerDistrito = marker.distrito?.toLowerCase();
            const selectedDistritoLower = selectedDistrito.toLowerCase();
            console.log(`Comparando: ${markerDistrito} === ${selectedDistritoLower}`);
            return markerDistrito === selectedDistritoLower;
        })
        : [];

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                {/* Mapa */}
                <MapView
                    style={{
                        width: "100%", // Largura igual a 100% do contêiner pai
                        aspectRatio: 1, // Define a proporção de altura para largura (1:1)
                    }}
                    region={region}>
                    {/* Marcador do usuário */}
                    {location && (
                        <Marker
                            coordinate={location}
                            title="Você"
                            image={require('../../assets/Lumi-Mapa.png')}
                        />
                    )}


                    {/* Renderiza os marcadores */}
                    {markersOnMap.map((marker, index) => {
                        const { LatLng, placeName, placeDesc } = marker;
                        if (!LatLng || LatLng.length === 0) return null;

                        const { lat, lng } = LatLng[0];
                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: lat, longitude: lng }}
                                title={placeName.replace(/<[^>]+>/g, "")}
                                description={placeDesc.replace(/<[^>]+>/g, "")}
                            />
                        );
                    })}
                </MapView>

                <View className="flex-1 px-4 items-center">
                    <View className="w-11/12 mt-8">
                        <TouchableOpacity
                            className="p-3 bg-[#ffe5b4] rounded-md items-center"
                            onPress={() => setDropdownVisible(true)}
                        >
                            <Text className="text-lg font-bold text-gray-800">
                                {selectedDistrito || "Selecione um Distrito"}
                            </Text>
                        </TouchableOpacity>
                        <Modal
                            visible={dropdownVisible}
                            transparent={true}
                            animationType="slide"
                        >
                            <View className="flex-1 bg-black bg-opacity-50 justify-center">
                                <FlatList
                                    data={distritos}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="p-4 bg-white border-b border-gray-300"
                                            onPress={() => {
                                                setSelectedDistrito(item);
                                                setDropdownVisible(false);
                                            }}
                                        >
                                            <Text className="text-lg text-gray-800">{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </Modal>
                    </View>

                    {/* Lista de Contactos */}
                    <View className="w-11/12 mt-8">
                        <Text className="text-xl font-bold mb-2">Contactos</Text>
                        {selectedDistrito && filteredMarkers.length > 0 ? (
                            filteredMarkers.map((marker, index) => (
                                <View key={index} className="mb-4 p-3 bg-white rounded-md">
                                    <Text className="text-lg font-bold">
                                        {marker.placeName.replace(/<[^>]+>/g, "")}
                                    </Text>
                                    <Text className="text-sm text-gray-600">
                                        {marker.placeDesc.replace(/<[^>]+>/g, "")}
                                    </Text>
                                </View>
                            ))
                        ) : selectedDistrito ? (
                            <Text className="text-center text-gray-500">
                                Nenhum psicólogo encontrado no distrito selecionado.
                            </Text>
                        ) : (
                            <Text className="text-center text-gray-500">
                                Selecione um distrito para ver os contactos disponíveis.
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}
