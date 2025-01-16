import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import Lumi from "../../assets/lumis/Lumi.svg";

export default function FQFirstMessage({ modalVisible, CloseModal }) {
  const sentence =
    "Para começar vou te fazer umas perguntinhas para saber o que te mais preocupa e te conhecer melhor! Vamos a isso?";
  const [displayedText, setDisplayedText] = useState(""); // Text displayed progressively
  const typingSpeed = 50; // Typing speed in milliseconds

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(""); // Reset displayed text when modal opens

    if (modalVisible) {
      const interval = setInterval(() => {
        if (currentIndex < sentence.length - 1) {
          // Update the displayed text with the next character
          setDisplayedText((prevText) => prevText + sentence[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval); // Stop the interval when typing is complete
        }
      }, typingSpeed);

      return () => clearInterval(interval); // Cleanup on unmount or when modal is closed
    }
  }, []); // Restart typing effect when modal is opened

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* Overlay */}
      <TouchableOpacity
        className="relative w-screen h-screen items-center justify-center gap-12"
        onPress={CloseModal}
      >
        <View className="bg-black opacity-50 absolute w-full h-full top-0"></View>
        <View className="w-screen px-6">
          <View className="bg-white px-4 py-6 rounded-2xl relative border border-light-gray">
            {/* Animated Typewriter Text */}
            <Text className="text-black text-lg font-quickregular">
              {displayedText}
            </Text>
          </View>
        </View>
        <Lumi width={200} height={200} />
        <Text className="text-white font-quickregular text-xl absolute bottom-10">
          Tap to close
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}
