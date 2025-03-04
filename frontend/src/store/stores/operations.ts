import { IStores } from "@/interfaces/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";

export const fetchGeneralStores = createAsyncThunk<
  IStores[],
  void,
  { rejectValue: string }
>("stores/fetchGeneral", async (_, ThunkAPI) => {
  try {
    const res = await instance.get("/stores");
    return res.data.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch general stores")
    );
  }
});

export const fetchNearestStores = createAsyncThunk<
  IStores[],
  void,
  { rejectValue: string }
>("stores/fetchNearest", async (_, ThunkAPI) => {
  try {
    const res = await instance.get("/stores/nearest");
    return res.data.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch nearest stores")
    );
  }
});
