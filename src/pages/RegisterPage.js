import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TermsAndContitionsModal from '../components/TermsAndConditionsModal';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterPage() {
  const navigation = useNavigation();

  //DB Simulation
  const Users = [];

  const [username, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [passConf, setPassConf] = useState("");
  const [securePassConf, setSecurePassConf] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function RedirectToLogin() {
    navigation.replace('Login');
  }

  function handleRegistration() {
    if (username != "" && email != "" && pass != "" && passConf != "") {
      if (pass === passConf) {
        if (isChecked) {
          const user = {
            id: Users.length,
            User_name: username,
            Pass: pass,
            Email: email,
          };
          Users.push(user);
          navigation.replace("Login");
        } else {
          setHasError(true);
          setError("É necessário aceitar os Termos e Condições");
        }
      } else {
        setHasError(true);
        setError('As passwords devem coincidir');
      }
    } else {
      setHasError(true);
      setError("Deve preencher todos os campos do formulário");
    }
  }

  return (
    <View className="flex-1 justify-center bg-off-white">
      
      <TermsAndContitionsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <TouchableOpacity className="absolute top-20 left-10 z-10" onPress={RedirectToLogin}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="px-4">
        <View className="w-11/12 mx-auto flex-col gap-4">

          <View className="justify-center items-center mb-14">
            <Text className=" text-5xl font-quickbold text-orange">Registo</Text>
          </View>

          {/*Form*/}
          {/* Input do username */}
          <TextInput
            className="bg-white w-full text-dark-gray border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl placeholder:font-quickregular placeholder:text-lg placeholder:text-dark-gray"
            placeholder="Username *"
            accessibilityLabel="Username (obrigatório)"
            onChangeText={setUname}
            value={username}
          />

          <TextInput
            className="bg-white w-full text-dark-gray border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl placeholder:font-quickregular placeholder:text-lg placeholder:text-dark-gray"
            placeholder="Email *"
            accessibilityLabel="Email (obrigatório)"
            onChangeText={setEmail}
            value={email}
          />

          <Text className="font-quickregular w-full text-black mt-4 -mb-2 text-sm">
            Password tem de ter pelo menos 8 caracteres
          </Text>

          <View className="w-full relative">
            {/* Input da password */}
            <TextInput
              secureTextEntry={securePass}
              className="bg-white w-full text-dark-gray border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl placeholder:font-quickregular placeholder:text-lg placeholder:text-dark-gray"
              onChangeText={setPass}
              value={pass}
              placeholder="Password *"
              accessibilityLabel="Password (obrigatório)"
            />

            {/* Ícone de olho */}
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => {
                setSecurePass(!securePass);
              }}
              accessibilityLabel="Clicar para ver/esconder Password"
            >
              <FontAwesome
                name={securePass ? "eye-slash" : "eye"}
                size={20}
                color="#d0d0d0"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full relative">
            {/* Input da password */}
            <TextInput
              secureTextEntry={securePassConf}
              className="bg-white w-full text-dark-gray border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl placeholder:font-quickregular placeholder:text-lg placeholder:text-dark-gray"
              onChangeText={setPassConf}
              value={passConf}
              placeholder="Confirmar Password *"
              accessibilityLabel="Password (obrigatório)"
            />

            {/* Ícone de olho */}
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => {
                setSecurePassConf(!securePassConf);
              }}
              accessibilityLabel="Clicar para ver/esconder Confirmar Password"
            >
              <FontAwesome
                name={securePassConf ? "eye-slash" : "eye"}
                size={20}
                color="#d0d0d0"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row w-full items-center justify-end gap-2">
            <CheckBox
              containerStyle={{ width: '0', paddingLeft: 0 }}
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
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
          {hasError && (
            <Text className="text-red-500 font-quickbold">{error}</Text>
          )}

          {/* Botão do form */}
          <TouchableOpacity
            className="bg-orange rounded-lg w-full py-3 items-center mt-6"
            onPress={handleRegistration}
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
