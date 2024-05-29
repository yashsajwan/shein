
"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../images/Group 34291 (2).svg";
import FlatIcon from "../flatIcon/flatIcon";
import { TfiMenuAlt } from "react-icons/tfi"
import { useQuery } from "@tanstack/react-query";
import { getStoreDetails, getUserData, } from "../../utils/databaseService";
import { openLoginModal } from "../../redux/slices/loginModalSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { handleTypesenseSearch } from "../../config/typesense";
import SearchTile2 from "../searchHeader/SearchTile";
import useDebounce from "../../utils/useDebounce";
import SidebarDrawer from "./SidebarDrawer";
import { auth } from "../../config/firebase-config";
import useOnScreen from "../../utils/visibleElement";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoIosHeartEmpty } from "react-icons/io";

// const texts = ["New Users Only !", " All India Free Delivery + 15% Extra Discount", "Code : SHE15"];
const texts = ["Refer and Earn ₹ 500", "Download the APP Get 10 % Off", "USE CODE - SHEINAPP10"];

const NewNavMobile = ({ cookie, isClient, handleLogout, setShowLogin, closeLoginMenu, }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isVisible = useOnScreen(ref);
  const router = useRouter();
  const pathname = usePathname();
  const matches2 = useMediaQuery("(max-width:785px)");

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    enabled: isClient,
  });

  const { data: storeData } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () => getStoreDetails(),
    keepPreviousData: true,
  });

  const cart = useAppSelector((state) => state.cartReducer.cart);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchSearchedProducts() {
    setIsSearching(true);
    const res = await handleTypesenseSearch(debouncedSearch);
    if (res) {
      setSearchedProducts(res);
    }
    setIsSearching(false);
  }

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedProducts([]);
    }
    if (debouncedSearch) {
      fetchSearchedProducts();
      // fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div ref={ref}>
      <div
        className={`  block md:hidden bg-primary text-white py-1.5 lg:py-3 text-sm font-semibold w-full px-1.5 lg:px-2.5  ${!isVisible && "fixed z-50  "
          } ${pathname?.includes("/category") && "top-0"}`}
      >
        {/* <div className="flex items-center   w-[93%] mx-auto justify-between gap-1">
          <a
            href={`tel:${storeData && storeData?.storePhone?.split("+91")[1]}`}
          >
            <div className="flex items-center gap-2">
              <FlatIcon className="flaticon-support text-lg md:text-xl" />
              <h4 className="lg:text-base text-sm">Customer Help</h4>
            </div>
          </a>
         
        </div> */}
        <Link href={`/view-all?type=product-carousel&id=H6ZyHPlP74sOsbcsA8Cj&name=${encodeURIComponent("BESTSELLER")}`}
          className="flex justify-center items-center gap-2   w-full  xl:text-sm text-xs "
        >
          <p className="text-white text-sm">{texts[currentIndex]}</p>
        </Link>
      </div>
      <div className="bg-black py-1 text-center w-full">
        <div className="animated-text font-semibold">
          <span>Download</span>
          <span>the</span>
          <span>app</span>
          <span>and</span>
          <span>get</span>
          <span>10%</span>
          <span>off</span>
          <span>!</span>
        </div>
      </div>
      <div
        className={`text-center block md:hidden bg-white  border border-[red] ${matches2 ? "px-[5%]" : "px-[7%]"
          } border-b border-gray-200 shadow-sm ${!isVisible &&
          `fixed z-40  overflow-auto w-full flex justify-between ${pathname?.includes("/category") ? "top-[31px]" : "top-[32px]"
          } `
          }`}
      >
        {isSearchOpen && (
          <div
            className={`absolute  left-0 bg-white w-full h-[70px] ${!isVisible ? "top-0" : "top-[32px] "
              }sm:h-[80px] shadow-md flex items-center justify-center z-50`}
          >
            <div className="w-full h-full relative flex  items-center justify-center">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchQuery("");
                    setSearchedProducts([]);
                    router.push(`/search?q=${searchQuery}`);
                  }
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className=" w-full h-full select-none outline-none pl-3 pr-10 "
              />
            </div>
            {searchQuery !== "" && searchedProducts?.length > 0 && (
              <div className="absolute z-50 px-4 top-full left-0 w-full h-fit  max-h-[40vh] flex flex-col gap-2 ">
                {searchQuery !== "" ? (
                  <div className="flex flex-col gap-1 sm:gap-2 bg-white  rounded-xl p-1 pb-2 shadow-lg max-h-[40vh] overflow-y-auto">
                    {searchedProducts?.map((product, idx) => {
                      return (
                        <div key={product?.id}>
                          <SearchTile2
                            setIsSearchOpen={setIsSearchOpen}
                            product={product}
                            key={product?.id}
                            idx={idx}
                            setSearchQuery={setSearchQuery}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
            <div
              className="absolute top-0 right-0 px-4 flex flex-col items-center justify-center h-full"
              onClick={() => {
                setIsSearchOpen(false);
              }}
            >
              <FlatIcon className="flaticon-close" />
            </div>
          </div>
        )}
        <div className="flex items-center w-full  justify-between py-[10px]  bg-white">
          <div
            onClick={(prev) => {
              setIsMobile(true);
              document.body.classList.add("no-scroll");
            }}
            className="w-1/3"
          >
            <TfiMenuAlt className="h-[20px] w-auto" />
          </div>
          <div className="w-[130px] sm:w-[150px] ">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                height={1000}
                width={1000}
                // style={{ aspectRatio: "auto", width: "100px", height: "auto" }}
                className="w-full h-auto"
              />
            </Link>
          </div>
          <div className="flex justify-end items-center   sm:gap-2 gap-1 w-1/3">
            <div
              className="text-right sm:px-[10px] sm:py-[10px] px-[5px] py-[5px] rounded-md"
              onClick={() => {
                setIsSearchOpen(true);
              }}
            >
              <FlatIcon className={"flaticon-search text-xl sm:text-2xl "} />
            </div>
            <Link
              href={"/wishlist"}
              onClick={(e) => {
                if (userData && auth.currentUser?.uid) {
                } else {
                  e.preventDefault();
                  dispatch(openLoginModal());
                }
              }}
              className="flex items-center  gap-2 relative"
            >
              <IoIosHeartEmpty className=" text-xl sm:text-2xl " />
            </Link>
            <Link
              href={"/cart"}
              className="flex items-center  gap-2 relative z-0"
            >
              <PiShoppingCartLight className={"   text-xl sm:text-2xl"} />
              <div className="h-[13px] w-[13px] rounded-full bg-primary absolute top-0 -right-1 flex items-center justify-center text-[8px] text-white">
                {cart.length > 0 ? cart.length : 0}
              </div>
            </Link>
          </div>
        </div>
        <SidebarDrawer
          dispatch={dispatch}
          userData={userData}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          pathname={pathname}
          cookie={cookie}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};
export default NewNavMobile;
