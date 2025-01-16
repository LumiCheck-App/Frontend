import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function TermsAndContitionsModal({
  modalVisible,
  setModalVisible,
}) {
  function CloseModal() {
    setModalVisible(false);
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
        <View className="relative max-h-96 bg-off-white pt-20 pb-10 px-6 flex-col justify-center items-center w-full border-x border-y border-light-gray rounded-lg gap-8">
          <Text className="text-2xl font-quickbold text-yellow">
            Termos e Condições
          </Text>
          <ScrollView persistentScrollbar className="w-full">
            <Text className="font-quickbold my-3 text-lg"> Lorem ipsum </Text>
            <Text className="font-quickregular">
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Text>
            <Text className="font-quickbold mb-3 text-lg"> Lorem ipsum </Text>
            <Text className="font-quickregular">
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Text>
            <Text className="font-quickbold mb-3 text-lg"> Lorem ipsum </Text>
            <Text className="font-quickregular">
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
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
