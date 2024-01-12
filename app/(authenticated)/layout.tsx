import React from "react";
import { redirect } from "next/navigation";
import CustomBackdrop from "@/components/backdrop/CustomBackdrop";
import { cookies } from "next/headers";

async function getData() {
  const cookie = cookies();
  const token = cookie.get("anova_token");
  try {
    if (!token?.value) {
      redirect("/login");
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dj-rest-auth/user/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }

      return res.json();
    }
  } catch (error) {
    // console.error("there is an error");
  }
}

export default async function BidsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  if (!data) {
    redirect("/login");
  }
  return (
    <main className=" bg-background relative mx-auto flex min-h-screen max-w-screen-xl flex-col pt-[4rem]">
      <CustomBackdrop />

      <div className=" w-full px-3 py-2">{children}</div>
    </main>
  );
}
