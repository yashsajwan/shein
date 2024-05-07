"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { useQuery } from '@tanstack/react-query';
import { getStoreDetails } from '../../../utils/databaseService';

const StoreLinks = () => {
    const { data: storeData } = useQuery({
        queryKey: ["storeDetails"],
        queryFn: () => getStoreDetails(),
        keepPreviousData: true,
      });
  return (
  <>
    <div >
          <div className="flex flex-col lg:flex-row  px-body gap-y-6  -mb-4 bg-[#F2F7FF] ">
            <div className="hidden lg:flex flex-1 justify-center items-end ">
              <div className="">
                <Image
                  width={1000}
                  height={1000}
                  src={require("../../../images/iPhone 15 Pro.png")}
                  alt="phone"
                  layout = 'responsive'
                  className="w-full h-full object-contain  "
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-3 lg:gap-10 justify-center lg:items-start items-center py-6 lg:py-0  ">
              <div className="min-w-[140px] w-[35%] sm:w-[20%] lg:w-[37%] lg:max-w-[200px] flex   ">
                <Image
                  src={require("../../../images/Group 34291 (2).svg")}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="pl-2 lg:pl-4">
                <h6 className="font-medium text-sm sm:text-base md:text-lg lg:text-2xl">
                  {/* Your Trusted Pharmacy is <br /> Now Online! */}
                  Download the app and get 10% off !
                </h6>
              </div>
              <div className="flex justify-start gap-3  ">
                {/* <Link href={storeData?.appStoreUrl} target="_blank"> */}
                  <button className="flex  md:w-[200px] w-[150px] ">
                    <Image
                      src={require("../../../images/Group 34287.svg")}
                      width={1000}
                      height={1000}
                      alt="App store"
                      className="w-full h-full"
                    />
                  </button>
                {/* </Link> */}
                {/* <Link href={storeData?.playstoreUrl} target="_blank"> */}
                  <button className="flex md:w-[200px] w-[150px] ">
                    <Image
                      src={require("../../../images/Group 34288.svg")}
                      width={1000}
                      height={1000}
                      alt="Play store"
                      className="w-[100%] h-[100%]"
                    />
                  </button>
                {/* </Link> */}
              </div>
            </div>
            
          </div>
        </div>
  </>
  )
}

export default StoreLinks