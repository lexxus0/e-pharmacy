import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IMedicineItem, IMedicineResponse } from "@/interfaces/interfaces";

export const fetchMedicine = createAsyncThunk<
  IMedicineResponse,
  { limit: number; currentPage: number; category?: string; keyword?: string },
  { rejectValue: string }
>(
  "products/fetchAll",
  async ({ limit, currentPage, category, keyword }, ThunkAPI) => {
    try {
      const res = await instance.get("/products", {
        params: { limit, page: currentPage, category, keyword },
      });
      return res.data.data;
    } catch (e) {
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to fetch medicine")
      );
    }
  }
);

export const fetchMedicineById = createAsyncThunk<
  IMedicineItem,
  { _id: string },
  { rejectValue: string }
>("products/fetchById", async ({ _id }, ThunkAPI) => {
  try {
    const res = await instance.get(`/products/${_id}`);
    return res.data.data;
  } catch (e) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch medicine by id")
    );
  }
});
