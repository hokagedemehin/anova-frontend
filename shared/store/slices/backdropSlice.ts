import { createSlice } from "@reduxjs/toolkit";
import { AppStoreState } from "@/shared/store/store";

const initialState = {
  open: false,
};

export const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    setBackdropOpen: (state) => {
      state.open = true;
    },
    setBackdropClose: (state) => {
      state.open = false;
    },
  },
});

export const { setBackdropOpen, setBackdropClose } = backdropSlice.actions;

export const selectBackdrop = (state: AppStoreState) => state.backdrop;

export default backdropSlice.reducer;
