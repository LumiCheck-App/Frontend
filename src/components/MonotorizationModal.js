import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MonotorizationModal({ modalVisible, setModalVisible }) {
  const [isSTenabled, setIsSTenabled] = useState(false);
  const [isBGenabled, setIsBGenabled] = useState(false);
  const [isFGenabled, setIsFGenabled] = useState(false);
  const toggleSwitch = (permission) => {
    switch (permission) {
        case 'ScreenTime':
             setIsSTenabled((previousState) => !previousState)
            break;
        case 'Background':
            setIsBGenabled((previousState) => !previousState)
            break;
        case 'Foreground':
            setIsFGenabled((previousState) => !previousState)
            break;
        default:
            break;
    }
}

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
          <Text className="text-xl text-white font-quickbold">
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
              onValueChange={()=>toggleSwitch('ScreenTime')}
              value={isSTenabled}
            />
          </View>
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-black">Atividade em Background</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffe5b4' }}
              thumbColor={isBGenabled ? '#ff9d00' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>toggleSwitch('Background')}
              value={isBGenabled}
            />
          </View>
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-black">Atividade em Foreground</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ffe5b4' }}
              thumbColor={isFGenabled ? '#ff9d00' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>toggleSwitch('Foreground')}
              value={isFGenabled}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
