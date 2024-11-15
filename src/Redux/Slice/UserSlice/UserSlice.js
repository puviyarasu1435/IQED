import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../../RTK/AuthAPI/AuthAPI";

const UserSlice = createSlice({
  name: 'UserState',
  initialState: {
    _id: null,
    profileImage: "",
    UserName: "",
    Name: "",
    Email: "",
    Age: "",
    Password: "",
    School_Name: "",
    Grade: "",
    Mobile_Number: "",
    Streak: 0,
    IQGems: 0,
    Rank: 0,
    XP: 0,
  },
  reducers: {
    // You can add local reducers if needed
    UpdateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Automatically update slice when getUserById query is fulfilled
    builder.addMatcher(
      AuthApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        Object.assign(state, action.payload);
      }
    );

    // Automatically update slice when signIn mutation is fulfilled
    builder.addMatcher(
      AuthApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        Object.assign(state, action.payload);
      }
    );
  },
});

export const { UpdateUser } = UserSlice.actions;
export default UserSlice;
