import { createSlice } from "@reduxjs/toolkit";

export const heartSlicer = createSlice({
  name: "heart",
  initialState: {
    numberHeart: 0,
    hearts: [],
  },
  reducers: {
    clearAllHeart: (state) => {
      state.hearts = [];
      state.numberHeart = 0;
    },
    getNumberHeart(state) {
      return {
        ...state,
      };
    },
    addHeart: (state, action) => {
      let hearts = {
        id: action.payload.id,
      };
      state.hearts.push(hearts);
      state.numberHeart++;
    },
    deleteHeart: (state, action) => {
      state.numberHeart--;
      state.hearts = state.hearts.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});
export const { clearAllHeart, getNumberHeart, addHeart, deleteHeart } =
  heartSlicer.actions;
export default heartSlicer.reducer;
