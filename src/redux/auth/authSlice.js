// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  role: "user",
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLogin = true;
    },
    logout: (state) => {
      state.email = null;
      state.role = "user";
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
