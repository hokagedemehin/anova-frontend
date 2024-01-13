"use client";
import { useProfile } from "@/hooks/authHooks";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/shared/store/store";
import { setBackdropOpen } from "@/shared/store/slices/backdropSlice";
import { routes } from "@/shared/constants/routes";
import { setCookie } from "nookies";
import { post_requests } from "@/shared/helpers/axios_helpers";
import Image from "next/image";
import logo_round from "@/public/logo_round.png";
const HeaderComp = () => {
  const { profileData } = useProfile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const handleNavLink = (link: string) => {
    if (pathname !== link) {
      dispatch(setBackdropOpen());
      return;
    }
  };

  const [headerColor, setHeaderColor] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 50) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    };
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleLogout = async () => {
    // destroyCookie(null, "anova_token");
    await post_requests(routes.logout, {});
    setCookie(null, "anova_token", "", {
      maxAge: -1,
    });
    window.location.href = "/";
    handleNavLink(routes.home_page);
  };
  return (
    <header
      className={`${
        !headerColor
          ? "bg-transparent"
          : "border border-x-0 border-b-2 border-t-0 border-gray-100 bg-white bg-opacity-60 backdrop-blur-lg backdrop-filter "
      } fixed z-10 flex w-full py-2 transition duration-300 ease-in-out`}
    >
      <Container maxWidth="2xl" className=" flex items-center justify-between ">
        <Link href="/">
          <Image
            src={logo_round}
            alt="logo"
            width={40}
            height={40}
            className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
            placeholder="blur"
          />
        </Link>
        <div className="flex space-x-2 md:space-x-3">
          <Link
            href={routes.home_page}
            onClick={() => handleNavLink(routes.home_page)}
            className="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-100 "
          >
            <Typography className="font-outfit text-sm font-bold ">
              Home
            </Typography>
          </Link>
          <Link
            href={routes.my_bids_page}
            onClick={() => handleNavLink(routes.my_bids_page)}
            className="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-100 "
          >
            <Typography className="font-outfit text-sm font-bold">
              My Bids
            </Typography>
          </Link>
          {profileData && profileData?.role === "admin" && (
            <Link
              href={routes.admin_bids_page}
              onClick={() => handleNavLink(routes.admin_bids_page)}
              className="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-100 "
            >
              <Typography className="font-outfit text-sm font-bold">
                Admin
              </Typography>
            </Link>
          )}
          {profileData ? (
            <Link
              href={routes.home_page}
              onClick={() => handleLogout()}
              className="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-100 "
            >
              <Typography className="font-outfit text-sm font-bold">
                Logout
              </Typography>
            </Link>
          ) : (
            <Link
              href={routes.login_page}
              onClick={() => handleNavLink(routes.login_page)}
              className="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-100 "
            >
              <Typography className="font-outfit text-sm font-bold">
                Login
              </Typography>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default HeaderComp;
