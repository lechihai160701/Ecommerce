import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import cartItem from "./cartItemSlice";
import heartItem from "./heartSlice";
import userItem from "./userSlice";
import historyItem from "./listOrderSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const appReducer = combineReducers({
  cart: cartItem,
  heart: heartItem,
  user: userItem,
  history: historyItem,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
      //   immutableCheck: isDev ? { warnAfter: 64 } : false,
    }),
});

export const persistor = persistStore(store);
