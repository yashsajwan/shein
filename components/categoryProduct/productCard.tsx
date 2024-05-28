"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  checkIfPriceDiscounted,
  getDiscountedPercentage,
} from "../../utils/utilities";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import discountBg from "../../images/Vector (2).svg";
import btnBg from "../../images/image (8).png";
import FlatIcon from "../flatIcon/flatIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserData,
  getUserWishlist,
  removeFromWishListHandler,
  moveToWishListHandler,
} from "../../utils/databaseService";
import { toast } from "react-toastify";

const ProductCard = ({ product, idx = Math.random(), mx }: any) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState(
    product.images && product?.images?.length != 0
      ? product?.images[0]?.url
      : product?.coverPic?.url
      ? product?.coverPic?.url
      : constant.errImage
  );
  const matchesSm = useMediaQuery("(min-width:640px)");
  const [hoveredProduct, setHoveredProduct] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),

    // keepPreviousData: true,
    // enabled: isClient,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
  });
  // console.log(product,"slug name");

  return (
    <div
      className={`flex flex-col mx-1 sm:mx-1.5 md:mx-2.5 relative z-10  bordered-shape overflow-hidden `}
      key={product?.id || idx || Math.random().toString()}
      onMouseEnter={() => {
        setHoveredProduct(product?.id);
      }}
      onMouseLeave={() => {
        setHoveredProduct("");
      }}
    >
      <div
        className={`absolute z-30 right-[10px] top-[10px] sm:right-[15px] sm:top-[12.5px] md:right-[20px] md:top-[15px] ${
          hoveredProduct === product?.id ? "visible" : "invisible"
        } flex flex-col gap-y-2 items-center `}
      >
        {wishlistData &&
        wishlistData.length > 0 &&
        wishlistData.includes(`${product?.id}`) ? (
          <div
            onClick={async () => {
              await removeFromWishListHandler({
                userId: userData?.id,
                productId: product?.id,
              });
              await queryClient.invalidateQueries({
                queryKey: ["wishlistData-products"],
              });
              queryClient.invalidateQueries({
                queryKey: ["wishlistData"],
              });
              toast.success("Product removed from wishlist.");
            }}
            className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] md:w-[40px] md:h-[40px] rounded-full bg-white flex justify-center items-center cursor-pointer "
          >
            <FlatIcon
              icon={
                "flaticon-heart-fill  text-sm md:text-xl text-secondary font-normal "
              }
            />
          </div>
        ) : (
          <div
            onClick={async () => {
              console.log("move btn cgfh");
              await moveToWishListHandler({
                userId: userData?.id,
                productId: product?.id,
              });
              await queryClient.invalidateQueries({
                queryKey: ["wishlistData-products"],
              });
              queryClient.invalidateQueries({
                queryKey: ["wishlistData"],
              });
              toast.success("Product added to wishlist.");
            }}
            className=" w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] md:w-[40px] md:h-[40px] rounded-full bg-white flex justify-center items-center cursor-pointer"
          >
            <FlatIcon
              icon={
                "flaticon-heart text-secondary font-normal text-sm md:text-xl rounded-full text-secondary "
              }
            />
          </div>
        )}
        {/* <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
          <FlatIcon className={"flaticon-search  text-lg text-secondary"} />
        </div> */}
      </div>
      <div
        className={`white-triangle w-[40px] h-[40px] sm:w-[45px] p-[2px] sm:h-[45px] sm:p-[3.5px] md:w-[50px] md:h-[50px] md:p-[5px] flex justify-center items-center border ${
          hoveredProduct === product?.id ? "border-primary" : "border-secondary"
        } `}
      >
        <div
          className={` green-triangle  border  ${
            hoveredProduct === product?.id
              ? "border-secondary"
              : "border-primary"
          }  ${hoveredProduct === product?.id ? "bg-secondary" : "bg-primary"}`}
        ></div>
      </div>
      <Link href={`/product/${product?.slug?.name}`}>
        <div
          className={`border-[1px]  product-card ${
            hoveredProduct === product?.id
              ? "border-primary"
              : "border-secondary"
          }`}
        >
          <div className=" relative mb-1 md:mb-2 ">
            <div className="xl:h-[300px] lg:h-[300px] h-[200px] w-auto relative ">
              <Image
                src={image}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit"
              />
              {checkIfPriceDiscounted({
                discountedPrice: product?.isPriceList
                  ? product?.priceList[0]?.discountedPrice
                  : product?.discountedPrice,
                price: product?.isPriceList
                  ? product?.priceList[0]?.price
                  : product?.prodPrice,
              }) && (
                <div className="bg-primary absolute top-[4px] left-[4px] sm:top-[6px] sm:left-[6px] md:top-[8px] md:left-[8px]">
                  <div className="flex gap-0 md:gap-1 text-[8px] sm:text-[9px] md:text-[10px] text-white px-1.5 md:px-2.5 py-0.5 md:py-1">
                    {" "}
                    <p>
                      {getDiscountedPercentage({
                        price: product?.isPriceList
                          ? product?.priceList[0]?.price
                          : product?.prodPrice,
                        discountedPrice: product?.isPriceList
                          ? product?.priceList[0]?.discountedPrice
                          : product?.discountedPrice,
                      })}
                    </p>
                    <p>OFF</p>
                  </div>
                </div>
              )}

              <div
                className={`absolute bottom-0 left-0 w-full h-[25px] sm:h-[30px] md:h-[40px] lg:h-[45px] bg-primary flex items-center ${
                  hoveredProduct === product?.id ? "visible" : "invisible"
                }`}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
                  <h2 className="text-xs sm:text-sm md:text-base">
                    Add To Bag
                  </h2>
                  <div>
                    <FlatIcon className="flaticon-bag-fill text-base sm:text-lg md:text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-2 pr-2 pb-2">
          <div className="line-clamp-1 w-full text-base font-medium text-primary capitalize mb-1 sm:mb-2 md:mb-3">
            <h2 className="">{product?.prodName}</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="text-ellipsis overflow-hidden ... truncate text-center ">
              <p className="text-ellipsis overflow-hidden ... truncate text-center  text-primary font-bold text-sm sm:text-base md:text-lg">
                {constant?.currency}{" "}
                {product?.isPriceList
                  ? product?.priceList[0]?.discountedPrice.toFixed(2)
                  : product?.discountedPrice.toFixed(2)}
              </p>
            </div>
            {checkIfPriceDiscounted({
              discountedPrice: product?.isPriceList
                ? product?.priceList[0]?.discountedPrice
                : product?.discountedPrice,
              price: product?.isPriceList
                ? product?.priceList[0]?.price
                : product?.prodPrice,
            }) && (
              <div className="text-ellipsis overflow-hidden ... truncate text-center ">
                <p className="text-ellipsis overflow-hidden ... truncate text-center  line-through text-[10px] sm:text-xs md:text-sm text-gray-500 font-semibold">
                  {constant.currency}{" "}
                  {product?.isPriceList
                    ? product?.priceList[0]?.price
                    : product?.prodPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
