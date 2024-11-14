import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import UserSlice from './Slice/UserSlice/UserSlice';
import QuizSlice from './Slice/QuizSlice/QuizSlice';
import { AuthApi } from './RTK/AuthAPI/AuthAPI';
import { QuizApi } from './RTK/QuizAPI/QuizAPI';

export const store = configureStore({
  reducer: { 
    UserState: UserSlice.reducer,
      QuizState: QuizSlice.reducer,
    [QuizApi.reducerPath]: QuizApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, QuizApi.middleware),
});

setupListeners(store.dispatch);
