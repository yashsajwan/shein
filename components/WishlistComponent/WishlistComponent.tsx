"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getUserData,
  getUserWishlist,
  getUserWishlistData,
} from "../../utils/databaseService";
import { getUserWishlistData2 } from "../../utils/databaseService";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import ProductCard from "../categoryProduct/productCard";
import Loading from "../../app/loading";

const WishlistComponent = ({ cookie }) => {
  const [isClient, setIsClient] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    //
    // keepPreviousData: true,
    // enabled: isClient,
  });
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
  });

  // console.log(userData,"user");

  // const {data:wishlistData}=useQuery({
  //   queryKey: ["wishlistData"],
  //   queryFn: () => getUserWishlistData(userData?.id),
  //
  // })

  // console.log(wishlistData,"wishlistData");

  const { data: wishlistData2, isLoading } = useQuery({
    queryKey: ["wishlistData-products"],
    queryFn: () => getUserWishlistData2(cookie),
  });
  // console.log(wishlistData2,"wishlistData2-------");

  useEffect(() => {
    setIsClient(true);
  }, [wishlistData2]);
  return (
    <div className=" w-full h-full">
      {wishlistData2 && wishlistData2.length > 0 && isClient ? (
        <div className="px-body  w-full h-full ">
          <h1 className="sm:text-2xl text-xl font-semibold md:mt-10 md:pt-0 sm:pt-10 pt-5  sm:mx-0 mx-5  ">
            My Wishlist
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 md:gap-x-8 gap-x-2 sm:gap-y-10 gap-y-5 md:my-10 my-6">
            {wishlistData2 &&
              wishlistData2.length > 0 &&
              isClient &&
              wishlistData2.map((item: any, idx: number) => {
                return (
                  <div key={idx} className="">
                    <ProductCard product={item} mx={0} />
                  </div>
                );
              })}
          </div>
        </div>
      ) : isLoading ? (
        <div className="px-body">
          <h1 className="sm:text-2xl text-xl font-semibold md:mt-10 mt-5  md:pt-0 sm:pt-10 pt-5 sm:mx-0 mx-5">
          My Wishlist
          </h1>
          <Loading />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-[70vh]">
          <h3 className="bg-secondary text-white sm:px-5 px-3 py-2  sm:text-base  text-xs font-medium">
            Your wishlist is empty ! Add something !
          </h3>
        </div>
      )}
     
    </div>
  );
};

export default WishlistComponent;
