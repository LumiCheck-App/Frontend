import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PasswordResetModal from "../components/PasswordResetModal";
import SpeechBubble from "../components/SpeechBubble";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

export default function LoginPage() {
  const navigation = useNavigation();

  //State Variables
  const [username, setUname] = useState('');
  const [pass, setPass] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  //Function to clear Login Form
  const clearLoginForm = () => {
    setUname('');
    setPass('');
  };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  function handleLoginForm() {
    if (username === "" || pass === "") {
      console.log("Fill all inputs.");
      return;
    }

    dispatch(loginUser({ username, password: pass }))
      .unwrap()
      .then((result) => {
        clearLoginForm();
        const onboarding = result.user.onboarding;
        if (onboarding) {
          navigation.replace("HomeTabs");
        } else {
          navigation.replace("Onboarding");
        }
      })
      .catch((err) => {
        console.log("Login falhou:", err);
      });
  }

  return (
    <View className="flex-1 bg-off-white">
      {/* Modal*/}
      <PasswordResetModal modalVisible={modalVisible} setModalVisible={setModalVisible} Users={Users} />
      {/* Page Title*/}
      <View className="h-1/3 justify-center items-center">
        <Text className="text-5xl font-quickbold text-yellow">Login</Text>
      </View>

      {/*Form*/}
      <View className="w-screen px-16 flex-col gap-6 items-end justify-end">
        {/* Input do username */}
        <TextInput
          className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
          onChangeText={setUname}
          value={username}
          placeholder="Username *"
          accessibilityLabel="Username (obrigatório)"
        />
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="text-dark-gray font-quickbold underline underline-offset-1">Esqueceste-te da password?</Text>
        </TouchableOpacity>

        {hasError && <Text className="text-red font-quickbold text-center w-full">{error}</Text>}

        {/* Botão do form */}
        <TouchableOpacity className="bg-yellow rounded-lg w-full py-3 items-center mt-10" onPress={handleLoginForm}>
          <Text className="text-xl text-white font-quickbold">Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Register redirect */}
      <View className="h-1/3 w-full flex-row items-center justify-center px-10 ">
        <SpeechBubble />
      </View>
    </View>
  );
}
