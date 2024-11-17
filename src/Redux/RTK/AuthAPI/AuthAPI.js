import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/Auth" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "SignUp",
        method: "POST",
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: "signIn",
        method: "POST",
        body: data,
      }),
    }),

    sendEmailOTP: builder.mutation({
      query: (data) => ({
        url: "SendEmailOTP",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmailOTP: builder.mutation({
      query: (data) => ({
        url: "VerifyEmailOTP",
        method: "POST",
        body: data,
      }),
    }),

    sendMobileOTP: builder.mutation({
      query: (data) => ({
        url: "SendMobileOTP",
        method: "POST",
        body: data,
      }),
    }),

    verifyMobileOTP: builder.mutation({
      query: (data) => ({
        url: "VerifyMobileOTP",
        method: "POST",
        body: data,
      }),
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserStats: builder.mutation({
      query: (data) => ({
        url: "updateUserStats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsersSortedByMaxStreakAndMinRank: builder.query({
      query: () => ({
        url: "sorted",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "updateProfile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
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
  useGetUsersSortedByMaxStreakAndMinRankQuery,
  useUpdateUserProfileMutation, // Export the new mutation hook
  
} = AuthApi;
