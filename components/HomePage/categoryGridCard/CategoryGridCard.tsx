import React from "react";
import Image from "next/image";
import { constant } from "../../../utils/constants";
import Link from "next/link";

const CategoryGridCard = ({ cat, path }) => {
  // console.log(cat,"cat");

  return (
    <Link
      href={
        path
          ? path
          : cat?.isSubcategories
          ? `/category/${cat?.slug?.name}`
          : `#`
      }
    >
      <div className="relative cursor-pointer ">
        <Image
          src={cat?.image?.url || cat?.image?.mob || constant?.errImage}
          alt=""
          width={1000}
          height={1000}
          className="h-[250px] md:h-[290px] lg:h-[310px]  "
        />
        <div className="absolute bottom-[22px] text-white  left-1/2 transform -translate-x-1/2    w-[85%]">
          <div className="font-semibold text-lg">{cat.name}</div>
          {/* <div className="font-semibold text-xs">3 for Rs. 2,799</div> */}
        </div>
      </div>
    </Link>
  );
};

export default CategoryGridCard;
