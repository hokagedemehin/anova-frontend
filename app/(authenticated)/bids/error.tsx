"use client"; // Error components must be Client Components

import Image from "next/image";
import { useEffect } from "react";
import ErrorImage from "@/public/ErrorImage.png";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Error({
  error, // reset,
}: {
  error: Error & { digest?: string };
  // reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src={ErrorImage}
        alt="Error"
        width={500}
        height={500}
        className="h-[20rem] w-full object-contain"
        placeholder="blur"
      />
      <Typography variant="h5" className="font-outfit text-center">
        Something went wrong on the server.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="font-outfit bg-signInBg hover:bg-signInBgHover mt-2 normal-case "
        onClick={() => router.push("/")}
      >
        Go Back
      </Button>
    </div>
  );
}
