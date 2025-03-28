import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "@/store/stores/slice";
import reviewsReducer from "@/store/reviews/slice";
import medicineReducer from "@/store/medicine/slice";
import authReducer from "@/store/auth/slice";
import cartReducer from "@/store/cart/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const authPersistConfig = {
  key: "auth",
  storage,
};
const storesPersistConfig = {
  key: "stores",
  storage,
};
const reviewsPersistConfig = {
  key: "reviews",
  storage,
};
const medicinePersistConfig = {
  key: "medicine",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    stores: persistReducer(storesPersistConfig, storesReducer),
    reviews: persistReducer(reviewsPersistConfig, reviewsReducer),
    medicine: persistReducer(medicinePersistConfig, medicineReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
