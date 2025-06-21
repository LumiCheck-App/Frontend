import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, AppState } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { toogleMonitorization } from '../redux/isMonitoringSlice';

//import react-native modules
import { NativeModules } from 'react-native';

export default function MonotorizationModal({ modalVisible, setModalVisible }) {
  //importar os módulos nativos de screen time e work manager
  const { ScreenTimeModule } = NativeModules;
  const { FloatingBubble } = NativeModules;
  const { WorkManagerModule } = NativeModules;

  const dispatch = useDispatch();

  const [isSTenabled, setIsSTenabled] = useState(false);
  const [isFGenabled, setIsFGenabled] = useState(false);

  useEffect(() => {
    const checkScreenTimePermission = async () => {
      try {
        const hasPermission = await ScreenTimeModule.hasUsageAccess();
        setIsSTenabled(hasPermission);
      } catch (error) {
        console.log('Error checking screen time permission:', error);
      }
    };

    checkScreenTimePermission();

    const checkOverlayPermission = async () => {
      try{
        const hasPermission = await FloatingBubble.checkOverlayPermission();
        setIsFGenabled(hasPermission);
        console.log(hasPermission)
      }catch (error) {
        console.log('Error checking screen time permission:', error);
      }
    }

    checkOverlayPermission()

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkScreenTimePermission();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
    subscription?.remove();
    };
  }, []);

  const toggleSwitch = (permission) => {
    switch (permission) {
      case 'ScreenTime':
        ScreenTimeModule.requestUsageAccess();
        break;
      case 'Foreground':
        FloatingBubble.requestPermission();
        break;
      default:
        break;
    }
  };

  const StartMonotoring = () => {
    FloatingBubble.showBubble()
    if (isSTenabled && isFGenabled) {
      console.log('Iniciando monitorização com as seguintes permissões:');
      //WorkManagerModule.startWork();
      dispatch(toogleMonitorization());
      setModalVisible(false);
    } else {
      alert('Por favor, ativa todas as opções para iniciar a monitorização.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      className="relative"
    >
      <View className="bg-black opacity-50 absolute w-full h-full top-0"></View>
      <View className="h-screen justify-center items-center w-screen px-5">
        <View className="relative  bg-off-white pt-20 pb-10 px-6 flex-col justify-center items-center w-full border-x border-y border-light-gray rounded-lg gap-8">
          <TouchableOpacity
            className="ml-2 absolute top-4 right-4"
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="close" size={24} color="#ff9d00" />
          </TouchableOpacity>
          <Text className="text-xl text-black font-quickbold">
            Vamos começar a Moniterização!!!
          </Text>
          <Text>
            A monitorização consiste na recolha dos teus dados de screenTime e
            em fazermos te mais umas perguntinhas para termos uma noção da
            situação em que encontras!
          </Text>
          <Text>
            Para isso, vamos precisar que nos dês permissão para aceder aos teus
            dados de screenTime e para a Lumicheck possa trabalhar em Background
            e Foreground.
          </Text>

          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-black">ScreenTime</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffe5b4' }}
              thumbColor={isSTenabled ? '#ff9d00' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch('ScreenTime')}
              value={isSTenabled}
            />
          </View>
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-black">Atividade em Foreground</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffe5b4' }}
              thumbColor={isFGenabled ? '#ff9d00' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch('Foreground')}
              value={isFGenabled}
            />
          </View>
          <TouchableOpacity
            className="bg-orange rounded-lg w-11/12 py-3 mt-12 items-center"
            onPress={StartMonotoring}
          >
            <Text className="text-center text-white font-quickbold text-lg">
              Começar Moniterização
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
