"use client";
import Image from "next/image";
import React, { useState } from "react";
import { constant } from "../../../utils/constants";

const BrandCard = ({ brand }: any) => {
  const [image, setImage] = useState(brand?.image?.url || constant.errImage);
  return (
    <div className="relative flex flex-col gap-2 h-[15rem] items-center justify-start shadow-md rounded-lg cursor-pointer w-64">
      <div className="h-[200px] ">
        <Image
          alt={brand?.name || ""}
          src={image}
          onError={() => {
            setImage(constant.errImage);
          }}
          width={1000}
          height={1000}
          className="h-full object-fit"
        />
      </div>
      {/* Overlapping section */}
      <div className="absolute w-full bottom-[5px] left-0 flex justify-center">
        <div className="py-6 bg-white rounded-full w-[95%] flex justify-center opacity-90">
          <h4 className="text-lg font-semibold">{brand?.name}</h4>
        </div>
      </div>
    </div>
  );
};
export default BrandCard;