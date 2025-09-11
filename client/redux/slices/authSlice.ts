import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") === "true" : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("isAuthenticated");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;