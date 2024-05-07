"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { constant } from "../../../utils/constants";
import { checkIfPriceDiscounted } from "../../../utils/utilities";
import officon from "../../../images/officon.svg";

const ProductListCard = ({ product }) => {
  const [image, setImage] = useState(
    product.images && product?.images?.length != 0
      ? product?.images[0]?.url
      : constant.errImage
  );

  // const [hoveredProduct, setHoveredProduct] = useState("");

  return (
    <Link href={`/product/${product?.slug?.name}`}>
      <div
        className="w-full bg-white py-4 px-body  hover:hover:shadow-productCarouselShadow hover:shadow-white h-[19.75rem] md:flex md:flex-col rounded-br-3xl cursor-pointer  "

        // onMouseEnter={() => {
        //   setHoveredProduct(product?.id);
        // }}
        // onMouseLeave={() => {
        //   setHoveredProduct("");
        // }}
      >
        <div className="flex items-center justify-between">
          <div className="relative">
            <Image
              src={officon}
              alt=""
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit text-xs  flex gap-1 text-white font-medium">
              <span className="text-white">15%</span>
              <span className="text-white">OFF</span>
            </div>
          </div>

          <div>hearticon</div>
        </div>

        <div className="h-[9.75rem] ">
          <Image
            src={image}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
          />
        </div>
        <div className=// text-ellipsis overflow-hidden ... truncate
        " py-1">
          <h4
            className="text-sm h-10 font-medium "
            // text-ellipsis overflow-hidden ...
          >
            {product?.prodName}
          </h4>
        </div>
        {product?.rating && <div className="text-sm  ">Rating</div>}
        <div className="flex items-center mt-2 gap-2">
          {checkIfPriceDiscounted({
            discountedPrice: product?.discountedPrice,
            price: product?.prodPrice,
          }) && (
            <div className="text-ellipsis overflow-hidden ... truncate  ">
              <p className="text-ellipsis overflow-hidden ... truncate  text-black text-lg font-semibold tracking-tight">
                {constant.currency} {product?.discountedPrice.toFixed(2)}
              </p>
            </div>
          )}
          <div className="text-ellipsis overflow-hidden ... truncate  ">
            <p className="text-ellipsis overflow-hidden ... truncate   line-through text-sm text-[#ADADAD]">
              {constant.currency} {product?.prodPrice}
            </p>
          </div>

          {/* <div
            className={`flex-1 flex flex-col justify-end ${
              hoveredProduct === product?.id ? "visible" : "invisible"
            }`}
          >
            <div className="w-full bg-highlight flex items-center justify-center py-2 mt-2 ">
              <h6 className="text-white"> Add To Cart</h6>
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductListCard;
