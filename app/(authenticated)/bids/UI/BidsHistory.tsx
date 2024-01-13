"use client";
import { setHistoryDrawerClose } from "@/shared/store/slices/historyDrawerSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useBidHistory } from "@/hooks/bidHooks";
import { ISingleHistory } from "@/interface/bidsTypes";
import dayjs from "dayjs";

const BidsHistory = () => {
  const { open, id } = useAppSelector((state) => state.historyDrawer);
  const { bidHistoryData } = useBidHistory(id);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "1rem 0 0 1rem",
          },
        }}
        onClose={() => dispatch(setHistoryDrawerClose())}
      >
        <div className="page_content w-[20rem] p-4 sm:w-[30rem]">
          <div className="flex items-center justify-between">
            <Typography
              variant="h4"
              className="text-center font-outfit text-xl font-bold md:text-2xl"
            >
              History
            </Typography>
            <div className="flex justify-end">
              <IconButton
                onClick={() => dispatch(setHistoryDrawerClose())}
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
              {bidHistoryData &&
                bidHistoryData.length > 0 &&
                bidHistoryData.map((item: ISingleHistory, index: number) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        variant="outlined"
                        color={
                          item.status === "Approved"
                            ? "success"
                            : item.status === "Rejected"
                              ? "error"
                              : "primary"
                        }
                      />
                      {index !== bidHistoryData.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className="flex flex-col space-y-2">
                        <Typography
                          variant="body1"
                          className="font-outfit font-semibold"
                        >
                          {item.name}
                        </Typography>
                        <div className="flex flex-col space-y-2">
                          <Typography
                            variant="body2"
                            className="font-outfit text-xs"
                          >
                            quantity: {item.quantity} MWh
                          </Typography>
                          <Typography
                            variant="body2"
                            className=" font-outfit text-xs"
                          >
                            price: {item.price} €/MWh
                          </Typography>
                          <Typography
                            variant="body2"
                            className="font-outfit text-xs"
                          >
                            start:{" "}
                            {dayjs(item.start_time).format(
                              "MMM DD, YYYY HH:mm a",
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="font-outfit text-xs"
                          >
                            close:{" "}
                            {dayjs(item.close_time).format(
                              "MMM DD, YYYY HH:mm a",
                            )}
                          </Typography>
                          {item.status === "Rejected" && (
                            <Typography
                              variant="body2"
                              className="font-outfit text-xs"
                            >
                              reason: {item.reason}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BidsHistory;
