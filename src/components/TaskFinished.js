import React from 'react';
import { Text, View } from 'react-native';
import CheckIcon from '../../assets/icons/check.svg';

const Task = ({ taskText }) => (
  <View className="flex-row items-center justify-between bg-white rounded-lg px-4 mb-2 border border-light-gray">
    <Text className="text-lg text-dark-gray font-quickregular flex-1 py-3">
      {taskText}
    </Text>
  </View>
);

export default Task;
