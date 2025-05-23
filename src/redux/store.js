import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import userDigitalHabitsReducer from './userDigitalHabitsSlice';
import fiveQuestionsReducer from './fiveQuestionsSlice';
import onBoardingReducer from './onBoardingSlice';
import dailyTasksReducer from './dailyTasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    userDigitalHabits: userDigitalHabitsReducer,
    fiveQuestions: fiveQuestionsReducer,
    onBoarding: onBoardingReducer,
    dailyTasks: dailyTasksReducer,
  },
});
