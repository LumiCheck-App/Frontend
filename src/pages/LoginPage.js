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
        console.log("Login result:", result);
        clearLoginForm();
        const onboarding = result.user.onboarding;
        console.log("Onboarding:", onboarding);
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
    <View className="flex-1 justify-center bg-off-white">
      {/* Modal*/}

      {/* <PasswordResetModal modalVisible={modalVisible} setModalVisible={setModalVisible} /> */ }
      
      {/* Page Title*/}
      <View className="px-4">
        <View className="w-11/12 mx-auto flex-col gap-4">

          <View className="justify-center items-center mb-14">
            <Text className=" text-5xl font-quickbold text-orange">Login</Text>
          </View>

          {/* Input do username */}
          <TextInput
            className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
            onChangeText={setUname}
            value={username}
            placeholder="Username *"
            accessibilityLabel="Username (obrigatório)"
          />
          <View className="w-full relative">
            {/* Input da password */}
            <TextInput
              secureTextEntry={securePass}
              className="bg-white w-full text-black border border-light-gray rounded-lg px-4 py-3 font-quickregular text-xl"
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
              <FontAwesome name={securePass ? "eye-slash" : "eye"} size={20} color="#d0d0d0" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-row w-full items-center justify-end">
            <Text className="text-black font-quickregular underline pt-4">Esqueceste-te da password?</Text>
          </TouchableOpacity>

          {hasError && <Text className="text-red font-quickbold text-center w-full">{error}</Text>}

          {/* Botão do form */}
          <TouchableOpacity className="bg-orange rounded-lg w-full py-3 items-center mt-10" onPress={handleLoginForm}>
            <Text className="text-xl text-white font-quickbold">Entrar</Text>
          </TouchableOpacity>

          {/* Register redirect */}
          <View className="w-full flex-row items-center justify-center mt-16">
            <SpeechBubble />
          </View>
        </View>
      </View>
    </View>
  );
}
