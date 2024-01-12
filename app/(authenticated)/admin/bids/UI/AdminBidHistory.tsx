"use client";
import { useAdminBidHistory } from "@/hooks/bidHooks";
import { ISingleHistory } from "@/interface/bidsTypes";
import { setHistoryDrawerCloseAdmin } from "@/shared/store/slices/historyDrawerSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Drawer, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const AdminBidHistory = () => {
  const { open_admin, id_admin } = useAppSelector(
    (state) => state.historyDrawer,
  );
  const { adminBidHistoryData } = useAdminBidHistory(id_admin);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Drawer
        anchor="right"
        open={open_admin}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "1rem 0 0 1rem",
          },
        }}
        onClose={() => dispatch(setHistoryDrawerCloseAdmin())}
      >
        <div className="page_content w-[20rem] p-4 sm:w-[30rem]">
          <div className="flex items-center justify-between">
            <Typography
              variant="h4"
              className="font-outfit text-center text-xl font-bold md:text-2xl"
            >
              History
            </Typography>
            <div className="flex justify-end">
              <IconButton
                onClick={() => dispatch(setHistoryDrawerCloseAdmin())}
                color="error"
                className=""
                size="small"
              >
                <AiOutlineClose />
              </IconButton>
            </div>
          </div>
          <div className="">
            <Timeline position="alternate">
              {adminBidHistoryData &&
                adminBidHistoryData.length > 0 &&
                adminBidHistoryData.map(
                  (history: ISingleHistory, index: number) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot
                          variant="outlined"
                          color={
                            history.status === "Approved"
                              ? "success"
                              : history.status === "Rejected"
                                ? "error"
                                : "primary"
                          }
                        />
                        {index !== adminBidHistoryData.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="flex flex-col space-y-2">
                          <Typography
                            variant="body1"
                            className="font-outfit font-semibold"
                          >
                            {history.name}
                          </Typography>
                          <div className="flex flex-col space-y-2">
                            <Typography
                              variant="body2"
                              className="font-outfit text-xs"
                            >
                              quantity: {history.quantity} MWh
                            </Typography>
                            <Typography
                              variant="body2"
                              className=" font-outfit text-xs"
                            >
                              price: {history.price} €/MWh
                            </Typography>
                            <Typography
                              variant="body2"
                              className="font-outfit text-xs"
                            >
                              start:{" "}
                              {dayjs(history.start_time).format(
                                "MMM DD, YYYY HH:mm a",
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="font-outfit text-xs"
                            >
                              close:{" "}
                              {dayjs(history.close_time).format(
                                "MMM DD, YYYY HH:mm a",
                              )}
                            </Typography>
                            {history.status === "Rejected" && (
                              <Typography
                                variant="body2"
                                className="font-outfit text-xs"
                              >
                                reason: {history.reason}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </TimelineContent>
                    </TimelineItem>
                  ),
                )}
            </Timeline>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminBidHistory;
