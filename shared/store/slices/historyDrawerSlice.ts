import { createSlice } from "@reduxjs/toolkit";
import { AppStoreState } from "@/shared/store/store";

const initialState = {
  open: false,
  id: "",
  open_admin: false,
  id_admin: "",
};

export const historyDrawerSlice = createSlice({
  name: "historyDrawer",
  initialState,
  reducers: {
    setHistoryDrawerOpen: (state) => {
      state.open = true;
    },
    setHistoryDrawerClose: (state) => {
      state.open = false;
      state.id = "";
    },
    setHistoryDrawerId: (state, action) => {
      state.id = action.payload;
    },
    setHistoryDrawerOpenAdmin: (state) => {
      state.open_admin = true;
    },
    setHistoryDrawerCloseAdmin: (state) => {
      state.open_admin = false;
      state.id_admin = "";
    },
    setHistoryDrawerIdAdmin: (state, action) => {
      state.id_admin = action.payload;
    },
  },
});

export const {
  setHistoryDrawerOpen,
  setHistoryDrawerClose,
  setHistoryDrawerId,
  setHistoryDrawerOpenAdmin,
  setHistoryDrawerCloseAdmin,
  setHistoryDrawerIdAdmin,
} = historyDrawerSlice.actions;

export const selectHistoryDrawer = (state: AppStoreState) =>
  state.historyDrawer;

export default historyDrawerSlice.reducer;
