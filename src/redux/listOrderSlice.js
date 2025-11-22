import { createSlice } from "@reduxjs/toolkit";

export const listOrderSlice = createSlice({
  name: "historyOrder",
  initialState: {
    numberOrder: 0,
    arrListOrder: [],
  },
  reducers: {
    clearAll: (state) => {
      state.numberOrder = [];
      state.arrListOrder = 0;
    },

    getListOrder: (state) => {
      return {
        ...state,
      };
    },
    addListOrder: (state, action) => {
      const { products } = action.payload;
      state.arrListOrder.push(products);
      state.numberOrder++;
    },
  },
});
export const { clearAll, getListOrder, addListOrder } = listOrderSlice.actions;
export default listOrderSlice.reducer;
