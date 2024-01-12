"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import backdrop from "@/shared/store/slices/backdropSlice";
import historyDrawer from "@/shared/store/slices/historyDrawerSlice";

export const store = configureStore({
  reducer: {
    backdrop,
    historyDrawer,
  },
});

export type AppStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStoreState> = useSelector;
