"use client";
import { getUserData } from "../../utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";

import accountbanner from "../../images/account_banner.png";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const Account = ({ cookie }) => {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <div className="w-full h-full ">
            {userData && userData.length === 0 ? (
              <div className="w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500">
                No Account Found !
              </div>
            ) : (
              <div className="grid grid-cols-4">
                <div className="grid col-span-3 bg-gradient-to-r from-white via-[#fa7bc1] to-[#fa7bc1]  rounded-3xl ">
                  <div className="lg:px-5 px-2 lg:py-5 py-3 relative">
                    <div className=" text-secondary text-lg font-semibold flex items-center mb-5">
                      <Image
                        src={userData?.dP || constant.errImage}
                        alt=""
                        width={1000}
                        height={1000}
                        style={{
                          aspectRatio: "auto",
                          width: "100px",
                          height: "100px",
                        }}
                        className="rounded-full"
                      />
                      <h2 className="ml-5 text-2xl">
                        <h5 className="text-white font-semibold text-3xl mb-1">
                          {userData?.name}{" "}
                          {userData?.lastName && userData?.lastName}
                          {/* Arjun Rawat */}
                        </h5>
                        <h6 className="text-white font-medium text-xl">
                          {userData?.email}
                          {/* rajun.rawat@gmail.com */}
                        </h6>
                      </h2>
                    </div>

                    <Image
                      src={accountbanner}
                      alt=""
                      width={1000}
                      height={1000}
                      className="h-full w-auto absolute right-0 top-0 rounded-3xl hidden  xl:block"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="w-full md:w-3/4 my-5">
              <div className="flex justify-between items-center">
                <div className="text-3xl">My Orders</div>
                <Link href="">View All</Link>
              </div>
              <div className="flex justify-around my-5">
                <div className="p-3 text-xl">Unpaid</div>
                <div className="p-3 text-xl">Processing</div>
                <div className="p-3 text-xl">Shipped</div>
                <div className="p-3 text-xl">Review</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Account;
