import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

// Thunk para buscar screentime dos últimos 7 dias
export const fetchLast7DaysScreenTime = createAsyncThunk(
  'screentime/fetchLast7DaysScreenTime',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await fetch(
        `${API_URL}/screentime/last7days/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.detail || 'Erro ao buscar screentime dos últimos 7 dias'
        );
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const screentimeSlice = createSlice({
  name: 'screentime',
  initialState: {
    last7Days: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLast7DaysScreenTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLast7DaysScreenTime.fulfilled, (state, action) => {
        state.loading = false;
        state.last7Days = action.payload;
      })
      .addCase(fetchLast7DaysScreenTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default screentimeSlice.reducer;
