import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CardForOptions from '../components/CardForOptions';
import { useDispatch } from 'react-redux';
import { deleteUserAccount } from '../redux/deleteAccountSlice';
import { FontAwesome } from '@expo/vector-icons';
import MonotorizationModal from '../components/MonotorizationModal';
import TermsAndContitionsModal from '../components/TermsAndConditionsModal';
import { Linking } from 'react-native';

export default function Settings({ navigation }) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [MonitorizationModalVisible, setMonitorizationModalVisible] =
    useState(false);
  const [TermsAndConModalVisible, setTermsAndConModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const Conta = [
    {
      link: 'EditProfile',
      text: 'Editar Perfil',
      textColor: 'text-black',
      arrowColor: '#000000',
      icon: null,
    },
    {
      action: () => setMonitorizationModalVisible(true),
      text: 'Opções de Monitorização',
      textColor: 'text-black',
      arrowColor: '#000000',
      icon: null,
    },
    {
      action: () => setTermsAndConModalVisible(true),
      text: 'Termos e Condições',
      textColor: 'text-black',
      arrowColor: '#000000',
      icon: null,
    },
  ];

  const Suporte = [
    {
      link: 'Onboarding',
      text: 'Onboarding',
      textColor: 'text-black',
      arrowColor: '#000000',
      icon: null,
    },
    {
      action: () =>
        Linking.openURL(
          'mailto:lumicheck.app@gmail.com?subject=Feedback%20App'
        ),
      text: 'Enviar Feedback',
      textColor: 'text-black',
      arrowColor: '#000000',
      icon: null,
    },
  ];

  const Logout = [
    {
      link: 'Login',
      text: 'Log Out',
      textColor: 'text-red',
      arrowColor: '#da6f6f',
      icon: <Feather name="log-out" size={25} color="#da6f6f" />,
    },
  ];

  const DeleteAccount = [
    {
      action: () => setIsDeleteModalVisible(true),
      text: 'Apagar Conta',
      textColor: 'text-red',
      arrowColor: '#da6f6f',
      icon: <MaterialIcons name="delete" size={25} color="#da6f6f" />,
    },
  ];

  const handleDeleteAccount = async () => {
    if (!password) {
      Alert.alert('Erro', 'Por favor insira a sua password');
      return;
    }

    try {
      await dispatch(deleteUserAccount(password)).unwrap();
      Alert.alert('Sucesso', 'A sua conta foi apagada com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao apagar a conta');
    } finally {
      setIsDeleteModalVisible(false);
      setPassword('');
    }
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

              <View className="w-11/12 mt-8 mb-4">
                <Text className="text-xl font-quickbold text-black">Conta</Text>
              </View>
              <CardForOptions options={Conta} />
              <View className="w-11/12 mb-4">
                <Text className="text-xl font-quickbold text-black">
                  Suporte
                </Text>
              </View>
              <CardForOptions options={Suporte} />
              <View className="mt-2">
                <CardForOptions options={Logout} />
              </View>
              <TouchableOpacity className="mt-2">
                <CardForOptions options={DeleteAccount} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal para apagar conta */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="relative  bg-off-white pt-20 pb-10 px-6 flex-col justify-center items-center w-full border-x border-y border-light-gray rounded-lg gap-8">
            <TouchableOpacity
              className="ml-2 absolute top-4 right-4"
              onPress={() => {
                setIsDeleteModalVisible(false);
                setPassword('');
              }}
            >
              <FontAwesome name="close" size={24} color="#ff9d00" />
            </TouchableOpacity>
            <Text className="text-xl text-black font-quickbold">
              Apagar conta
            </Text>
            <Text className="mb-4">
              Tens a certeza que queres apagar a tua conta? Esta ação é
              irreversível.
            </Text>

            <View className="w-full">
              <Text className="text-xl text-left font-quickbold text-black mb-4">
                Confirmar alterações com password
              </Text>
              <TextInput
                className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
                placeholder="Introduza a sua password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View className="flex-row">
              <TouchableOpacity
                className="bg-red rounded-lg w-11/12 py-3 mt-8 items-center"
                onPress={handleDeleteAccount}
              >
                <Text className="text-center text-white font-quickbold text-lg">
                  Apagar Conta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para as settings de monitorização */}
      <MonotorizationModal
        modalVisible={MonitorizationModalVisible}
        setModalVisible={setMonitorizationModalVisible}
        buttonText="Salvar Mudanças"
      />

      <TermsAndContitionsModal
        modalVisible={TermsAndConModalVisible}
        setModalVisible={setTermsAndConModalVisible}
      />
    </BackgroundGradient>
  );
}
