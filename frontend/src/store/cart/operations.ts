import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init";
import { ICart } from "@/interfaces/interfaces";
import { RootState } from "../store";

export const getCart = createAsyncThunk<ICart, void, { state: RootState }>(
  "cart/getCart",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;
    if (!accessToken) return thunkAPI.rejectWithValue("No token found.");
    try {
      setAuthHeader(accessToken);
      const res = await instance.get("/cart");
      return res.data.data.data.items;
    } catch (e) {
      return thunkAPI.rejectWithValue(handleError(e, "Failed to get cart"));
    }
  }
);

export const updateCart = createAsyncThunk<
  ICart[],
  { medicineId: string; quantity: number },
  { state: RootState }
>("cart/updateCart", async ({ medicineId, quantity }, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.token;
  console.log(accessToken);

  if (!accessToken) console.error("No token found.");
  try {
    setAuthHeader(accessToken);
    const res = await instance.put("/cart/update", {
      medicineId,
      quantity,
    });
    console.log(res.data.data.items);
    return res.data.data.items;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to update cart"));
  }
});

export const checkout = createAsyncThunk<
  { totalAmount: number },
  void,
  { state: RootState }
>("cart/checkout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.token;
  if (!accessToken) return thunkAPI.rejectWithValue("No token found.");
  try {
    setAuthHeader(accessToken);
    const res = await instance.post("/cart/checkout");
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to ckeckout"));
  }
});
