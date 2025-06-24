import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.detail || 'Login failed');
      }

      await AsyncStorage.setItem('token', data.access_token);
      await AsyncStorage.setItem('refresh_token', data.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      const { WorkManagerModule } = NativeModules;
      WorkManagerModule.setUserId(data.user.id);
      WorkManagerModule.setAuthToken(data.access_token);

      return { token: data.access_token, user: data.user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      const { WorkManagerModule } = NativeModules;
      WorkManagerModule.setUserId(-1);

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setTokenFromStorage(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { setTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
