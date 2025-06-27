import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

export const getFirebaseToken = createAsyncThunk(
  'user/getFirebaseToken',
  async ({ firebase_token }, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);

      const res = await fetch(`${API_URL}/user/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebase_token }),
      });

      if (!res.ok) throw new Error('Failed to update onboarding');

      const updatedUser = await res.json();

      // atualizar localStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser.user));

      return updatedUser.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getFirebaseTokenSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFirebaseToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFirebaseToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getFirebaseToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = getFirebaseTokenSlice.actions;
export default getFirebaseTokenSlice.reducer;
