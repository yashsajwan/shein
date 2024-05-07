"use client";
import React, { useState } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
// import logo from "../../images/logo.png";
import { usePathname } from "next/navigation";
// import logo from "../../images/logo.a2e454d6.svg"
import logo from "../../images/Group 34291.png";
import {TfiMenuAlt} from "react-icons/tfi"
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../redux/slices/loginModalSlice";
import FlatIcon from "../flatIcon/flatIcon";
import { useQueryClient } from "@tanstack/react-query";


const Navmobile = ({cookie,handleLogout}) => {
  const queryClient=useQueryClient()
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const matches2 = useMediaQuery("(max-width:785px)");
  const dispatch = useDispatch();

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    //
    // keepPreviousData: true,
  });
  return (
    <div className={`text-center  ${matches2 ? "px-[5%]" : "px-[7%]"}  bg-white z-40 `}>
      <div className="flex items-center justify-between py-[10px]">
      <div
          onClick={(prev) => {
            setIsMobile(true);
            document.body.classList.add("no-scroll");
          }}
        >
        
          <TfiMenuAlt className="h-[20px] w-auto"/>
        </div>
        <div>
        <Link href={"/"}>
          <Image
            src={logo}
            alt=""
            height={1000}
            width={1000}
            style={{ aspectRatio: "auto", width: "100px", height: "auto" }}
            className=""
          />
          </Link>
        </div>
        {/* <div
          onClick={(prev) => {
            setIsMobile(true);
            document.body.classList.add("no-scroll");
          }}
        >
        
          <TfiMenuAlt/>
        </div> */}
      </div>
      {isMobile && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
          <div
            className={` bg-[white]  sm:w-[50%] w-[100%] absolute top-0 left-0 h-screen z-50 rounded-tr-3xl rounded-br-3xl `}
          >
            <div
              onClick={() => {
                setIsMobile(false);
                document.body.classList.remove("no-scroll");
              }}
              className="absolute top-[20px] right-[20px]"
            >
              {/* X */}
            <FlatIcon className="text-gray-600 cursor-pointer flaticon-close md:text-sm text-xs " />

            </div>
            <div className="flex  flex-col items-start gap-2 font-medium px-[30px] ">
              <Link  href={"/"} className=" w-[120px]  mt-[30px] mb-[10px] ml-[-10px]  cursor-pointer"
              onClick={()=>{
                setIsMobile(false);
              }}>
              {/* <div className=" w-[120px]  mt-[30px] mb-[10px] ml-[-10px] border border-primary "> */}
                <Image src={logo} alt="" className="" />
              {/* </div> */}
              </Link>
              <Link
                href={"/"}
                className={`${pathname === "/" && "text-primary"}  py-[5px] cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Home
              </Link>
              <Link
                href={"/category"}
                className={`${
                  pathname.includes("categories") && "text-primary"
                } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Categories</div>
                <div></div>
              </Link>
             
              {/* <div className=" py-[5px]   ">My Account</div> */}
              <Link
                href={"/cart"}
                className={`${
                  pathname.includes("cart") && "text-primary"
                } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                <div>Cart</div>
                <div></div>
              </Link>
              {/* <Link
                href={"/login"}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
                className="text-primary  py-[5px]   "
              >
                Log In
              </Link> */}


{(cookie?.value||userData)&&  <Link
                href={"/profilepage"}
                className={`${
                  pathname.includes("/profilepage") && "text-primary"
                } flex items-center justify-center gap-2  py-[5px]  cursor-pointer `}
                onClick={async() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                  await queryClient.invalidateQueries({ queryKey: ["userData"],});
                  await queryClient.refetchQueries({ queryKey: ["userData"] });
             
                }}
              >
                <div>Profile</div>
                <div></div>
              </Link>}
{cookie?.value || userData ? (
                <Link
                  href={"/#"}
                  onClick={async () => {
                    await handleLogout();
                    
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                   await queryClient.refetchQueries({ queryKey: ["userData"] });
                    await queryClient.invalidateQueries({ queryKey: ["userData"],});
                  }}
                  className="text-white px-10  bg-primary py-[5px] mt-2   "
                >
                  Log Out
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  onClick={async(e) => {
                    e.preventDefault();
                    dispatch(openLoginModal());
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                    await queryClient.refetchQueries({ queryKey: ["userData"] });
                    await queryClient.invalidateQueries({ queryKey: ["userData"],});
                  }}
                  className="text-primary  py-[5px]   "
                >
                  Log In
                </Link>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navmobile;
