import { createSlice } from "@reduxjs/toolkit";
import { QuizApi } from "../../RTK/QuizAPI/QuizAPI"; // Import the API slice

const initialState = {
  questionsList: [],
  currentQuestionIndex: 0,
  answeredQuestions: {}, // Stores user answers as { questionId: answer }
  score: 0,
  isLive: true,
  time: 0,
};

const QuizSlice = createSlice({
  name: "QuizState",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questionsList = action.payload;
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answeredQuestions[questionId] = answer;
    },
    setTimer: (state, action) => {
      state.time = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questionsList.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.answeredQuestions = {};
      state.score = 0;
      state.isLive = true;
    },
    submitQuiz: (state) => {
      state.score = Object.entries(state.answeredQuestions).reduce(
        (score, [id, answer]) => {
          const question = state.questionsList.find((q) => q._id === id);
          return (
            score + (question && question.correctAnswer === answer ? 1 : 0)
          );
        },
        0
      );
      state.isLive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      QuizApi.endpoints.getQuizSessionById.matchFulfilled,
      (state, action) => {
        console.log("ext",action.payload);
        state.questionsList = action.payload.questions; // Update questionsList with the fetched data
      }
    );
  },
});

export const {
  setQuestions,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  resetQuiz,
  submitQuiz,
  setQuestionIndex,
  setTimer
} = QuizSlice.actions;

export default QuizSlice;
