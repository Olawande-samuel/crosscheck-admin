/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery(),
  // { url: '/' }
  endpoints: (builder) => ({
    signInAccount: builder.mutation({
      queryFn: async (user) => {
        try {
          // const session = await signInFunc(user.email, user.password);
          // if (!session) throw Error;
          return { data: {} };
        } catch (error) {
          return { error };
        }
      },
    }),
    signinWithGoogle: builder.mutation({
      queryFn: async (signin) => {
        try {
          // function to sign in with google logic
          return { data: 'Account created successfully' };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),
    createUserAccount: builder.mutation({
      queryFn: async (user) => {
        try {
          // const newAccount = await account.create(
          //   ID.unique(),
          //   user.email,
          //   user.password,
          //   user.name
          // );

          // if (!newAccount) throw Error;

          return { data: {} };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),
    updateUserAccount: builder.mutation({
      queryFn: async (data: any) => {
        const { userID, userData } = data;
        try {
          // const updatedUser = await
          // if (!updatedUser) throw Error;

          return { data: {} };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),
    signOutAccount: builder.mutation({
      queryFn: async () => {
        try {
          // const session = await account.deleteSession('current');
          return { data: {} };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useSignInAccountMutation,
  useCreateUserAccountMutation,
  useSigninWithGoogleMutation,
  useUpdateUserAccountMutation,
  useSignOutAccountMutation,
} = authAPI;
export const {
  createUserAccount,
  updateUserAccount,
  signInAccount,
  signOutAccount,
  signinWithGoogle,
} = authAPI.endpoints;
