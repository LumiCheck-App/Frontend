import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_PHONE_URL || "http://localhost:8000";

// thunk para associar hábitos ao user
export const userDigitalHabits = createAsyncThunk(
  "digitalHabits/userDigitalHabits",
  async (habits, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString);
      const userId = user.id;

      const habitIds = Object.entries(habits)
        .filter(([_, value]) => value) // só os marcados como true
        .map(([key]) => Number(key.replace("habit", ""))); // habit1 -> 1

      for (const habitId of habitIds) {
        await fetch(`${API_URL}/digital-habits/${userId}/${habitId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      }

      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const digitalHabitSlice = createSlice({
  name: "digitalHabits",
  initialState: {
    isSubmitting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userDigitalHabits.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(userDigitalHabits.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(userDigitalHabits.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      });
  },
});

export default digitalHabitSlice.reducer;
