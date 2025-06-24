import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

// Thunk para desbloquear um troféu
export const unlockAchievement = createAsyncThunk(
  'achievement/unlockAchievement',
  async ({ achievementId }, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (!token || !user) {
        return thunkAPI.rejectWithValue('Usuário não autenticado');
      }
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.id;

      const response = await fetch(
        `${API_URL}/achievement/${userId}/${achievementId}/unlock`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro ao desbloquear troféu');
      }

      const result = await response.json();

      return {
        userId,
        achievementId,
        message: result.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const achievementSlice = createSlice({
  name: 'achievement',
  initialState: {
    loading: false,
    error: null,
    lastUnlocked: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(unlockAchievement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockAchievement.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUnlocked = action.payload;
      })
      .addCase(unlockAchievement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearLastUnlocked } = achievementSlice.actions;
export default achievementSlice.reducer;
