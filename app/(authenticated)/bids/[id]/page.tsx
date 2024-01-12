"use client";
import { useCloseBackdrop } from "@/hooks/backdrop";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useCreateBidHistory,
  useSingleBid,
  useUpdateBid,
} from "@/hooks/bidHooks";
import { ICreateBidTypes, ICreatedBidType } from "@/interface/bidsTypes";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "@/shared/store/store";
import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const BidUpdate = () => {
  useCloseBackdrop();
  const { id } = useParams();
  const { singleBidData } = useSingleBid(id);
  const dispatch = useAppDispatch();
  const updateBidMutation = useUpdateBid();
  const createBidHistoryMutation = useCreateBidHistory();
  const queryClient = useQueryClient();

  const router = useRouter();

  // ***** REACT HOOK FORM ***** //
  const {
    control,
    handleSubmit,
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
    if (singleBidData) {
      setValue("quantity", singleBidData.quantity);
      setValue("price", singleBidData.price);
      setValue(
        "start_time",
        dayjs(singleBidData.start_time).format("YYYY-MM-DDTHH:mm"),
      );
      setValue(
        "close_time",
        dayjs(singleBidData.close_time).format("YYYY-MM-DDTHH:mm"),
      );
    }

    return () => {
      reset();
    };
  }, [setValue, singleBidData, reset]);

  const onSubmit: SubmitHandler<ICreateBidTypes> = async (data) => {
    if (!singleBidData) return;
    if (singleBidData?.status === "Approved") return;
    try {
      const update_data = {
        id,
        ...data,
        user: singleBidData?.user?.id,
      };
      dispatch(setBackdropOpen());
      updateBidMutation.mutate(update_data, {
        onSuccess: (data: AxiosResponse<ICreatedBidType>) => {
          queryClient.invalidateQueries({
            queryKey: ["bids", "bidHistory"],
          });
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid updated",
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());

              enqueueSnackbar("Bid updated successfully", {
                variant: "success",
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
              }
              enqueueSnackbar("Something went wrong", {
                variant: "error",
              });
            },
          });

          router.push("/bids");
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
          }
          enqueueSnackbar("Something went wrong", {
            variant: "error",
          });
        },
      });
      reset();
    } catch (error) {
      dispatch(setBackdropClose());
      enqueueSnackbar("Something went wrong", {
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
            router.push("/bids");
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
            Update Bid
          </Typography>
        </div>
      </div>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                    readOnly: singleBidData?.status === "Approved",
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
                    readOnly: singleBidData?.status === "Approved",
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
                    readOnly: singleBidData?.status === "Approved",
                  }}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                validate: (value) =>
                  value > 0 || "Price must be greater than 0",
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
                    readOnly: singleBidData?.status === "Approved",
                  }}
                />
              )}
            />
          </div>
          <div className="py-4">
            {singleBidData && singleBidData.status === "Approved" && (
              <Typography
                variant="body2"
                className="font-outfit text-xs text-emerald-500"
              >
                You can&apos;t update this bid because it is already approved.
              </Typography>
            )}
            {singleBidData && singleBidData.status !== "Approved" && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="font-outfit hover:bg-signInBgHover bg-signInBg px-7 normal-case text-white"
                disabled={isSubmitting}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidUpdate;
