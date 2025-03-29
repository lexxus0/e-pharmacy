import { clearAuthHeader, instance, setAuthHeader } from "../init";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../init";
import { IUser, IUserResponse } from "@/interfaces/interfaces";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<IUserResponse, IUser>(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await instance.post("user/register", credentials);
      console.log(res.data.data);
      setAuthHeader(res.data.data.token);
      return res.data.data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to register."));
    }
  }
);

export const loginUser = createAsyncThunk<IUserResponse, Partial<IUser>>(
  "users/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await instance.post("user/login", credentials);
      setAuthHeader(res.data.data.token);
      return res.data.data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to login."));
    }
  }
);

export const refreshUser = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { state: RootState }
>("users/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.token;
  const persistedToken = state.auth.refreshToken;

  if (!accessToken) {
    return thunkAPI.rejectWithValue("No token found.");
  }

  try {
    setAuthHeader(accessToken);
    const res = await instance.post("user/refresh", {
      refreshToken: persistedToken,
    });
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to refresh user."));
  }
});

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
    setAuthHeader(token);
    const response = await instance.put("/user/update", data);
    return response.data;
  } catch (e) {
    return rejectWithValue(
      handleError(e, "Failed to update user information.")
    );
  }
});

export const signoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "users/signout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("User is not authenticated.");

    try {
      setAuthHeader(token);
      await instance.post("user/logout");
      clearAuthHeader();
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to signout."));
    }
  }
);
