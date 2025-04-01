import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import userDigitalHabitsReducer from "./userDigitalHabitsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    userDigitalHabits: userDigitalHabitsReducer,
  },
});
