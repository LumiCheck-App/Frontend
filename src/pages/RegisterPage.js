import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TermsAndContitionsModal from "../components/TermsAndConditionsModal";
import { Ionicons } from "@expo/vector-icons";

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
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function RedirectToLogin() {
    navigation.replace("Login");
  }

  function handleRegistration() {
    if (username !== "" && email !== "" && pass !== "" && passConf !== "") {
      if (pass.length < 8) {
        setHasError(true);
        setError("A senha deve ter pelo menos 8 caracteres");
        return;
      }
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
        setError("As passwords devem coincidir");
      }
    } else {
      setHasError(true);
      setError("Deve preencher todos os campos do formulário");
    }
  }

  return (
    <>
      <ScrollView className="flex-1 bg-off-white">
        <TermsAndContitionsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

        {/* Page Title*/}
        <View className="w-11/12 flex-row items-center pt-12 px-8">
          <TouchableOpacity onPress={RedirectToLogin}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="h-1/3 justify-center items-center">
          <Text className=" text-5xl font-quickbold text-yellow">Registo</Text>
        </View>

        {/*Form*/}
        <View className="w-screen px-16 flex-col gap-6 items-start justify-end">
          {/* Input do username */}
          <TextInput
            className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Username *"
            accessibilityLabel="Username (obrigatório)"
            onChangeText={setUname}
            value={username}
          />

          <TextInput
            className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Email *"
            accessibilityLabel="Email (obrigatório)"
            onChangeText={setEmail}
            value={email}
          />

          <Text className="font-quickregular w-full text-dark-gray mt-4 -mb-2">
            Password tem de ter pelo menos 8 caracteres
          </Text>

          <View className="w-full relative">
            {/* Input da password */}
            <TextInput
              secureTextEntry={securePass}
              className="bg-white w-full text-dark-gray border-solid border border-light-gray rounded-lg p-4 pr-12 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
              onChangeText={setPass}
              value={pass}
              placeholder="Password *"
              accessibilityLabel="Password (obrigatório)"
            />

            {/* Ícone de olho */}
            <TouchableOpacity
              className="absolute right-4 top-5"
              onPress={() => {
                setSecurePass(!securePass);
              }}
              accessibilityLabel="Clicar para ver/esconder Password"
            >
              <FontAwesome name={securePass ? "eye-slash" : "eye"} size={20} color="#d0d0d0" />
            </TouchableOpacity>
          </View>

          <View className="w-full relative">
            {/* Input da password */}
            <TextInput
              secureTextEntry={securePassConf}
              className="bg-white w-full text-dark-gray border-solid border border-light-gray rounded-lg p-4 pr-12 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
              onChangeText={setPassConf}
              value={passConf}
              placeholder="Confirmar Password *"
              accessibilityLabel="Password (obrigatório)"
            />

            {/* Ícone de olho */}
            <TouchableOpacity
              className="absolute right-4 top-5"
              onPress={() => {
                setSecurePassConf(!securePassConf);
              }}
              accessibilityLabel="Clicar para ver/esconder Confirmar Password"
            >
              <FontAwesome name={securePassConf ? "eye-slash" : "eye"} size={20} color="#d0d0d0" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-2">
            <CheckBox
              containerStyle={{ width: "0", paddingLeft: 0 }}
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#ff9d00"
              size={20}
              accessibilityLabel="Clicar para aceitar Termos e Condições (obrigatório)"
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                className="text-dark-gray font-quickbold underline"
                accessibilityLabel="Clicar para ver Termos e Condições"
              >
                Termos e condições *
              </Text>
            </TouchableOpacity>
          </View>
          {hasError && <Text className="text-red font-quickbold">{error}</Text>}

          {/* Botão do form */}
          <TouchableOpacity
            className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
            onPress={handleRegistration}
          >
            <Text className="text-xl font-quickbold text-white">Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
