import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});
