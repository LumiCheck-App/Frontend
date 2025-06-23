import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

export const updateUserCredentials = createAsyncThunk(
  'user/updateCredentials',
  async ({ currentPassword, newUsername, newEmail }, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;

      const res = await fetch(`${API_URL}/user/${userId}/updatecredentials`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_username: newUsername,
          new_email: newEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.detail) {
          throw new Error(data.detail);
        }
        throw new Error('Failed to update credentials');
      }

      // Atualizar localStorage
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userCredentialsSlice = createSlice({
  name: 'userCredentials',
  initialState: {
    loading: false,
    error: null,
    success: false,
    updatedFields: null,
  },
  reducers: {
    resetCredentialsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.updatedFields = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.updatedFields = null;
      })
      .addCase(updateUserCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedFields = action.payload.updated_fields;
        state.error = null;
      })
      .addCase(updateUserCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.updatedFields = null;
      });
  },
});

export const { resetCredentialsState } = userCredentialsSlice.actions;
export default userCredentialsSlice.reducer;
