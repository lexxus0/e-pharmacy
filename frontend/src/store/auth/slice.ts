import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/interfaces";
import {
  registerUser,
  loginUser,
  refreshUser,
  updateUserData,
  getUserData,
  signoutUser,
} from "./operations";
import { handleRejected } from "../init";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      })
      .addCase(getUserData.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
        state.isRefreshing = false;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        };
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
