import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import cartItem from "./cartItemSlice";
import heartItem from "./heartSlice";

const composedEnhancers = composeWithDevTools();
export default configureStore(
  {
    reducer: {
      cart: cartItem,
      heart: heartItem,
    },
  },
  composedEnhancers
);
