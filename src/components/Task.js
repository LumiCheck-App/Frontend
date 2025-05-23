import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import CheckIcon from '../../assets/icons/check.svg';

const Task = ({ taskId, taskText, isCompleted, onTaskUpdate }) => {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg px-4 mb-2 border border-light-gray">
      {/* Texto da tarefa */}
      <Text
        className={`text-lg font-quickregular flex-1 py-3 ${isCompleted ? 'text-gray-400 line-through' : ''}`}
      >
        {taskText}
      </Text>

      {/* Separador */}
      <View className="h-full w-[1px] bg-light-gray mx-4" />

      {/* Ícone de check clicável */}
      <TouchableOpacity onPress={onTaskUpdate}>
        <CheckIcon
          width={24}
          height={24}
          style={{ opacity: isCompleted ? 1 : 0.5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Task;
