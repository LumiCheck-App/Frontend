import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedTasks } from '../redux/completedTasksSlice';
import { Text, View } from 'react-native';

export default function TasksFinished() {
  const dispatch = useDispatch();

  const completedTasks = useSelector((state) => state.completedTasks.completed);
  const loading = useSelector((state) => state.completedTasks.loading);
  const error = useSelector((state) => state.completedTasks.error);

  useEffect(() => {
    dispatch(fetchCompletedTasks());
  }, [dispatch]);

  if (error) {
    return <Text className="text-red font-quickbold">Erro: {error}</Text>;
  }

  if (completedTasks.length === 0) {
    return (
      <Text className="text-lg font-quickregular py-3">
        Ainda não concluíste nenhuma tarefa
      </Text>
    );
  }

  return (
    <View>
      {completedTasks.map((task) => (
        <View
          className="flex-row items-center justify-between bg-white rounded-lg px-4 mb-2 border border-light-gray"
          key={task.id}
        >
          <Text className="text-lg text-dark-gray font-quickregular flex-1 py-3">
            {task.description}
          </Text>
        </View>
      ))}
    </View>
  );
}
