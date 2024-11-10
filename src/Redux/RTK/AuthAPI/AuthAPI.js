import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2001/Auth' }), 
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
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSendEmailOTPMutation,
  useVerifyEmailOTPMutation,
  useSendMobileOTPMutation,
  useVerifyMobileOTPMutation,
} = AuthApi;