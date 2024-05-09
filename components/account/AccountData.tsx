"use client";

import React, { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import Image from "next/image";
import { useState } from "react";
import { constant } from "../../utils/constants";

const AccountData = ({ item, cookie, isNewAddress = false }) => {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
  });

  const [isClient, setIsClient] = useState(true);

  return (
    <>
      <>
        <div className=" border border-primary ">
          <div className="lg:px-5 px-2 lg:py-5 py-3">
            <div className="text-secondary text-lg font-semibold flex items-center mb-5">
              <Image
                src={(isClient && userData?.dP) || constant.errImage}
                alt=""
                width={1000}
                height={1000}
                style={{
                  aspectRatio: "auto",
                  width: "60px",
                  height: "60px",
                }}
                className="rounded-full"
              />
              <h2 className="ml-5 text-2xl">
                {item.name} {item?.lastName && item?.lastName}
              </h2>
            </div>
            <div className="text-secondary font-semibold flex my-3 text-md">
              <div>
                <span className="text-gray-500 font-semibold pr-2 text-md">
                  Mobile:
                </span>{" "}
              </div>
              {item.phoneNo}
            </div>

            <div className="text-secondary  font-semibold flex my-3 text-md">
              <div>
                <span className="text-gray-500 font-semibold pr-2">Email:</span>{" "}
              </div>
              {item.email}
            </div>

            <div className="text-secondary  font-semibold flex my-3 text-md">
              <div>
                <span className="text-gray-500 font-semibold pr-2">
                  Address:
                </span>{" "}
              </div>
              <div className="text-md">
                {item.address + " "} 
                {item.city} - {item.pincode}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AccountData;
