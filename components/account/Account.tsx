"use client";
import { getUserData } from "../../utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";

import { constant } from "../../utils/constants";

const Account = ({ cookie }) => {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
  });

  return (
    <div className="w-full h-full ">
      {userData && userData.length === 0 ? (
        <div className="w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500">
          No Account Found !
        </div>
      ) : (
        <div className="grid grid-cols-4">
          <div className="grid col-span-3 border border-primary  rounded-3xl ">
            <div className="lg:px-5 px-2 lg:py-5 py-3">
              <div className="text-secondary text-lg font-semibold flex items-center mb-5">
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
                  <h5 className="text-secondary font-semibold text-2xl mb-1">
                    {userData?.name} {userData?.lastName && userData?.lastName}
                    {/* Arjun Rawat */}
                  </h5>
                  <h6 className="text-[#555555] font-medium text-xl">
                    {userData?.email}
                    {/* rajun.rawat@gmail.com */}
                  </h6>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
