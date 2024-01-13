"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { enqueueSnackbar } from "notistack";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CustomBackdrop from "@/components/backdrop/CustomBackdrop";
import { useCloseBackdrop } from "@/hooks/backdrop";
import { useLogin } from "@/hooks/authHooks";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/store/store";
import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import { GithubLoginButton } from "react-social-login-buttons";
import { AxiosError } from "axios";
import Link from "next/link";

interface IFormInput {
  email: string;
  password: string;
}

const LoginScreen = () => {
  useCloseBackdrop();
  const dispatch = useAppDispatch();
  const router = useRouter();
  // **** SHOW PASSWORD **** //
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleLinksClick = () => {
    dispatch(setBackdropOpen());
  };

  // ***** REACT HOOK FORM ***** //
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLogin();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      dispatch(setBackdropOpen());
      mutation.mutate(data, {
        onSuccess: (data: any) => {
          setCookie(null, "anova_token", data?.data?.key, {
            // path: "/",
            maxAge: 30 * 24 * 60 * 60,
            sameSite: "lax",
          });
          router.push("/bids");
          window.location.reload();
          // window.location.href = "/bids";
          reset();

          enqueueSnackbar("Login successfully", { variant: "success" });
        },
        onError: (error) => {
          // console.error(error);
          if (error instanceof AxiosError) {
            if (error?.response?.data?.non_field_errors) {
              enqueueSnackbar(error?.response?.data?.non_field_errors[0], {
                variant: "error",
              });
            } else {
              enqueueSnackbar("Something went wrong, please try again later.", {
                variant: "error",
              });
            }
          }
          dispatch(setBackdropClose());
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
      <CustomBackdrop />
      <div className="flex w-full flex-col items-center justify-center p-4 ">
        <Typography
          variant="h4"
          className="text-center font-outfit text-2xl font-bold md:text-3xl"
        >
          Welcome Back
        </Typography>
        <div className="mt-4 h-full rounded-md bg-white p-4 shadow-md md:px-6">
          <form
            className="flex h-full w-full flex-col justify-between md:px-6 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-1">
              <Typography variant="body2" className="font-outfit font-bold">
                Email
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value:
                      // eslint-disable-next-line no-useless-escape
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    type="email"
                    required
                    variant="outlined"
                    size="small"
                    placeholder="Enter your email"
                    {...field}
                    error={!!errors.email}
                    helperText={
                      <span className="font-outfit text-xs text-red-500">
                        {errors.email?.message}
                      </span>
                    }
                  />
                )}
              />
              {/* {errors.email && (
                
              )} */}
            </div>
            <div className="mt-3 flex flex-col space-y-1">
              <Typography variant="body2" className="font-outfit font-bold">
                Password
              </Typography>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  // minLength: {
                  //   value: 8,
                  //   message: "Password must be at least 8 characters",
                  // },
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
                    error={!!errors.password}
                    helperText={
                      <span className="font-outfit text-xs text-red-500">
                        {errors.password?.message}
                      </span>
                    }
                  />
                )}
              />
              {/* <div className="mt-2 flex justify-end">
                <Link href="/forgot-password" onClick={handleLinksClick}>
                  <Typography
                    variant="body2"
                    className="font-outfit text-xs text-gray-500 hover:text-gray-700"
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </div> */}
            </div>
            <div className="mt-8 flex flex-col items-center">
              <Button
                type="submit"
                color="primary"
                className={`w-full transform  transition duration-500 ease-in-out   md:w-[20rem] ${
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
                  Log In
                </Typography>
              </Button>
            </div>
          </form>
          <div className="">
            <Divider className="my-4" />
          </div>
          <div className="">
            <Typography
              variant="body2"
              className="text-center font-outfit text-xs font-semibold"
            >
              Or continue with
            </Typography>
            <div className="mt-4 flex flex-col items-center">
              <GithubLoginButton
                className="w-full transform  bg-[#24292e] text-white transition   duration-500 ease-in-out hover:bg-[#3d4852] md:w-[20rem]"
                onClick={() => {
                  // fetch(
                  //   "https://github.com/login/oauth/authorize?client_id=2cbe7be3c82bc87b718d&redirect_uri=http://localhost:3000/verify&scope=user",
                  //   {
                  //     method: "GET",
                  //     headers: {
                  //       Accept: "application/json",
                  //       "Content-Type": "application/json",
                  //     },
                  //   },
                  // )
                  //   .then((res) => {
                  //     console.log("res", res);
                  //   })
                  //   .catch((err) => {
                  //     console.log("err", err);
                  //   });
                  window.location.assign(
                    // "https://github.com/login/oauth/authorize?client_id=2cbe7be3c82bc87b718d&redirect_uri=http://localhost:3000/verify&scope=user",
                    `${process.env.NEXT_PUBLIC_GITHUB_URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user`,
                  );
                }}
              >
                <Typography
                  variant="body2"
                  className="font-outfit font-bold normal-case"
                >
                  Login with Github
                </Typography>
              </GithubLoginButton>
            </div>
          </div>
          <div className="mt-4  flex items-center justify-center">
            <Typography
              variant="body2"
              className="font-outfit text-sm text-gray-500"
            >
              Don&apos;t have an account?
            </Typography>
            <Link
              href="/signup"
              onClick={handleLinksClick}
              className="ml-2 font-outfit  text-sm normal-case text-signInAlt"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
