import { IState } from "@/interfaces/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://e-pharmacy-c3fr.onrender.com/api",
});

export const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const handleError = (error: unknown, defaultMessage: string) => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const handlePending = (state: IState) => {
  state.isLoading = true;
};

export const handleRejected = (
  state: IState,
  action: PayloadAction<string | undefined>
): void => {
  state.isLoading = false;
  state.error = action.payload || "An unknown error occurred";
};
