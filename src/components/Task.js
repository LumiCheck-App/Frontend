import React from "react";
import { Text, View } from "react-native";
import CheckIcon from "../../assets/icons/check.svg";

const Task = ({ taskText, isCompleted }) => (
    <View className="flex-row items-center justify-between bg-white rounded-lg px-4 mb-2 border border-light-gray">
        <Text className="text-lg font-regular flex-1 py-3">{taskText}</Text>
        <View className="h-full w-[1px] bg-light-gray mr-4" />
        <CheckIcon
            width={24}
            height={24}
            style={{ opacity: isCompleted ? 1 : 0 }}
        />
    </View>
);

export default Task;