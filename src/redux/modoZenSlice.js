import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

// Thunk para verificar o progresso do Modo Zen
export const checkModoZenProgress = createAsyncThunk(
  'modoZen/checkProgress',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await fetch(
        `${API_URL}/achievement/${userId}/checkModoZen`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro ao verificar progresso Modo Zen');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const modoZenSlice = createSlice({
  name: 'modoZen',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetModoZenState: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkModoZenProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkModoZenProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkModoZenProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetModoZenState } = modoZenSlice.actions;
export default modoZenSlice.reducer;
