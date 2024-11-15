import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/Auth' }), 
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: 'SignUp',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: 'signIn',
        method: 'POST',
        body: data,
      }),
    }),

    sendEmailOTP: builder.mutation({
      query: (data) => ({
        url: 'SendEmailOTP',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmailOTP: builder.mutation({
      query: (data) => ({
        url: 'VerifyEmailOTP',
        method: 'POST',
        body: data,
      }),
    }),

    sendMobileOTP: builder.mutation({
      query: (data) => ({
        url: 'SendMobileOTP',
        method: 'POST',
        body: data,
      }),
    }),

    verifyMobileOTP: builder.mutation({
      query: (data) => ({
        url: 'VerifyMobileOTP',
        method: 'POST',
        body: data,
      }),
    }),

    // New endpoint to get user by ID
    getUserById: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: 'GET',
      }),
    }),
    updateUserStats: builder.mutation({
      query: (data) => ({
        url: 'updateUserStats',  // Endpoint on the server
        method: 'POST',
        body: data,  // The data being sent, such as userId, streakIncrement, etc.
      }),
    }),
    getUsersSortedByMaxStreakAndMinRank: builder.query({
      query: () => ({
        url: 'sorted',  // The endpoint where sorted users are fetched from
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSendEmailOTPMutation,
  useVerifyEmailOTPMutation,
  useSendMobileOTPMutation,
  useVerifyMobileOTPMutation,
  useGetUserByIdQuery,
  useUpdateUserStatsMutation,
  useGetUsersSortedByMaxStreakAndMinRankQuery ,
} = AuthApi;
