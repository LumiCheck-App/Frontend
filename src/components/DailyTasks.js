import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDailyTasks, toggleTaskStatus } from '../redux/dailyTasksSlice';
import Task from './Task';
import { Text } from 'react-native';

export default function DailyTasks({ userId }) {
  const dispatch = useDispatch();

  const dailyTasks = useSelector((state) => state.dailyTasks.tasks);
  const loading = useSelector((state) => state.dailyTasks.loading);
  const error = useSelector((state) => state.dailyTasks.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchDailyTasks(userId));
    }
  }, [userId, dispatch]);

  const handleTaskUpdate = (taskId) => {
    dispatch(toggleTaskStatus({ taskId, userId }));
  };

  if (error)
    return (
      <Text className="text-red font-quickbold">
        Erro ao carregar as tuas tarefas diárias
      </Text>
    );

  return (
    <>
      {dailyTasks.map((task) => (
        <Task
          key={task.id}
          taskId={task.id}
          taskText={task.description}
          isCompleted={task.done}
          onTaskUpdate={() => handleTaskUpdate(task.id)}
        />
      ))}
    </>
  );
}
