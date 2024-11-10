import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import  UserSlice  from './Slice/UserSlice/UserSlice'
import { AuthApi } from './RTK/AuthAPI/AuthAPI'



export const store = configureStore({
  reducer: { 
     UserState: UserSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
})


setupListeners(store.dispatch)