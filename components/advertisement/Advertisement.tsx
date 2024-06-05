"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import advestisingImg from "../../images/Group 34289.png";
import referandearn from "../../images/referandearn.png";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import { getUserData } from "../../utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { sha256 } from "js-sha256";

const Advertisement = () => {
  const [isClient, setIsClient] = useState(false);
  const [inviteLink, setInviteLink] = useState(
    "https://sheinidias.app.link/join/?ref=*****&"
  );
  // const websiteInviteLink = "https://sheinidias.app.link/join/?ref=*****&";
  // let websiteInviteLink2 = "https://sheinidias.app.link/join/?ref=*****&";
  const cookies = { value: getCookie("uid") };
  const websiteInviteData = `Shein Style Store - Feeling empowered and confident in your own skin.\nShein Style Store Invite: ${inviteLink}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookies),
  });

  useEffect(() => {
    if (userData) {
      const tstring = userData.id;
      const sha = sha256(tstring).substring(0, 5);
      const websiteInviteLink2 = `https://sheinidias.app.link/join/?ref=${sha}&`;
      setInviteLink(websiteInviteLink2);
    } else {
      setInviteLink("https://sheinidias.app.link/join/?ref=*****&");
    }
  }, [userData]);

  const InviteHandler = () => {
    if (userData) {
      setCopied(true);

      navigator.clipboard.writeText(websiteInviteData);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
      toast.success("Copied Successfully!");
    } else {
      toast.error("Login First!");
    }
  };

  return (
    <>
      {isClient ? (
        <div className=" w-full mt-0 relative">
          <div className="bottom-[20%] right-[10%] absolute text-white bg-black md:px-2 md:w-[15rem] md:text-[0.5rem] lg:px-4 lg:w-[20rem]  lg:text-[0.6rem]  xl:text-lg xl:w-[30rem] xl:my-[0.7rem] rounded-full flex justify-between items-center px-1 text-[0.4rem] w-[10rem]">
            <div>{inviteLink}</div>
            <button onClick={InviteHandler}>
              <div
                className={`justify-center  items-center rounded sm:rounded-md md:rounded-lg py-0 sm:py-0.5 md:py-1 cursor-pointer text-center bg-black`}
              >
                <h2 className="text-sm sm:text-sm md:text-lg lg:text-3xl text-white ">
                  {copied ? <ClipboardCheck /> : <ClipboardCopy />}
                </h2>
              </div>
            </button>
          </div>
          <Image
            src={referandearn}
            alt=""
            width={1000}
            height={1000}
            className="object-cover w-full"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Advertisement;
