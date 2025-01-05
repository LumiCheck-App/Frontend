import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native";
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
        ? selectedDistrito === "Outros"
            ? markersOnMap.filter(
                (marker) => !distritos.some((distrito) =>
                    marker.Distrito?.toLowerCase() === distrito.toLowerCase()
                )
            )
            : markersOnMap.filter(
                (marker) =>
                    marker.Distrito?.toLowerCase() === selectedDistrito.toLowerCase()
            )
        : [];

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {/* Mapa */}
                    <MapView
                        style={{
                            width: "100%",
                            aspectRatio: 1,
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
                            const { Coords, Nome, Descricao } = marker;
                            if (!Coords || Coords.length === 0) return null;

                            const { lat, lng } = Coords[0];
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: lat, longitude: lng }}
                                    title={Nome.replace(/<[^>]+>/g, "")}
                                    description={Descricao.replace(/<[^>]+>/g, "")}
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
                                <Text className="text-lg font-bold">
                                    {selectedDistrito || "Selecione um Distrito"}
                                </Text>
                            </TouchableOpacity>
                            <Modal
                                visible={dropdownVisible}
                                transparent={true}
                                animationType="slide"
                            >
                                <View className="flex-1 justify-end">
                                    {/* Fundo transparente do modal */}
                                    <TouchableOpacity
                                        className="flex-1"
                                        activeOpacity={1}
                                        onPress={() => setDropdownVisible(false)}
                                    />

                                    {/* Parte inferior do modal */}
                                    <View className="h-1/2 bg-white rounded-t-lg">
                                        <FlatList
                                            data={[...distritos, "Outros"]}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    className="p-4 border-b border-gray-300"
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
                                            {marker.Nome.replace(/<[^>]+>/g, "")}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {marker.Descricao.replace(/<[^>]+>/g, "")}
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
            </ScrollView>
        </LinearGradient>
    );
}
