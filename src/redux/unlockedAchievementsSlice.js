import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

// Thunk para buscar troféus desbloqueados do utilizador autenticado
export const fetchUnlockedAchievements = createAsyncThunk(
  'achievements/fetchUnlocked',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await fetch(
        `${API_URL}/achievement/${userId}/unlocked`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro ao buscar troféus desbloqueados');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const unlockedAchievementsSlice = createSlice({
  name: 'unlockedAchievements',
  initialState: {
    achievements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnlockedAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnlockedAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(fetchUnlockedAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unlockedAchievementsSlice.reducer;
