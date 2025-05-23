import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.EXPO_PUBLIC_PHONE_URL || 'http://localhost:8000';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, onboarding }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, onboarding }),
      });
      const data = await response.json();

      if (response.ok) {
        return { message: data.message, userId: data.user_id };
      } else {
        return thunkAPI.rejectWithValue(data.detail);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isLoading: false,
    successMessage: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
