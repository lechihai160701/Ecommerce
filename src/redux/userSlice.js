import { createSlice } from "@reduxjs/toolkit";

export const userSlicer = createSlice({
  name: "user",
  initialState: {
    info: null,
  },
  reducers: {
    clearAllUser: (state) => {
      state.info = null;
    },
    getUser(state) {
      return {
        ...state,
      };
    },
    setInfoUser: (state, action) => {
      state.info = action.payload;
    },
  },
});
export const { clearAllUser, getUser, setInfoUser } = userSlicer.actions;
export default userSlicer.reducer;
