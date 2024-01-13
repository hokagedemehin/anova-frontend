"use client";

import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import { useAppDispatch } from "@/shared/store/store";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React, { useState } from "react";
import { useCloseBackdrop } from "@/hooks/backdrop";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useSignUp } from "@/hooks/authHooks";
import { enqueueSnackbar } from "notistack";
import { setCookie } from "nookies";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}

const SignupPage = () => {
  const dispatch = useAppDispatch();
  useCloseBackdrop();
  const router = useRouter();

  const handleLinksClick = () => {
    dispatch(setBackdropOpen());
  };
  const signUpMutation = useSignUp();

  // ***** REACT HOOK FORM ***** //
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: "",
    },
  });
  // **** SHOW PASSWORD **** //
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      dispatch(setBackdropOpen());
      signUpMutation.mutate(data, {
        onSuccess: (data: any) => {
          setCookie(null, "anova_token", data?.data?.key, {
            maxAge: 30 * 24 * 60 * 60,
            sameSite: "lax",
          });
          router.push("/bids");
          window.location.reload();
          reset();
          dispatch(setBackdropClose());
          enqueueSnackbar("Sign up successfully", { variant: "success" });
        },
        onError: (error) => {
          dispatch(setBackdropClose());
          if (error instanceof AxiosError) {
            if (
              error?.response?.data?.email ||
              error?.response?.data?.password1 ||
              error?.response?.data?.non_field_errors
            ) {
              if (error?.response?.data?.email) {
                enqueueSnackbar(error?.response?.data?.email[0], {
                  variant: "error",
                });
              }
              if (error?.response?.data?.password1) {
                error?.response?.data?.password1.map((item: string) => {
                  enqueueSnackbar(item, {
                    variant: "error",
                  });
                });
              }
              if (error?.response?.data?.non_field_errors) {
                enqueueSnackbar(error?.response?.data?.non_field_errors[0], {
                  variant: "error",
                });
              }
            } else {
              enqueueSnackbar("Something went wrong, please try again later.", {
                variant: "error",
              });
            }
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
      <div className="flex w-full flex-col items-center justify-center p-4 ">
        <Typography
          variant="h4"
          className="text-center font-outfit text-2xl font-bold md:text-left md:text-3xl"
        >
          Welcome Here
        </Typography>
        <div className="mt-4 h-full rounded-md bg-white p-4 shadow-md">
          <form
            className="flex h-full w-full flex-col justify-between "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <Typography variant="body2" className="font-outfit font-bold">
                  First Name
                </Typography>
                <Controller
                  name="first_name"
                  control={control}
                  rules={{
                    required: "First name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      size="small"
                      error={!!errors.first_name}
                      helperText={
                        (
                          <span className="font-outfit text-xs text-red-500">
                            {errors.first_name?.message}
                          </span>
                        ) ?? " "
                      }
                    />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Typography variant="body2" className="font-outfit font-bold">
                  Last Name
                </Typography>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{
                    required: "Last name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      // placeholder="Last Name"
                      size="small"
                      error={!!errors.last_name}
                      helperText={
                        (
                          <span className="font-outfit text-xs text-red-500">
                            {errors.last_name?.message}
                          </span>
                        ) ?? " "
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-3 flex flex-col space-y-1">
              <Typography variant="body2" className="font-outfit font-bold">
                Email
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Email"
                    size="small"
                    type="email"
                    error={!!errors.email}
                    helperText={
                      (
                        <span className="font-outfit text-xs text-red-500">
                          {errors.email?.message}
                        </span>
                      ) ?? " "
                    }
                  />
                )}
              />
            </div>
            <div className=" mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div className=" flex flex-col space-y-1">
                <Typography variant="body2" className="font-outfit font-bold">
                  Password
                </Typography>
                <Controller
                  name="password1"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter and one number",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Password"
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleShowPassword}>
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon className="text-lg md:text-2xl" />
                            ) : (
                              <VisibilityOutlinedIcon className="text-lg md:text-2xl" />
                            )}
                          </IconButton>
                        ),
                      }}
                      error={!!errors.password1}
                      helperText={
                        (
                          <span className="font-outfit text-xs text-red-500">
                            {errors.password1?.message}
                          </span>
                        ) ?? " "
                      }
                    />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Typography variant="body2" className="font-outfit font-bold">
                  Confirm Password
                </Typography>
                <Controller
                  name="password2"
                  control={control}
                  rules={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password1") ||
                      "The passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      size="small"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleShowPassword}>
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon className="text-lg md:text-2xl" />
                            ) : (
                              <VisibilityOutlinedIcon className="text-lg md:text-2xl" />
                            )}
                          </IconButton>
                        ),
                      }}
                      error={!!errors.password2}
                      helperText={
                        (
                          <span className="font-outfit  text-xs text-red-500">
                            {errors.password2?.message}
                          </span>
                        ) ?? " "
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <Button
                type="submit"
                color="primary"
                className={`w-full transform   transition duration-500 ease-in-out   md:w-[20rem] ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-300 opacity-50"
                    : "bg-signInBg text-white hover:bg-signInBgHover"
                }`}
                disabled={isSubmitting}
              >
                <Typography
                  variant="body2"
                  className="font-outfit font-bold normal-case"
                >
                  Sign up
                </Typography>
              </Button>
            </div>
          </form>
          <div className="">
            <div className="my-4 w-full">
              <Divider />
            </div>
            <div className="">
              <Typography
                variant="body2"
                className="text-center font-outfit text-xs font-semibold"
              >
                Or continue with
              </Typography>
              <div className="mt-4 flex flex-col items-center">
                <GoogleLoginButton
                  onClick={() => {
                    window.location.assign(
                      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&prompt=consent&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`,
                    );
                  }}
                >
                  <Typography
                    variant="body2"
                    className="font-outfit font-bold normal-case"
                  >
                    Login with Google
                  </Typography>
                </GoogleLoginButton>
              </div>
            </div>

            <div className="mt-4  flex items-center justify-center">
              <Typography
                variant="body2"
                className="font-outfit text-sm text-gray-500"
              >
                Already have an account?
              </Typography>
              <Link
                href="/login"
                onClick={handleLinksClick}
                className="ml-2 font-outfit text-sm normal-case text-signInAlt"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
