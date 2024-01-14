"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
// import { useGoogleLogins } from "@/hooks/authHooks";
// import { setCookie } from "nookies";
import { enqueueSnackbar } from "notistack";
// import { AxiosError } from "axios";

const VerifyLogin = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  console.log("code", code);
  // const googleMutation = useGoogleLogins();
  const router = useRouter();
  useEffect(() => {
    if (code) {
      // const form_data = { code };
      try {
        // googleMutation.mutate(form_data, {
        //   onSuccess: (data: any) => {
        //     enqueueSnackbar("Login successfully", { variant: "success" });
        //     setCookie(null, "anova_token", data?.data?.key, {
        //       // path: "/",
        //       maxAge: 30 * 24 * 60 * 60,
        //       sameSite: "lax",
        //     });
        //     router.push("/bids");
        //     window.location.reload();
        //   },
        //   onError: (error) => {
        //     if (error instanceof AxiosError) {
        //       if (error?.response?.data?.non_field_errors) {
        //         enqueueSnackbar(error?.response?.data?.non_field_errors[0], {
        //           variant: "error",
        //         });
        //       } else {
        //         enqueueSnackbar(
        //           "Something went wrong, please try again later.",
        //           {
        //             variant: "error",
        //           },
        //         );
        //       }
        //     }
        //     router.push("/login");
        //   },
        // });
      } catch (error) {
        enqueueSnackbar("Something went wrong, please try again later.", {
          variant: "error",
        });
      }
    } else if (code === null) {
      router.push("/login");
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Typography variant="h4" className="font-outfit text-2xl font-bold">
        verifying login...
      </Typography>
    </div>
  );
};

export default VerifyLogin;
