"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import { useGithubLogin } from "@/hooks/authHooks";
import { setCookie } from "nookies";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const VerifyLogin = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  console.log("code", code);
  const githubMutation = useGithubLogin();
  const router = useRouter();
  useEffect(() => {
    // (async () => {
    //   fetch(
    //     `https://github.com/login/oauth/access_token?client_id=2cbe7be3c82bc87b718d&amp;client_secret=e48ec6c6524545d7ce2bf465ffc2d9567ad2fb0a&amp;code=${code}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         accept: "application/json",
    //         // "accept-language": "en-US,en;q=0.9,vi;q=0.8",
    //         "content-type": "application/json",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-site",
    //       },
    //     },
    //   )
    //     .then((response) => {
    //       console.log(response);
    //       // return response.json();
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // })();

    if (code) {
      // do something
      const form_data = {
        code: code,
      };

      githubMutation.mutate(form_data, {
        onSuccess: (data: any) => {
          console.log("data", data);
          setCookie(null, "anova_token", data?.data?.key, {
            // path: "/",
            maxAge: 30 * 24 * 60 * 60,
            sameSite: "lax",
          });
          router.push("/bids");
          window.location.reload();

          enqueueSnackbar("Login successfully", { variant: "success" });
        },
        onError: (error) => {
          console.error(error);
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
          enqueueSnackbar("Something went wrong, please try again later.", {
            variant: "error",
          });
        },
      });
    }
    if (code === null) {
      router.push("/login");
    }

    return () => {};
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
