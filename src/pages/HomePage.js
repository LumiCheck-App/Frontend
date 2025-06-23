import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundGradient from '../components/BackgroundGradient';
import Lumi from '../../assets/lumis/Lumi.svg';
import TrophyGoldIcon from '../../assets/icons/trophygold.svg';
import QuestionIcon from '../../assets/icons/question.svg';
import HelpContactsIcon from '../../assets/icons/helpcontacts.svg';
import { FontAwesome } from '@expo/vector-icons';
import ArcProgressBar from '../components/ArcProgressBar';
import DailyTasks from '../components/DailyTasks';
import MonotorizationModal from '../components/MonotorizationModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAnswers } from '../redux/userAnswersSlice';
import messaging from '@react-native-firebase/messaging';
import { getFirebaseToken } from '../redux/firebaseTokenSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserFromStorage } from '../redux/userSlice';
import { getIsMonitoringStatus } from '../redux/isMonitoringSlice';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState('');
  const [scrollY] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { answers: perguntas } = useSelector((state) => state.userAnswers);
  const { isMonitoringState, loading, error } = useSelector(
    (status) => status.isMonitoring
  );
  const questionCount = perguntas.length;
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector((state) => state.user.data);

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const checkAndUpdateFirebaseToken = async () => {
    try {
      const currentToken = await getToken();
      if (!currentToken) {
        return;
      }
      const storedToken = await AsyncStorage.getItem('firebase_token');

      if (currentToken !== storedToken) {
        await AsyncStorage.setItem('firebase_token', currentToken);
        dispatch(getFirebaseToken({ firebase_token: currentToken }));
      } else {
        console.log('Token unchanged, skipping update');
      }
    } catch (error) {
      console.error('Error checking firebase token:', error);
    }
  };

  useEffect(() => {
    checkAndUpdateFirebaseToken();
  }, []);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(fetchUserAnswers());
    dispatch(getIsMonitoringStatus());
  }, [dispatch]);

  // Função para calcular o tempo restante até a meia-noite
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours === 0) setTimeLeft(`${minutes} MINUTOS`);
    else if (hours === 1) setTimeLeft(`${hours} HORA`);
    else setTimeLeft(`${hours} HORAS`);
  };

  useEffect(() => {
    calculateTimeLeft();

    // Atualizar o tempo restante a cada minuto
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Animação para Lumi
  const lumiPositionY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const lumiPositionX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -160],
    extrapolate: 'clamp',
  });

  const lumiScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.25],
    extrapolate: 'clamp',
  });

  // Animação para os ícones e números
  const questionIconPositionX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -65], // Move o ícone de "?" para a esquerda
    extrapolate: 'clamp',
  });

  const trophyIconPositionY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -32], // Move o ícone de troféu para cima
    extrapolate: 'clamp',
  });

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [150, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <BackgroundGradient>
      {/* Efeito de blur no topo da tela */}
      <Animated.View
        style={{
          opacity: backgroundOpacity,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 5,
        }}
      >
        <LinearGradient
          colors={['#ffe5b4', '#ffe5b4', '#fff9ef00']}
          locations={[0, 0.6, 1]}
          style={{ flex: 1, opacity: 0.9 }}
        />
      </Animated.View>

      {/* Ícones fixos no topo */}
      <View className="absolute top-20 right-10 z-10 items-end">
        <Animated.View
          style={{
            transform: [{ translateX: questionIconPositionX }],
          }}
          className="flex-row items-center mb-2"
        >
          <Text className="text-lg font-quickbold mr-2">{questionCount}</Text>
          <QuestionIcon width={24} height={24} />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: trophyIconPositionY }],
          }}
          className="flex-row items-center"
        >
          <Text className="text-lg font-quickbold mr-2">0</Text>
          <TrophyGoldIcon width={24} height={24} />
        </Animated.View>
      </View>

      {/* Animação para Lumi */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [
            { translateX: lumiPositionX },
            { translateY: lumiPositionY },
            { scale: lumiScale },
          ],
          zIndex: 10,
          left: '50%',
          top: 90,
          marginLeft: -75,
        }}
        className="flex-1 items-center"
      >
        <Lumi width={140} height={140} />
      </Animated.View>

      {/* Conteúdo rolável */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View className="flex-1 pt-8 pb-20 px-4">
          <View className="flex-1 items-center pt-60">
            {/* Texto de boas-vindas */}
            <Text className="text-2xl font-quickbold text-gray-800 mt-4">
              Olá, {user?.username || 'Utilizador'}!
            </Text>

            <MonotorizationModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />

            {/* Mostrar o botão ou o card baseado no estado */}
            {!isMonitoringState ? (
              <TouchableOpacity
                className="bg-orange rounded-lg w-11/12 py-3 mt-12 items-center"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-xl text-white font-quickbold">
                  Começar Monitorização
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 flex-row items-center">
                {/* Ícone circular à esquerda */}
                <View className="flex-row items-center flex-1">
                  <ArcProgressBar
                    size={80}
                    strokeWidth={8}
                    progress={perguntas.length * 5}
                  />
                  <View className="flex-1 mr-4 py-8 px-4">
                    <Text className="font-quickbold text-md text-black text-center">
                      {perguntas.length * 5 <= 50
                        ? 'Responda a mais algumas perguntas para ter uma pontuação mais precisa.'
                        : 'O seu relatório está quase terminado.'}
                    </Text>
                  </View>
                </View>

                {/* <TouchableOpacity className="absolute top-2 right-2">
                  <FontAwesome name="gear" size={20} color="#d0d0d0" />
                </TouchableOpacity> */}
              </TouchableOpacity>
            )}

            {/* Secção de Tarefas Diárias */}
            <View className="w-11/12 mt-8">
              {/* Cabeçalho da seção */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-quickbold text-black">
                  Tarefas Diárias
                </Text>
                <Text className="text-md font-quickbold text-orange self-end">
                  {timeLeft}
                </Text>
              </View>

              <DailyTasks />
            </View>

            {/* Literacia */}
            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-6 border-2 border-violet p-4">
              <Text className="text-xl font-quickregular text-dark-gray">
                Sabias que
              </Text>
              <Text className="text-md font-quickbold my-3">
                Ter uma adição pode prejudicar seriamente o nosso trabalho e as
                nossas relações.
              </Text>
              <View className="flex-row items-center justify-end">
                <Text className="text-sm font-quickregular text-light-gray">
                  Aprender mais em
                </Text>
                <Image
                  source={require('../../assets/sintome.png')}
                  className="w-16 ml-2"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

            {/* Informação de contactos */}
            <TouchableOpacity className="bg-white rounded-lg w-11/12 mt-8 border border-light-gray p-4 items-center">
              <HelpContactsIcon width={100} height={100} />
              <Text className="text-md font-quickbold my-3">
                Existem 4270 profissionais de saúde à tua disposição. Não
                hesites em contacta-los.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </BackgroundGradient>
  );
}
