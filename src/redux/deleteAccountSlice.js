import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async (password, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;

      const res = await fetch(`${API_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.detail) {
          throw new Error(data.detail);
        }
        throw new Error('Failed to delete account');
      }

      // Limpar dados do usuário do AsyncStorage
      await AsyncStorage.multiRemove(['token', 'user', 'refresh_token']);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteAccountSlice = createSlice({
  name: 'deleteAccount',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetDeleteAccountState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetDeleteAccountState } = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
