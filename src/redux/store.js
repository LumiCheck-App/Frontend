import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import userDigitalHabitsReducer from './userDigitalHabitsSlice';
import fiveQuestionsReducer from './fiveQuestionsSlice';
import onBoardingReducer from './onBoardingSlice';
import dailyTasksReducer from './dailyTasksSlice';
import userAnswersReducer from './userAnswersSlice';
import completedTasksReducer from './completedTasksSlice';
import isMonitoringReducer from './isMonitoringSlice';
import firebaseTokenReducer from './firebaseTokenSlice';
import answerQuestionReducer from './answerQuestionSlice';
import userReducer from './userSlice';
import screentimeReducer from './screentimeSlice';
import updateUserCredentialsReducer from './updateUserCredentialsSlice';
import deleteAccountReducer from './deleteAccountSlice';

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
    isMonitoring: isMonitoringReducer,
    firebaseToken: firebaseTokenReducer,
    answerQuestion: answerQuestionReducer,
    user: userReducer,
    screentime: screentimeReducer,
    updateUserCredentials: updateUserCredentialsReducer,
    deleteAccount: deleteAccountReducer,
  },
});
