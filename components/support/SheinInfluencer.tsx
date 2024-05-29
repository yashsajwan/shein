"use client";
import React from "react";
import banner from "../../images/influence.png";
import benefits from "../../images/benefits.png";
import steps from "../../images/steps.png";
import Image from "next/image";
import Link from "next/link";

const SheinInfluencer = () => {
  return (
    <>
      <Image src={banner} alt="" className="w-full h-auto object-cover" />

      <div className="flex flex-col justify-center items-center text-md sm:text-xl md:text-2xl lg:text-4xl">
        <div className="text-center  font-bold my-2 md:my-3 bg-[#e6e6e6]">
          Then get ready for influenced!
        </div>
        <Link href={"#"} className="text-center  font-bold my-2 md:my-3">
          <div className="bg-[#ff69cc] px-6 py-1 md:px-10 md:py-2 rounded-full">
            SIGN UP
          </div>
        </Link>
      </div>

      <div className="bg-[#e6e6e6] my-6 lg:my-10 text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl">
        BENEFITS YOU CAN GET
      </div>

      <Image src={benefits} alt="" className="w-full h-auto object-cover" />

      <div className="bg-[#e6e6e6] my-6 lg:my-10 text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl">
        JOIN IN JUST 4 STEPS
      </div>

      <Image src={steps} alt="" className="w-full h-auto object-cover" />

      <div className="bg-[#e6e6e6] my-6 lg:my-10 text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl">
        {" "}
        LET’S COLLABORATE
      </div>
      <div className="flex flex-col justify-center items-center text-md sm:text-xl md:text-2xl lg:text-4xl">
        <Link href={"#"} className="text-center  font-bold mb-2 md:mb-3">
          <div className="bg-[#ff69cc] px-6 py-1 md:px-10 md:py-2 rounded-full">
            SUBMIT
          </div>
        </Link>
      </div>
    </>
  );
};

export default SheinInfluencer;
