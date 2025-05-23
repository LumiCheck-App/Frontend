import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_PHONE_URL || 'http://localhost:8000';

// thunk para associar hábitos ao user
export const submitDigitalHabits = createAsyncThunk(
  'digitalHabits/submitDigitalHabits',
  async (habits, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const habitIds = Object.entries(habits)
        .filter(([_, value]) => value)
        .map(([key]) => Number(key.replace('habit', '')));

      for (const habitId of habitIds) {
        await fetch(`${API_URL}/digital-habits/${userId}/${habitId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const digitalHabitSlice = createSlice({
  name: 'digitalHabits',
  initialState: {
    isSubmitting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitDigitalHabits.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitDigitalHabits.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(submitDigitalHabits.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      });
  },
});

export default digitalHabitSlice.reducer;
