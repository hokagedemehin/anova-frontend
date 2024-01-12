"use client";
import { useCloseBackdrop } from "@/hooks/backdrop";
import {
  useCreateBidHistory,
  useSingleAdminBid,
  useUpdateAdminBid,
} from "@/hooks/bidHooks";
import { ICreateBidTypes, IUpdatedBidType } from "@/interface/bidsTypes";
import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import { useAppDispatch } from "@/shared/store/store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

const AdminBidsDetailPage = () => {
  useCloseBackdrop();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { singleAdminBidData } = useSingleAdminBid(id);
  const updateAdminBidMutation = useUpdateAdminBid();
  const createBidHistoryMutation = useCreateBidHistory();
  // console.log("singleAdminBidData", singleAdminBidData);

  const queryClient = useQueryClient();

  // ***** REACT HOOK FORM ***** //
  const {
    control,
    // handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ICreateBidTypes>({
    defaultValues: {
      quantity: 0,
      price: 0,
      start_time: "",
      close_time: "",
    },
  });

  useEffect(() => {
    if (singleAdminBidData) {
      setValue("quantity", singleAdminBidData.quantity);
      setValue("price", singleAdminBidData.price);
      setValue(
        "start_time",
        dayjs(singleAdminBidData.start_time).format("YYYY-MM-DDTHH:mm"),
      );
      setValue(
        "close_time",
        dayjs(singleAdminBidData.close_time).format("YYYY-MM-DDTHH:mm"),
      );
    }

    return () => {
      reset();
    };
  }, [setValue, singleAdminBidData, reset]);

  // ####### ACCEPT BID #######
  const handleAcceptBid = (id: string, user: number) => {
    try {
      dispatch(setBackdropOpen());
      const form_data = {
        id,
        status: "Approved",
        user,
      };
      updateAdminBidMutation.mutate(form_data, {
        onSuccess: (data: AxiosResponse<IUpdatedBidType>) => {
          queryClient.invalidateQueries({
            queryKey: ["adminBids", "singleAdminBid"],
          });
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid approved",
            status: "Approved",
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());
              enqueueSnackbar("Bid approved successfully", {
                variant: "success",
              });
              queryClient.invalidateQueries({
                queryKey: ["singleAdminBid", "adminBidHistory"],
              });
            },
            onError: (error) => {
              dispatch(setBackdropClose());
              if (error instanceof AxiosError) {
                if (error?.response?.data?.message) {
                  enqueueSnackbar(error?.response?.data?.message, {
                    variant: "error",
                  });
                  return;
                }
                enqueueSnackbar(error?.response?.data?.detail, {
                  variant: "error",
                });
              }
            },
          });
          router.push("/admin/bids");
        },
        onError: (error) => {
          dispatch(setBackdropClose());
          if (error instanceof AxiosError) {
            if (error?.response?.data?.message) {
              enqueueSnackbar(error?.response?.data?.message, {
                variant: "error",
              });
              return;
            }
            enqueueSnackbar(error?.response?.data?.detail, {
              variant: "error",
            });
          }
        },
      });
    } catch (error) {
      dispatch(setBackdropClose());
      enqueueSnackbar("Something went wrong, please try again later.", {
        variant: "error",
      });
    }
  };

  // ############ REASON FOR REJECTION ############
  const [openReasonDialog, setOpenReasonDialog] = useState(false);
  const reasonRef = useRef<any>(null);

  const handleOpenReasonDialog = () => {
    setOpenReasonDialog(true);
  };
  const handleCloseReasonDialog = () => {
    setOpenReasonDialog(false);
  };

  // ########### REJECT BID ###########
  const handleRejectBid = (id: string, user: number) => {
    try {
      dispatch(setBackdropOpen());
      const form_data = {
        id,
        status: "Rejected",
        reason: reasonRef.current?.value,
        user,
      };
      updateAdminBidMutation.mutate(form_data, {
        onSuccess: (data: AxiosResponse<IUpdatedBidType>) => {
          queryClient.invalidateQueries({
            queryKey: ["adminBids", "singleAdminBid"],
          });
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid rejected",
            status: "Rejected",
            reason: reasonRef.current?.value,
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());
              enqueueSnackbar("Bid rejected successfully", {
                variant: "success",
              });
              queryClient.invalidateQueries({
                queryKey: ["singleAdminBid", "adminBidHistory"],
              });
            },
            onError: (error) => {
              dispatch(setBackdropClose());
              if (error instanceof AxiosError) {
                if (error?.response?.data?.message) {
                  enqueueSnackbar(error?.response?.data?.message, {
                    variant: "error",
                  });
                  return;
                }
                enqueueSnackbar(error?.response?.data?.detail, {
                  variant: "error",
                });
              }
            },
          });
          router.push("/admin/bids");
        },
        onError: (error) => {
          dispatch(setBackdropClose());
          if (error instanceof AxiosError) {
            if (error?.response?.data?.message) {
              enqueueSnackbar(error?.response?.data?.message, {
                variant: "error",
              });
              return;
            }
            enqueueSnackbar(error?.response?.data?.detail, {
              variant: "error",
            });
          }
        },
      });
    } catch (error) {
      dispatch(setBackdropClose());
      enqueueSnackbar("Something went wrong, please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-4">
        <IconButton
          color="primary"
          className="font-outfit hover:bg-signInBgHover bg-signInBg normal-case text-white"
          onClick={() => {
            router.push("/admin/bids");
            dispatch(setBackdropOpen());
          }}
        >
          <MdOutlineKeyboardBackspace />
        </IconButton>
        <div className="w-full">
          <Typography
            variant="h4"
            className="font-outfit text-center text-xl font-bold md:text-2xl"
          >
            Bid Details
          </Typography>
        </div>
      </div>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-screen-sm flex-col items-center justify-center space-y-4 rounded-md border border-gray-50 p-4 shadow-md"
      >
        <div className="flex w-full flex-col space-y-5">
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantity is required",
              // min: { value: 0, message: "Quantity must be greater than 0" },
              validate: (value) =>
                value > 0 || "Quantity must be greater than 0",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                variant="outlined"
                type="tel"
                error={errors.quantity ? true : false}
                helperText={errors.quantity ? errors.quantity.message : null}
                InputProps={{
                  endAdornment: (
                    <Typography className="font-outfit ml-2">MWh</Typography>
                  ),
                  "aria-label": "Quantity",
                  readOnly: true,
                }}
              />
            )}
          />
          <Controller
            name="start_time"
            control={control}
            rules={{
              required: "Start time is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Time"
                variant="outlined"
                defaultValue={"2021-10-20T10:30Z"}
                type="datetime-local"
                error={errors.start_time ? true : false}
                helperText={
                  errors.start_time
                    ? errors.start_time.message
                    : "24 hours time format"
                }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
          <Controller
            name="close_time"
            control={control}
            rules={{
              required: "Close time is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Close Time"
                variant="outlined"
                type="datetime-local"
                error={errors.close_time ? true : false}
                helperText={
                  errors.close_time
                    ? errors.close_time.message
                    : "24 hours time format"
                }
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              validate: (value) => value > 0 || "Price must be greater than 0",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                variant="outlined"
                type="tel"
                error={errors.price ? true : false}
                helperText={errors.price ? errors.price.message : null}
                InputProps={{
                  endAdornment: (
                    <Typography className="font-outfit ml-2 w-[5.8rem]">
                      EUR/MWh
                    </Typography>
                  ),
                  "aria-label": "Price",
                  readOnly: true,
                }}
              />
            )}
          />
        </div>
        <div className="py-4">
          {singleAdminBidData && singleAdminBidData.status === "Approved" && (
            <Typography
              variant="body2"
              className="font-outfit text-xs text-emerald-500"
            >
              You can&apos;t update this bid because it is already approved.
            </Typography>
          )}
          {singleAdminBidData && singleAdminBidData.status !== "Approved" && (
            <div className="flex items-center space-x-4">
              <Button
                variant="contained"
                color="primary"
                className="font-outfit bg-emerald-500 px-7 normal-case text-white hover:bg-emerald-800"
                disabled={isSubmitting}
                onClick={() => {
                  handleAcceptBid(
                    singleAdminBidData?.id as string,
                    singleAdminBidData?.user?.id as number,
                  );
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="font-outfit bg-red-500 px-7 normal-case text-white hover:bg-red-800"
                disabled={isSubmitting}
                onClick={() => {
                  handleOpenReasonDialog();
                }}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </form>
      <Dialog
        open={openReasonDialog}
        onClose={handleCloseReasonDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="font-outfit font-bold text-black">
          Reason for rejection
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="font-outfit pb-4 text-gray-700">
            Please enter the reason for rejecting the bid.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            required
            id="reason"
            name="reason"
            label="Reason"
            multiline
            rows={4}
            className="w-full"
            inputRef={reasonRef}
            onChange={(e) => {
              reasonRef.current.value = e.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseReasonDialog}
            className="font-outfit normal-case text-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseReasonDialog();
              handleRejectBid(
                singleAdminBidData?.id as string,
                singleAdminBidData?.user?.id as number,
              );
            }}
            className="font-outfit normal-case text-emerald-500"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminBidsDetailPage;