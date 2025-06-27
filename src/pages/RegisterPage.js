import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/registerSlice';
import TermsAndContitionsModal from '../components/TermsAndConditionsModal';

export default function RegisterPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    isLoading,
    successMessage,
    error: backendError,
  } = useSelector((state) => state.register);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [passwordConf, setPasswordConf] = useState('');
  const [securePassConf, setSecurePassConf] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function RedirectToLogin() {
    navigation.navigate('Login');
  }

  useEffect(() => {
    if (errorMessage === '' && backendError) {
      setHasError(true);
      setErrorMessage(backendError);
    }
  }, [backendError]);

  useEffect(() => {
    if (successMessage) {
      navigation.navigate('Login');
    }
  }, [successMessage, navigation]);

  async function handleRegistration() {
    if (!username || !email || !password || !passwordConf) {
      setHasError(true);
      setErrorMessage('Todos os campos são obrigatórios.');
    } else if (password !== passwordConf) {
      setHasError(true);
      setErrorMessage('As senhas não coincidem.');
    } else if (!isChecked) {
      setHasError(true);
      setErrorMessage('É necessário aceitar os Termos e Condições');
    }

    dispatch(registerUser({ username, email, password, onboarding: false }));
  }

  return (
    <View className="flex-1 justify-center bg-off-white">
      <TermsAndContitionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <TouchableOpacity
        className="absolute top-20 left-10 z-10"
        onPress={RedirectToLogin}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="px-4">
        <View className="w-11/12 mx-auto flex-col gap-4">
          <View className="justify-center items-center mb-14">
            <Text
              className="text-5xl font-quickbold text-orange"
              style={{ lineHeight: 60 }}
            >
              Registo
            </Text>
          </View>

          {/* Input do username */}
          <TextInput
            className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
            placeholder="Username *"
            placeholderTextColor="#d0d0d0"
            accessibilityLabel="Username (obrigatório)"
            onChangeText={(text) => {
              setUsername(text);
              setHasError(false);
              setErrorMessage('');
            }}
            value={username}
          />

          <TextInput
            className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
            placeholder="Email *"
            placeholderTextColor="#d0d0d0"
            accessibilityLabel="Email (obrigatório)"
            onChangeText={(text) => {
              setEmail(text);
              setHasError(false);
              setErrorMessage('');
            }}
            value={email}
          />

          <Text className="font-quickregular w-full text-black mt-4 -mb-2 text-sm">
            Password tem de ter pelo menos 8 caracteres
          </Text>

          {/* Input da password */}
          <View className="w-full relative">
            <TextInput
              secureTextEntry={securePass}
              className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
              onChangeText={(text) => {
                setPassword(text);
                setHasError(false);
                setErrorMessage('');
              }}
              value={password}
              placeholder="Password *"
              placeholderTextColor="#d0d0d0"
              accessibilityLabel="Password (obrigatório)"
            />
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setSecurePass(!securePass)}
              accessibilityLabel="Clicar para ver/esconder Password"
            >
              <FontAwesome
                name={securePass ? 'eye-slash' : 'eye'}
                size={20}
                color="#d0d0d0"
              />
            </TouchableOpacity>
          </View>

          {/* Input de confirmação da password */}
          <View className="w-full relative">
            <TextInput
              secureTextEntry={securePassConf}
              className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
              onChangeText={(text) => {
                setPasswordConf(text);
                setHasError(false);
                setErrorMessage('');
              }}
              value={passwordConf}
              placeholder="Confirmar Password *"
              placeholderTextColor="#d0d0d0"
              accessibilityLabel="Password (obrigatório)"
            />
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setSecurePassConf(!securePassConf)}
              accessibilityLabel="Clicar para ver/esconder Confirmar Password"
            >
              <FontAwesome
                name={securePassConf ? 'eye-slash' : 'eye'}
                size={20}
                color="#d0d0d0"
              />
            </TouchableOpacity>
          </View>

          {/* Checkbox dos termos e condições */}
          <View className="flex-row w-full items-center justify-end gap-2">
            <CheckBox
              containerStyle={{ width: '0', paddingLeft: 0 }}
              checked={isChecked}
              onPress={() => {
                setIsChecked(!isChecked);
                setHasError(false);
                setErrorMessage('');
              }}
              checkedColor="#ff9d00"
              size={20}
              accessibilityLabel="Clicar para aceitar Termos e Condições (obrigatório)"
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                className="text-black font-quickregular underline pb-1.5"
                accessibilityLabel="Clicar para ver Termos e Condições"
              >
                Termos e condições *
              </Text>
            </TouchableOpacity>
          </View>

          {/* Exibir erro caso exista */}
          {hasError && (
            <Text className="text-red text-center font-quickbold">
              {errorMessage}
            </Text>
          )}

          {/* Botão de registro */}
          <TouchableOpacity
            className="bg-orange rounded-lg w-full py-3 items-center mt-6"
            onPress={handleRegistration}
            disabled={isLoading}
          >
            <Text className="text-xl text-white font-quickbold">
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
