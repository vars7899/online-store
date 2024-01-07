import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandAdminSideBar: true,
};

const appSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    UPDATE_ADMIN_SIDEBAR(state) {
      state.expandAdminSideBar = !state.expandAdminSideBar;
    },
  },
});

export const { UPDATE_ADMIN_SIDEBAR } = appSlice.actions;

export default appSlice.reducer;
