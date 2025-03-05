import { RootState } from "../store";

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectIsLoading = (state: RootState) => state.reviews.isLoading;
