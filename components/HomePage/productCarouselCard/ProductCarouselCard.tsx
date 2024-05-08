// "use client";
import React, { useState } from "react";
import { constant } from "../../../utils/constants";
import { dividerClasses, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  getUserData,
  getUserWishlist,
  moveToWishListHandler,
  removeFromWishListHandler,
} from "../../../utils/databaseService";
import {
  checkIfPriceDiscounted,
  getDiscountedPercentage,
} from "../../../utils/utilities";
import FlatIcon from "../../flatIcon/flatIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ProductCarouselCard = ({ product, id }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState(
    product.images && product?.images?.length != 0
      ? product?.images[0]?.url
      : constant.errImage
  );
  const matchesSm = useMediaQuery("(min-width:640px)");
  const [hoveredProduct, setHoveredProduct] = useState("");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
  });
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
  });
  return (
    // <Link href={`/product/${product?.slug?.name}`}>
    <div
      className="flex flex-col z-10  mx-2 relative   bordered-shape overflow-hidden  "
      key={id || Math.random().toString()}
      onMouseEnter={() => {
        setHoveredProduct(product?.id);
      }}
      onMouseLeave={() => {
        setHoveredProduct("");
      }}
    >
      <div
        className={`absolute z-30 right-[25px] top-[25px] ${
          hoveredProduct === product?.id ? "visible" : "invisible"
        } flex flex-col gap-y-2 items-center`}
      >
        {wishlistData &&
        wishlistData.length > 0 &&
        wishlistData.includes(`${id}`) ? (
          <div
            onClick={async () => {
              await removeFromWishListHandler({
                userId: userData?.id,
                productId: id,
              });
              await queryClient.invalidateQueries({
                queryKey: ["wishlistData"],
              });
              toast.success("Product removed from wishlist.");
            }}
            className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center cursor-pointer"
          >
            <FlatIcon
              icon={"flaticon-heart-fill text-base text-secondary font-normal "}
            />
          </div>
        ) : (
          <div
            onClick={async () => {
              // console.log("move btn cgfh");

              await moveToWishListHandler({
                userId: userData?.id,
                productId: id,
              });
              await queryClient.invalidateQueries({
                queryKey: ["wishlistData"],
              });
              toast.success("Product added to wishlist.");
            }}
            className=" w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center cursor-pointer"
          >
            <FlatIcon
              icon={
                "flaticon-heart text-secondary font-normal text-xl rounded-full text-secondary "
              }
            />
          </div>
        )}
        {/* <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center cursor-pointer">
          <FlatIcon className={"flaticon-search  text-lg text-secondary"} />
        </div> */}
      </div>
      <div
        className={`white-triangle flex justify-center items-center border ${
          hoveredProduct === product?.id ? "border-primary" : "border-secondary"
        } `}
      >
        <div
          className={` green-triangle  border  
             ${
               hoveredProduct === product?.id
                 ? "border-secondary"
                 : "border-primary"
             }
            ${hoveredProduct === product?.id ? "bg-secondary" : "bg-primary"}`}
        ></div>
      </div>
      <Link href={`/product/${product?.slug?.name}`}>
        <div
          className={`border-[1px]   product-card ${
            hoveredProduct === product?.id
              ? "border-primary"
              : "border-secondary"
          }`}
        >
          <div className=" relative  mb-2">
            <div className="h-[250px] xl:h-[480px] lg:h-[350px] relative">
              <Image
                src={image}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit"
              />
              <div className="bg-primary absolute top-[8px] left-[8px] z-30">
                <div className="flex gap-1 text-[10px] text-white px-2.5 py-1">
                  {" "}
                  <p>
                    {getDiscountedPercentage({
                      price: product?.prodPrice,
                      discountedPrice: product?.discountedPrice,
                    })}
                  </p>
                  <p>OFF</p>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center  ${
                  hoveredProduct === product?.id ? "visible" : "invisible"
                }`}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
                  <h2>Add To Bag</h2>
                  <div>
                    <FlatIcon className="flaticon-bag-fill text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pl-2 pr-2 pb-2">
          <div className="flex  overflow-hidden truncate w-full text-xs font-medium text-primary capitalize mb-1">
            <h2 className="">{""}</h2> {/* to be checked */}
          </div>
          <div className="flex    w-full text-base mb-3 ">
            <h2 className="truncate">
              {product?.prodName || "Calcium Magnesium Zinc"}{" "}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-ellipsis overflow-hidden ... truncate text-center ">
              <p className="text-ellipsis overflow-hidden ... truncate text-center text-2xl  text-primary font-bold">
                {constant.currency} {product?.discountedPrice.toFixed(2)}
              </p>
            </div>
            {checkIfPriceDiscounted({
              discountedPrice: product?.discountedPrice,
              price: product?.prodPrice,
            }) && (
              <div className="text-ellipsis overflow-hidden ... truncate text-center ">
                <p className="text-ellipsis overflow-hidden ... truncate text-center  line-through text-lg text-gray-500 font-semibold">
                  {constant.currency} {product?.prodPrice}
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
      </Link>
    </div>
    // </Link>
  );
};

export default ProductCarouselCard;
