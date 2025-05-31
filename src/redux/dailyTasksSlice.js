import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL_PROD || 'http://localhost:8000';

export const fetchDailyTasks = createAsyncThunk(
  'dailyTasks/fetchDailyTasks',
  async (_, thunkAPI) => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await fetch(`${API_URL}/task/${userId}/dailystatus`);
      if (!response.ok) {
        throw new Error('Failed to fetch daily tasks');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  'dailyTasks/toggleTaskStatus',
  async ({ taskId }, thunkAPI) => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await fetch(
        `${API_URL}/task/${taskId}/${userId}/toggle`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to toggle task status');
      }

      const data = await response.json();
      return { taskId, success: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dailyTasksSlice = createSlice({
  name: 'dailyTasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchDailyTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) task.done = !task.done;
      });
  },
});

export default dailyTasksSlice.reducer;
