import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  return (
    <View className="flex-1 bg-off-white">
      {/* Page Title*/}
      <View className="h-1/3 justify-center items-center">
        <Text className=" text-5xl font-bold text-yellow">Login</Text>
      </View>

      {/*Form*/}
      <View className="w-screen px-16 flex-col gap-6 items-end justify-end">
        <TextInput
          className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
          onChangeText={setName}
          value={name}
          placeholder="Username"
        />
        <TextInput
          className="bg-white w-full text-dark-gray border-solid border-x border-y border-light-gray rounded-lg p-4 placeholder:font-bold placeholder:text-xl placeholder:text-light-gray"
          onChangeText={setPass}
          value={pass}
          placeholder="Password"
        />
        <Text className="text-dark-gray underline underline-offset-1">
          Esqueceste-te da password?
        </Text>

        <TouchableOpacity
          className="bg-yellow rounded-lg w-full py-3 items-center mt-10"
          onPress={() => {
            console.log(name, pass);
          }}
        >
          <Text className="text-xl text-white font-bold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
