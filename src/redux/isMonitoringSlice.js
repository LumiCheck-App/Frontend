import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://king-prawn-app-3re4n.ondigitalocean.app';

// thunk para atualizar is monitoring status do usuário
export const updateIsMonitoringStatus = createAsyncThunk(
  'user/updateIsMonitoring',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);

      const res = await fetch(`${API_URL}/user/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_monitoring: true }),
      });

      if (!res.ok) throw new Error('Failed to update is monitoring status');

      const updatedUser = await res.json();

      // atualizar localStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser.user));

      return updatedUser.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getIsMonitoringStatus = createAsyncThunk(
  'user/getIsMonitoringStatus',
  async (_, thunkAPI) => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) throw new Error('User not found in local storage');

      const user = JSON.parse(userData);
      console.log('User is monitoring:', user.is_monitoring);
      return user.is_monitoring;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const isMonitoringSlice = createSlice({
  name: 'isMonitoring',
  initialState: {
    isMonitoringState: false,
    loading: false,
    error: null,
  },
  reducers: {
    setMonitoringStatus: (state, action) => {
      state.isMonitoringState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIsMonitoringStatus.fulfilled, (state, action) => {
        state.isMonitoringState = action.payload;
      })
      .addCase(updateIsMonitoringStatus.fulfilled, (state, action) => {
        state.isMonitoringState = action.payload.is_monitoring;
      });
  },
});

export const { setUser } = isMonitoringSlice.actions;
export default isMonitoringSlice.reducer;
