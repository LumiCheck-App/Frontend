// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firstCapitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// AsyncThunk para carregar e processar o user do AsyncStorage
export const loadUserFromStorage = createAsyncThunk(
  'user/loadUserFromStorage',
  async () => {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return {
        ...user,
        username: firstCapitalize(user.username),
      };
    }
    return null;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.status = 'failed';
        state.data = null;
      });
  },
});

export default userSlice.reducer;
