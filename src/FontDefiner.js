import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';
import App from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import useSocket from './useSocket';
import eventEmitter from './eventEmitter';

export default function FontDefiner() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const handleTokenChange = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.sub);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error('Erro ao carregar token:', error);
      }
    };

    eventEmitter.on('tokenChanged', handleTokenChange);
    return () => {
      eventEmitter.off('tokenChanged', handleTokenChange);
    };
  }, []);

  useSocket(userId);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-off-white">
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return <App />;
}
