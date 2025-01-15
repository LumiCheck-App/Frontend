import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
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
  const [passConf, setPassConf] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function RedirectToLogin() {
    navigation.replace("Login");
  }

  function handleRegistration() {
    if (
      username != "" &&
      email != "" &&
      pass != "" &&
      passConf != ""
    ) {
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
        }
      } else {
        setHasError(true);
        setError("As passwords devem coincidir");
      }
    } else {
      setHasError(true);
      setError("Deve preencher todos os campos do formulário");
      console.log(Users.length);
    }
  }

  return (
    <>
      <ScrollView className="flex-1 bg-off-white">
        <TermsAndContitionsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        {/* Page Title*/}
        <View className="w-11/12 flex-row items-center pt-12 px-8">
          <TouchableOpacity
            onPress={RedirectToLogin}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="h-1/3 justify-center items-center">
          <Text className=" text-5xl font-quickbold text-yellow">Register</Text>
        </View>

        {/*Form*/}
        <View className="w-screen px-16 flex-col gap-6 items-start justify-end">
          {/* Input do username */}
          <TextInput
            className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Username"
            onChangeText={setUname}
            value={username}
          />

          <TextInput
            className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />

          {/* Input da password */}
          <TextInput
            className="bg-white w-full text-dark-gray border-solid border border-light-gray rounded-lg p-4 pr-12 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Password"
            secureTextEntry
            onChangeText={setPass}
            value={pass}
          />

          {/* Input da Confirm password */}
          <TextInput
            className="bg-white w-full text-dark-gray border-solid border border-light-gray rounded-lg p-4 pr-12 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setPassConf}
            value={passConf}
          />

          <View className="flex-row items-center gap-2">
            <CheckBox
              containerStyle={{ width: "0", paddingLeft: 0 }}
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="#ff9d00"
              size={20}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text className="text-dark-gray font-quickbold underline">
                Termos e condições
              </Text>
            </TouchableOpacity>
          </View>
          {hasError && <Text className="text-red-500 font-quickbold">{error}</Text>}

          {/* Botão do form */}
          <TouchableOpacity
            className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
            onPress={handleRegistration}
          >
            <Text className="text-xl font-quickbold text-white font-quickbold">
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
