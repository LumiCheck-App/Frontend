import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { markersOnMap } from "../psicologos";
import { Linking } from "react-native";

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
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5); // Novo estado para controle de contatos visíveis

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
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
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

    const handleShowMore = () => {
        if (visibleCount < filteredMarkers.length) {
            setVisibleCount((prevCount) => prevCount + 5);
        } else {
            setVisibleCount(5); // Reseta para mostrar apenas os 5 primeiros
        }
    };

    const makeCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
            console.error("Erro ao tentar abrir o discador:", err)
        );
    };

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
                        onPress={(e) => {
                            const isMarkerPress = e.nativeEvent.action === "marker-press";
                            if (!isMarkerPress) {
                                setSelectedMarker(null);
                            }
                        }}
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
                            const { Coords, Nome, Telefone } = marker;
                            if (!Coords || Coords.length === 0) return null;

                            const { lat, lng } = Coords[0];
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: lat, longitude: lng }}
                                    title={Nome}
                                    description={Telefone}
                                    onPress={() => setSelectedMarker(marker)}
                                />
                            );
                        })}
                    </MapView>

                    {/* Card de informações do marcador */}
                    {selectedMarker && (
                        <View className="flex-1 px-4 items-center">
                            <View className="w-11/12 mt-4">
                                <View className="mb-4 p-3 bg-white rounded-md border border-light-gray">
                                    <View className="flex-row">
                                        <View className="w-1/2">
                                            <Text className="text-lg font-bold">
                                                {selectedMarker.Nome}
                                            </Text>
                                        </View>
                                        <View className="w-1/2">
                                            <TouchableOpacity onPress={() => makeCall(marker.Telefone)}>
                                                <Text className="text-lg self-end text-violet font-bold">
                                                    {selectedMarker.Telefone}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Text className="text-sm text-dark-gray">
                                            {selectedMarker.Descricao}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Dropdown para distritos */}
                    <View className="flex-1 px-4 items-center">
                        <View className="w-11/12 mt-6">
                            <Text className="text-xl font-bold mb-2">Contactos</Text>
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
                                    <TouchableOpacity
                                        className="flex-1"
                                        activeOpacity={1}
                                        onPress={() => setDropdownVisible(false)}
                                    />
                                    <View className="h-1/2 bg-white rounded-t-lg mb-6">
                                        <FlatList
                                            data={[...distritos, "Outros"]}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    className="p-4 border-b border-light-gray"
                                                    onPress={() => {
                                                        setSelectedDistrito(item);
                                                        setDropdownVisible(false);
                                                        setVisibleCount(5); // Reseta o contador ao mudar o distrito
                                                    }}
                                                >
                                                    <Text className="text-lg text-dark-gray">{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        {/* Lista de Contactos */}
                        <View className="w-11/12 mt-8">
                            {selectedDistrito && filteredMarkers.length > 0 ? (
                                filteredMarkers.slice(0, visibleCount).map((marker, index) => (
                                    <View key={index} className="mb-4 p-3 bg-white rounded-md border border-light-gray">
                                        <View className="flex-row">
                                            <View className="w-1/2">
                                                <Text className="text-lg font-bold">
                                                    {marker.Nome}
                                                </Text>
                                            </View>
                                            <View className="w-1/2">
                                                <TouchableOpacity onPress={() => makeCall(marker.Telefone)}>
                                                    <Text className="text-lg self-end text-violet font-bold">
                                                        {marker.Telefone}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View className="w-full mt-2">
                                            <Text className="text-sm text-dark-gray">
                                                {marker.Descricao}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            ) : selectedDistrito ? (
                                <Text className="text-center text-dark-gray">
                                    Nenhum psicólogo encontrado no distrito selecionado.
                                </Text>
                            ) : (
                                <Text className="text-center text-dark-gray">
                                    Selecione um distrito para ver os contactos disponíveis.
                                </Text>
                            )}
                        </View>

                        {/* Botão "Mostrar mais" */}
                        {selectedDistrito && filteredMarkers.length > 5 && (
                            <View className="w-11/12 mt-2 mb-20">
                                <TouchableOpacity
                                    style={{
                                        alignItems: "flex-end", // Alinha o botão à direita
                                    }}
                                    onPress={handleShowMore}
                                >
                                    <Text className="text-md font-bold text-orange">
                                        {visibleCount >= filteredMarkers.length ? "VER MENOS" : "VER MAIS"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}