import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviews } from "./operations";
import { IReviews } from "@/interfaces/interfaces";
import { handlePending, handleRejected } from "../init";
interface ReviewsState {
  reviews: IReviews[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<IReviews[]>) => {
          state.isLoading = false;
          state.reviews = action.payload;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export default reviewsSlice.reducer;
