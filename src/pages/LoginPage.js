import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PasswordResetModal from "../components/PasswordResetModal";
import SpeechBubble from "../components/SpeechBubble";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  //DB Simulation
  const Users = [
    {
      id: 0,
      User_name: "reistiago",
      Pass: "123",
      Email: "reistiago64@gmail.com",
      Idade: 26,
      FirstEntry: true,
    },
    {
      id: 1,
      User_name: "eng_gracicha",
      Pass: "123",
      Email: "reistiago64@gmail.com",
      Idade: 21,
      FirstEntry: false,
    },
    {
      id: 2,
      User_name: "maezinhaVani",
      Pass: "123",
      Email: "reistiago64@gmail.com",
      Idade: 23,
      FirstEntry: false,
    },
  ];

  const navigation = useNavigation();

  //State Variables
  const [username, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  //Login Form Actions

  //Function to clear Login Form
  const clearLoginForm = () => {
    setUname("");
    setPass("");
  };

  //Function to check if Username exists and if Password corresponds to user in Login Form
  function handleLoginForm() {
    const user = Users.find((user) => user.User_name === username);

    //From Validation
    if (username === "" || pass === "") {
      console.log("Fill all inputs.");
    } else {
      if (user != undefined) {
        if (user.Pass === pass) {
          // !Falta a encriptação da password
          console.log(username, pass);
          clearLoginForm();
          if (user.FirstEntry) {
            navigation.replace("FirstQuestionnaire");
          } else {
            navigation.replace("HomeTabs");
          }
        } else {
          console.log("Wrong password.");
        }
      } else {
        console.log("Username does not exist.");
      }
    }
  }

  return (
    <View className="flex-1 bg-off-white">
      {/* Modal*/}
      <PasswordResetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        Users={Users}
      />
      {/* Page Title*/}
      <View className="h-1/3 justify-center items-center">
        <Text className=" text-5xl font-bold text-yellow">Login</Text>
      </View>

      {/*Form*/}
      <View className="w-screen px-16 flex-col gap-6 items-end justify-end">
        {/* Input do username */}
        <TextInput
          className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
          onChangeText={setUname}
          value={username}
          placeholder="Username"
        />
        <View className="w-full relative">
          {/* Input da password */}
          <TextInput
            secureTextEntry={securePass}
            className="bg-white w-full text-dark-gray border-solid border border-light-gray rounded-lg p-4 pr-12 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
            onChangeText={setPass}
            value={pass}
            placeholder="Password"
          />

          {/* Ícone de olho */}
          <TouchableOpacity
            className="absolute right-4 top-5"
            onPress={() => {
              setSecurePass(!securePass);
            }}
          >
            <FontAwesome
              name={securePass ? "eye-slash" : "eye"}
              size={20}
              color="#d0d0d0"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="text-dark-gray font-bold underline underline-offset-1">
            Esqueceste-te da password?
          </Text>
        </TouchableOpacity>

        {/* Botão do form */}
        <TouchableOpacity
          className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
          onPress={handleLoginForm}
        >
          <Text className="text-xl text-white font-bold">Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Register redirect */}
      <View className="h-1/3 w-full flex-row items-center justify-center px-10 ">
        <SpeechBubble />
      </View>
    </View>
  );
}
