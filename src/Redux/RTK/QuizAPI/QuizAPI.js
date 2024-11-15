import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const QuizApi = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/Quiz" }), // Replace with your actual base URL
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: ({ categoryName, hostId }) => ({
        url: "/create-session",
        method: "POST",
        body: { categoryName, hostId },
      }),
    }),
    getQuizSessionById: builder.query({
      query: (id) => `/quiz-session/${id}`, // Fetch quiz session by ID
    }),
    updateQuizSession: builder.mutation({
      query: ({ sessionId, hostId, score, answeredQuestions, status }) => ({
        url: `/quiz-session/${sessionId}`,
        method: "PUT",
        body: { hostId, score, answeredQuestions, status },
      }),
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionByIdQuery, 
useUpdateQuizSessionMutation// Hook to fetch quiz session by ID
} = QuizApi;
