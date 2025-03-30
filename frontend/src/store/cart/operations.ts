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

  if (!accessToken) console.error("No token found.");
  try {
    setAuthHeader(accessToken);
    const res = await instance.put("/cart/update", {
      medicineId,
      quantity,
    });
    return res.data.data.items;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to update cart"));
  }
});

export const checkout = createAsyncThunk<
  void,
  {
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  },
  { state: RootState }
>("cart/checkout", async ({ name, email, phone, address }, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.token;
  const userId = state.auth.user._id;
  if (!accessToken) return thunkAPI.rejectWithValue("No token found.");
  if (!userId) return thunkAPI.rejectWithValue("No user id found.");

  try {
    setAuthHeader(accessToken);
    await instance.post(`cart/checkout/${userId}`, {
      name,
      email,
      phone,
      address,
    });
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(handleError(e, "Failed to checkout"));
  }
});

export const deleteItemFromCart = createAsyncThunk<
  { itemId: string },
  { itemId: string },
  { state: RootState }
>("cart/deleteItem", async ({ itemId }, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.token;
  const userId = state.auth.user?._id;

  if (!accessToken) return thunkAPI.rejectWithValue("No token found.");
  if (!userId) return thunkAPI.rejectWithValue("User not authenticated.");

  try {
    setAuthHeader(accessToken);
    await instance.delete(`/cart/${userId}/item/${itemId}`);
    return { itemId };
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to delete item"));
  }
});
