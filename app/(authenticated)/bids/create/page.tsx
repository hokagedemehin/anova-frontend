"use client";
import { ICreateBidTypes, ICreatedBidType } from "@/interface/bidsTypes";
import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/store/store";
import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useCreateBid, useCreateBidHistory } from "@/hooks/bidHooks";
import { useProfile } from "@/hooks/authHooks";
import { useCloseBackdrop } from "@/hooks/backdrop";

const CreateBid = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useCloseBackdrop();

  const { profileData } = useProfile();
  const createBidMutation = useCreateBid();
  const createBidHistoryMutation = useCreateBidHistory();

  // ***** REACT HOOK FORM ***** //
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateBidTypes>({
    defaultValues: {
      quantity: 0,
      start_time: "",
      close_time: "",
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<ICreateBidTypes> = async (data) => {
    try {
      const form_data = {
        user: profileData?.pk,
        ...data,
      };
      dispatch(setBackdropOpen());
      createBidMutation.mutate(form_data, {
        onSuccess: (data: AxiosResponse<ICreatedBidType>) => {
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid created",
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());
              enqueueSnackbar("Bid created successfully", {
                variant: "success",
              });
              // router.push("/bids");
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
            enqueueSnackbar(error?.response?.data?.detail, {
              variant: "error",
            });
          }
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
      <Typography
        variant="h4"
        className="text-center font-outfit text-xl font-bold md:text-2xl"
      >
        Create Bid
      </Typography>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex max-w-screen-sm flex-col items-center justify-center space-y-4 rounded-md border border-gray-50 bg-white p-4 shadow-md"
        >
          <div className="flex w-full flex-col space-y-5">
            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Quantity is required",
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
                      <Typography className="ml-2 font-outfit">MWh</Typography>
                    ),
                    "aria-label": "Quantity",
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
                      <Typography className="ml-2 w-[5.8rem] font-outfit">
                        EUR/MWh
                      </Typography>
                    ),
                    "aria-label": "Price",
                  }}
                />
              )}
            />
          </div>
          <div className="py-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="bg-signInBg px-7 font-outfit normal-case text-white hover:bg-signInBgHover"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBid;
