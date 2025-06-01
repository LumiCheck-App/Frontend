import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

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

      const res = await fetch(`${API_URL}/digital-habits/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habit_ids: habitIds }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Erro ao associar hábitos digitais');
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
