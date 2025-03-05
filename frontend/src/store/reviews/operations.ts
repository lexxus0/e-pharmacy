import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IReviews } from "@/interfaces/interfaces";

export const fetchReviews = createAsyncThunk<
  IReviews[],
  void,
  { rejectValue: string }
>("reviews/fetchAll", async (_, ThunkAPI) => {
  try {
    const res = await instance.get("/customer-reviews");
    return res.data.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to fetch reviews"));
  }
});
