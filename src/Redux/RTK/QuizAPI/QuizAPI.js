import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const QuizApi = createApi({
  reducerPath: 'QuizApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/Quiz' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getQuestionsByCategory: builder.query({
      query: () => ({
        url: '/get',
        method: 'POST',
        body: {
            "categoryName":"Geography"
        } ,
      }),
    }),
  }),
});

export const { useGetQuestionsByCategoryQuery } = QuizApi;
export default QuizApi;
