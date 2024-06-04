"use client";
import React from "react";
import Image from "next/image";
// import advestisingImg from "../../images/Group 34289.png";
import referandearn from "../../images/referandearn.png";

const Advertisement = () => {
  return (
    <>
      <div className=" w-full mt-0 px-[1.5%] relative">
        {/* <div className="bottom-[20%] right-[20%] absolute text-white bg-black px-3 py-2 rounded-full">
        https://shein-amber.vercel.app/
        </div> */}
        <Image
          src={referandearn}
          alt=""
          width={1000}
          height={1000}
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default Advertisement;
