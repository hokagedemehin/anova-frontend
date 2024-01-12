"use client";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Footer = () => {
  // get the current year
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(dayjs().format("YYYY"));
  }, []);
  return (
    <div>
      <div className="bg-black">
        <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 grid grid-cols-2 gap-12 pt-10 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12">
            {/* logo and social link */}
            <div className="col-span-full lg:col-span-2">
              <Typography className={`mb-6 font-outfit text-gray-400 sm:pr-8`}>
                Anova Marketplace
              </Typography>
            </div>

            {/* <!-- link nav - start --> */}
            <div>
              <Typography className="mb-4 font-outfit font-bold uppercase tracking-widest text-gray-100">
                Privacy Policy
              </Typography>
            </div>
            {/* <!-- link nav - end --> */}

            {/* <!-- about us nav - start --> */}
            <div>
              <Typography className="mb-4 font-outfit font-bold uppercase tracking-widest text-gray-100">
                Cookies Policy
              </Typography>
            </div>
            {/* <!-- about us nav - end --> */}

            {/* <!-- nav - start --> */}
            <div className="col-span-2">
              <Typography className="mb-4 font-bold uppercase tracking-widest text-gray-100">
                Terms of use
              </Typography>
            </div>
            {/* <!-- nav - end --> */}
          </div>
          {/* signature */}
          <div className=" border-t border-gray-800 py-4 text-center text-sm text-gray-400">
            <Typography className=" font-outfit">
              &#169;{year} All rights reserved.
            </Typography>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
