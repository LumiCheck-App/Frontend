import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function PasswordResetModal({
  modalVisible,
  setModalVisible,
  Users,
}) {
  // Modal State
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [Newpass, setNewPass] = useState("");
  const [PassConfirm, setPassConfirm] = useState("");
  const [emailForm, setEmailForm] = useState(true);
  const [error, setError] = useState(false);
  const [PassChangeVal, setPassChangeVal] = useState(false);

  //Function to verify email and send code to change password
  function SendEmail() {
    //Gets user from database
    const email_exists = Users.some((user) => user.Email === email);
    setCode(Math.floor(1000 + Math.random() * 9000)); // Generate a random 4-digit code

    //Sends email with the code and shows new pass form or shows error
    if (email_exists) {
      // Need to install emailjs-com to send a E-mail
      setEmailForm(false);
      setError(false);
    } else {
      setError(true);
    }
  }

  //Function to change password
  function ChangePass() {
    //Checks if new passwords matches or shows error
    if (Newpass === PassConfirm) {
      //Checks if the user code is the same send to email or shows error
      if (userCode == code) {
        setError(false);
        setPassChangeVal(true);

        // Clear Inputs
        setNewPass("");
        setPassConfirm("");
        setUserCode("");

        // Close Modal after success
        setTimeout(() => {
          setModalVisible(false);
          setEmailForm(true);
          setPassChangeVal(false);
        }, 1000);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }

  //Function to close Modal resets modal form and sucsses and error messages
  function CloseModal() {
    setModalVisible(false);
    setEmailForm(true);
    setError(false);
    setPassChangeVal(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      className="relative"
    >
      {/* Overlay */}
      <View className="bg-black opacity-50 absolute w-full h-full top-0"></View>
      <View className="h-screen justify-center items-center w-screen px-5">
        {/* Modal Content */}
        <View className="relative bg-off-white py-20 px-6 flex-col justify-center items-center w-full border-x border-y border-light-gray rounded-lg gap-4">
          {/* Email Form */}
          {emailForm && (
            <View className="w-full gap-4 justify-center items-center">
              <Text className="text-2xl font-quickbold text-yellow">
                Insere o teu e-mail
              </Text>
              <Text className="mb-10">
                Vamos te mandar um código para o teu email
              </Text>

              <TextInput
                className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail"
              />
              {error && (
                <Text className="text-red-500 font-quickbold">
                  Este email não está registado
                </Text>
              )}
              <TouchableOpacity
                className="bg-yellow rounded-lg w-full py-3 items-center"
                onPress={SendEmail}
              >
                <Text className="text-xl text-white font-quickbold">Enviar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* New Password Form */}
          {!emailForm && (
            <View className="w-full gap-4 justify-center items-center">
              <Text className="text-2xl font-quickbold text-yellow mb-10">
                Cria a tua nova password
              </Text>
              <TextInput
                secureTextEntry
                className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                onChangeText={setNewPass}
                value={Newpass}
                placeholder="New Password"
              />
              <TextInput
                secureTextEntry
                className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                onChangeText={setPassConfirm}
                value={PassConfirm}
                placeholder="Confirm Password"
              />
              <Text className="font-quickregular">Código</Text>
              <TextInput
                className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-quickbold placeholder:text-xl placeholder:text-light-gray"
                keyboardType="numeric"
                maxLength={4}
                placeholder="Email Code"
                onChangeText={setUserCode}
                value={userCode}
              />

              {error && (
                <Text className="text-red-500 font-quickbold">
                  Algo não correu bem
                </Text>
              )}

              {PassChangeVal && (
                <Text className="text-green-400 font-quickbold">
                  Palavra passe mudada com sucesso
                </Text>
              )}

              <TouchableOpacity
                className="bg-yellow rounded-lg w-full py-3 items-center"
                onPress={ChangePass}
              >
                <Text className="text-xl text-white font-quickbold">
                  Mudar Password
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            className="ml-2 absolute top-4 right-4"
            onPress={CloseModal}
          >
            <FontAwesome name="close" size={24} color="#fcc766" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
