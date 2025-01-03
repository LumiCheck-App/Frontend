import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { markersOnMap } from "../psicologos";

export default function HelpPage() {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 39.3999, // Centro de Portugal como padrão
        longitude: -8.2245,
        latitudeDelta: 5,
        longitudeDelta: 5,
    });

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

                {/* Contactos */}
                <View style={{ padding: 16, backgroundColor: "#fff9ef" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Contactos</Text>
                </View>

                {/* Posts */}
                <View style={{ padding: 16, backgroundColor: "#fff9ef" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Posts</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
