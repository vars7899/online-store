import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandAdminSideBar: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateAdminSideBar(state) {
      state.expandAdminSideBar = !state.expandAdminSideBar;
    },
  },
});

export const { updateAdminSideBar } = appSlice.actions;

export default appSlice.reducer;
