import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import userDigitalHabitsReducer from './userDigitalHabitsSlice';
import fiveQuestionsReducer from './fiveQuestionsSlice';
import onBoardingReducer from './onBoardingSlice';
import dailyTasksReducer from './dailyTasksSlice';
import userAnswersReducer from './userAnswersSlice';
import completedTasksReducer from './completedTasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    userDigitalHabits: userDigitalHabitsReducer,
    fiveQuestions: fiveQuestionsReducer,
    onBoarding: onBoardingReducer,
    dailyTasks: dailyTasksReducer,
    userAnswers: userAnswersReducer,
    completedTasks: completedTasksReducer,
  },
});
