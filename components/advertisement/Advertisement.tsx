"use client";
import React from "react";
import Image from "next/image";
// import advestisingImg from "../../images/Group 34289.png";
import advertise1 from "../../images/advertise1.jpg";
import advertise2 from "../../images/advertise2.jpg";

const Advertisement = () => {
  return (
    <>
      <div className=" w-full mt-0 px-[1.5%]    z-30 ">
        <div className="  w-full  flex  items-center sm:gap-2  ">
          <div className="">
            <Image
              src={advertise1}
              alt=""
              width={1000}
              height={1000}
              className="flex-1 lg:h-[25rem] md:h-[15rem] h-[10rem] object-cover "
            />
          </div>
          <div className=" ">
            <Image
              src={advertise2}
              alt=""
              width={1000}
              height={1000}
              className="flex-1 lg:h-[25rem] md:h-[15rem] h-[10rem] object-cover "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Advertisement;
