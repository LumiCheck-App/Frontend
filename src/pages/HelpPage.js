import React, { useEffect, useState } from "react";
import { Text, View, Alert, TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { markersOnMap } from "../psicologos";

export default function HelpPage() {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 39.3999,
        longitude: -8.2245,
        latitudeDelta: 5,
        longitudeDelta: 5,
    });
    const [visibleMarkers, setVisibleMarkers] = useState([]);

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

            <ScrollView>
                <View style={{ flex: 1 }}>
                    {/* Mapa */}
                    <MapView
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                        }}
                        region={region}
                        onRegionChangeComplete={(newRegion) => {
                            setRegion(newRegion);
                            const filteredMarkers = markersOnMap.filter((marker) => {
                                const { LatLng } = marker;
                                if (!LatLng || LatLng.length === 0) return false;

                                const { lat, lng } = LatLng[0];
                                return (
                                    lat >= newRegion.latitude - newRegion.latitudeDelta / 2 &&
                                    lat <= newRegion.latitude + newRegion.latitudeDelta / 2 &&
                                    lng >= newRegion.longitude - newRegion.longitudeDelta / 2 &&
                                    lng <= newRegion.longitude + newRegion.longitudeDelta / 2
                                );
                            });
                            setVisibleMarkers(filteredMarkers);
                        }}
                    >
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
                        {visibleMarkers.length > 0 ? (
                            visibleMarkers.map((marker, index) => (
                                <View key={index} style={{ marginTop: 8 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                        {marker.placeName.replace(/<[^>]+>/g, "")}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                        {marker.placeDesc.replace(/<[^>]+>/g, "")}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ fontSize: 14, marginTop: 8 }}>Nenhum contacto visível.</Text>
                        )}
                    </View>

                    {/* Posts */}
                    <View style={{ padding: 16, backgroundColor: "#fff9ef" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Posts</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
