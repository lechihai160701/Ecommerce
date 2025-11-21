import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import cartItem from "./cartItemSlice";
import heartItem from "./heartSlice";
import userItem from "./userSlice";

const composedEnhancers = composeWithDevTools();
export default configureStore(
  {
    reducer: {
      cart: cartItem,
      heart: heartItem,
      user: userItem,
    },
  },
  composedEnhancers
);
