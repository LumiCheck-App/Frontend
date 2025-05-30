import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL_PROD || 'http://localhost:8000';

// Envia as 5 respostas para o backend
export const submitAnswers = createAsyncThunk(
  'fiveQuestions/submitAnswers',
  async (answers, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;

      const responses = Object.entries(answers).map(([key, value]) => {
        const questionId = parseInt(key.replace('question', ''), 10);
        return {
          user_id: userId,
          question_id: questionId,
          answer: value,
        };
      });

      const res = await fetch(`${API_URL}/question/answer`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Erro ao enviar respostas');
      }

      return responses;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const fiveQuestionsSlice = createSlice({
  name: 'fiveQuestions',
  initialState: {
    submitting: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.submitting = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAnswers.pending, (state) => {
        state.submitting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitAnswers.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetStatus } = fiveQuestionsSlice.actions;
export default fiveQuestionsSlice.reducer;
