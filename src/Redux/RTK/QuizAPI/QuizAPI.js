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
        updateQuizSession: builder.mutation({
      query: ({ sessionId, hostId, score, answeredQuestions, status }) => ({
        url: `/quiz-session/${sessionId}`,
        method: "PUT",
        body: { hostId, score, answeredQuestions, status },
      }),
    }),
    uploadFile: builder.mutation({
      query: ({ file, email }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);

        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionByIdQuery, 
useUpdateQuizSessionMutation,// Hook to fetch quiz session by ID
useUploadFileMutation
} = QuizApi;
