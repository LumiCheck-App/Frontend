import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL_PROD;

// Submete uma resposta individual para o backend
export const submitSingleAnswer = createAsyncThunk(
  'answerQuestion/submitSingleAnswer',
  async ({ questionId, answer }, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;

      const response = {
        user_id: userId,
        question_id: questionId,
        answer: answer,
      };

      const res = await fetch(`${API_URL}/question/answer`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([response]),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Erro ao enviar resposta');
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Busca uma pergunta random que o utilizador ainda não respondeu
export const getRandomUnansweredQuestion = createAsyncThunk(
  'answerQuestion/getRandomUnansweredQuestion',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user.id;

      const res = await fetch(
        `${API_URL}/question/${userId}/random_unanswered`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Erro ao buscar pergunta');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const answerQuestionSlice = createSlice({
  name: 'answerQuestion',
  initialState: {
    question: null,
    loading: false,
    error: null,
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSingleAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSingleAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
      })
      .addCase(submitSingleAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRandomUnansweredQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomUnansweredQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
      })
      .addCase(getRandomUnansweredQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuestion } = answerQuestionSlice.actions;
export default answerQuestionSlice.reducer;
