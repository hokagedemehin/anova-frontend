"use client";
import { useCloseBackdrop } from "@/hooks/backdrop";
import CustomBackdrop from "@/components/backdrop/CustomBackdrop";
import { Button, Divider, Typography } from "@mui/material";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image";
import callBg from "@/public/callBg.png";
import companyBg from "@/public/companyBg.png";

export default function Home() {
  useCloseBackdrop();
  // https://res.cloudinary.com/luvely/image/upload/v1705015713/anova/heroBg_nrpj0a.png
  return (
    <main className="flex min-h-screen flex-col">
      <CustomBackdrop />
      <div className="h-[50vh] bg-[url('https://res.cloudinary.com/luvely/image/upload/v1705017159/anova/Rectangle_7_kcrczp.png')] bg-cover bg-no-repeat">
        <div className="flex h-full flex-col items-center justify-center border ">
          <Typography
            variant="h4"
            className="text-center font-outfit text-base text-white md:text-xl"
          >
            Give electricity straight to the people
          </Typography>
          <Typography
            variant="h1"
            className="text-center font-outfit text-3xl font-extrabold text-white md:text-5xl"
          >
            Your best energy marketplace
          </Typography>
        </div>
      </div>
      <div className="bg-[#F6F7F7] px-6 py-10">
        <div className="mx-auto w-full max-w-screen-xl  ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <CountUp
                end={3200}
                duration={3}
                suffix=" +"
                className="text-center font-outfit text-2xl font-semibold text-black md:text-4xl"
              />
              <Typography
                variant="h4"
                className="text-center font-outfit text-base font-semibold text-gray-500 md:text-xl"
              >
                Happy Customers
              </Typography>
            </div>
            <div className="flex flex-col items-center">
              <CountUp
                end={1200}
                duration={3}
                suffix=" +"
                className="text-center font-outfit text-2xl font-semibold text-black md:text-4xl"
              />
              <Typography
                variant="h4"
                className="text-center font-outfit text-base font-semibold text-gray-500 md:text-xl"
              >
                Power purchases made
              </Typography>
            </div>
            <div className="flex flex-col items-center">
              <CountUp
                end={400}
                duration={3}
                suffix=" +"
                className="text-center font-outfit text-2xl font-semibold text-black md:text-4xl"
              />
              <Typography
                variant="h4"
                className="text-center font-outfit text-base font-semibold text-gray-500 md:text-xl"
              >
                Energy Providers
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 px-3 py-8 md:flex-row">
        <div className="flex flex-col space-y-3">
          <Typography
            variant="h6"
            className="text-left font-outfit text-base font-medium md:text-xl"
          >
            Get a business energy bid
          </Typography>
          <Typography
            variant="body2"
            className="w-[80%] text-left font-outfit text-xs font-light text-gray-400 md:text-sm"
          >
            Fixed-price plans to fully flexible contracts, we have business gas
            and electricity tarrifs that suit every business size and need.
          </Typography>
          <Typography
            variant="body2"
            className="w-[80%] text-left font-outfit text-xs font-light text-gray-400 md:text-sm"
          >
            We work with a range of energy suppliers to bring you the best
            business energy deals on the market. We can help you find the right
            business energy deal for your business.
          </Typography>
          <div className="mt-5">
            <Link href="/bids">
              <Button
                variant="contained"
                className="bg-[#FF5C00] font-outfit normal-case text-white hover:bg-[#ab4103]"
              >
                Get a business energy bid
              </Button>
            </Link>
          </div>
        </div>
        <Image
          src={callBg}
          alt="callBg"
          width={400}
          height={400}
          placeholder="blur"
          className="h-auto w-[20rem] object-cover md:h-[20rem] md:w-[25rem] md:object-contain"
        />
      </div>
      <div className="space-y-3 bg-[#002D72] px-6 py-10">
        <Typography
          variant="h6"
          className="text-center font-outfit text-xl font-medium text-white md:text-3xl"
        >
          Powering the renewable energy economy
        </Typography>
        <div className="mx-auto w-[80%]">
          <Typography
            variant="body2"
            className="text-center font-outfit text-xs font-light text-gray-400 md:text-sm"
          >
            Anova marketplace is the leading energy marketplace and provider of
            renewable energy, supplying over 1.5 million homes and businesses
            with green electricity and green gas.
          </Typography>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-center">
          <div className=" rounded-sm bg-[#2A4570] ">
            <div className="flex flex-col items-center justify-center px-8 pt-4">
              <Image
                src={companyBg}
                alt="companyBg"
                width={200}
                height={200}
                placeholder="blur"
                className="h-auto w-[3rem] object-cover md:h-[5rem] md:w-[5rem] md:object-contain"
              />
              <Typography
                variant="body2"
                className="py-3 text-center font-outfit text-xl font-medium text-white md:text-2xl"
              >
                Energy buyers & sellers
              </Typography>
            </div>
            <Divider className="mx-2 mb-5 mt-2 bg-white" />
            <div className="mx-auto flex flex-col items-center justify-center px-8 pb-4 md:w-[70%]">
              <Typography
                variant="body2"
                className="text-center font-outfit text-xs font-light text-gray-400 md:text-sm"
              >
                Find high-value, low-risks energy contracts and bids from
                verified energy buyers and sellers.
              </Typography>
            </div>
          </div>
          <div className=" rounded-sm bg-[#2A4570] ">
            <div className="flex flex-col items-center justify-center px-8 pt-4">
              <Image
                src={companyBg}
                alt="companyBg"
                width={200}
                height={200}
                placeholder="blur"
                className="h-auto w-[3rem] object-cover md:h-[5rem] md:w-[5rem] md:object-contain"
              />
              <Typography
                variant="body2"
                className="py-3 text-center font-outfit text-xl font-medium text-white md:text-2xl"
              >
                Energy buyers & sellers
              </Typography>
            </div>
            <Divider className="mx-2 mb-5 mt-2 bg-white" />
            <div className="mx-auto flex flex-col items-center justify-center px-8 pb-4 md:w-[70%]">
              <Typography
                variant="body2"
                className="text-center font-outfit text-xs font-light text-gray-400 md:text-sm"
              >
                Find high-value, low-risks energy contracts and bids from
                verified energy buyers and sellers.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
