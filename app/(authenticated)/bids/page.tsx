"use client";
import { useCloseBackdrop } from "@/hooks/backdrop";
import React from "react";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import BidsTable from "./UI/BidsTable";
import { useAppDispatch } from "@/shared/store/store";
import { setBackdropOpen } from "@/shared/store/slices/backdropSlice";
import BidsHistory from "./UI/BidsHistory";
const BidsPage = () => {
  useCloseBackdrop();
  const dispatch = useAppDispatch();
  return (
    <div className="mx-4">
      <div className="flex items-center justify-between">
        <Typography
          variant="h4"
          className="font-outfit text-center text-xl font-bold md:text-2xl"
        >
          My Bids
        </Typography>
        <Link
          href="/bids/create"
          onClick={() => {
            dispatch(setBackdropOpen());
          }}
        >
          <Button
            variant="text"
            color="primary"
            className="bg-buttonBg px-5 normal-case text-white hover:bg-buttonBgHover"
          >
            Create Bid
          </Button>
        </Link>
      </div>
      <div className="my-5 lg:flex">
        <BidsTable />
      </div>
      <BidsHistory />
    </div>
  );
};

export default BidsPage;
