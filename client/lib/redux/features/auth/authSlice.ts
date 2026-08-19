import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: null;
  accessToken: null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  initialized: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
})

export default authSlice.reducer;