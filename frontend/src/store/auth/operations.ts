import { clearAuthHeader, instance, setAuthHeader } from "../init";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../init";
import { IUser } from "@/interfaces/interfaces";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<
  IUser,
  { name: string; email: string; phone: string; password: string }
>("users/signup", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("user/register", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to register."));
  }
});

export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string }
>("users/signin", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("user/login", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to login."));
  }
});

export const refreshUser = createAsyncThunk<IUser, void, { state: RootState }>(
  "users/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found.");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await instance.post("user/refresh");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, "Failed to refresh user.")
      );
    }
  }
);

export const getUserData = createAsyncThunk<IUser, void, { state: RootState }>(
  "auth/getData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found.");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await instance.get("user/user-info");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, "Failed to get user data.")
      );
    }
  }
);

export const updateUserData = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { state: RootState }
>("users/updateUser", async (data, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) return rejectWithValue("User is not authenticated.");

  try {
    const response = await instance.put("/user/update", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (e) {
    return rejectWithValue(
      handleError(e, "Failed to update user information.")
    );
  }
});

export const signoutUser = createAsyncThunk(
  "users/signout",
  async (_, thunkAPI) => {
    clearAuthHeader();

    try {
      await instance.post("user/logout");
    } catch (e) {
      return thunkAPI.rejectWithValue(handleError(e, "Failed to signout."));
    }
  }
);
