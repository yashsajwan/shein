"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { handleTypesenseSearch } from "../../config/typesense";
import { useMediaQuery } from "@mui/material";
import { constant } from "../../utils/constants";
import { checkIfPriceDiscounted } from "../../utils/utilities";
import ProductCard from "../categoryProduct/productCard";

const SearchClient = ({ query }) => {
  console.log(query,"query from search page");
  
  const {
    data: searchData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => handleTypesenseSearch(query),
    keepPreviousData: false,
  });

  return (
    <div className=" px-body  py-10 ">
      <div className="w-full  flex flex-col  ">
        <div className="flex py-2 border-b-2 border-primary w-fit">
          <h2 className="text-2xl font-semibold">
            Search results for '{query}'
          </h2>
        </div>
        {isFetching || isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : searchData && searchData?.length !== 0 ? (
          <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-3">
            {searchData &&
              searchData?.map((product, idx) => {
                return <ProductCard product={product} idx={idx} mx={2.5}/>;
              })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <h2 className="text-2xl font-semibold">No results found.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchClient;
