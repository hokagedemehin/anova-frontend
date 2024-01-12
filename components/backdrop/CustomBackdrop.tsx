"use client";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "@/shared/store/store";
// import { useBackdropHooks } from "@/hooks/components/backdropHook";

const CustomBackdrop = () => {
  const { open } = useAppSelector((state) => state.backdrop);
  // const { openBackdrop } = useBackdropHooks();
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CustomBackdrop;
