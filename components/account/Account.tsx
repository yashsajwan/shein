"use client";
import React, { useState } from "react";
import { getUserAddresses, getUserData } from "../../utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AccountData from "./AccountData";


const Account = ({cookie}) => {
  const { data: userAddresses } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(null),
  });

  return (
    <div className="w-full h-full ">
      {userAddresses && userAddresses.length === 0 ? (
        <div className="w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500">
          No Account Found !
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8 ">
          {userAddresses &&
            userAddresses.length > 0 &&
            userAddresses?.map((singleaddress: any, idx: number) => {
              return (
                <AccountData
                  item={singleaddress}
                  cookie={cookie}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Account;
