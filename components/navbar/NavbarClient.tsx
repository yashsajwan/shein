"use client";
import Link from "next/link";
import logo from "../../images/Group 34291 (2).svg";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import Image from "next/image";
import Categories from "./categories/navCategories";
import { getUserCartDetails } from "../../utils/cartUtilities/cartUtility";
import { initializeCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase-config";
import { Transition } from "@headlessui/react";
import useDebounce from "../../utils/useDebounce";
import { handleTypesenseSearch } from "../../config/typesense";
import FlatIcon from "../flatIcon/flatIcon";
import { addCartObjToUser } from "../../utils/databaseService";
import { useAppSelector } from "../../redux/hooks";
import SideMenuLogin from "../sideMenuLogin/SideMenuLogin";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { checkIfItemExistInCart, getProductIndexFromCart, getProductFromCart, checkIfPriceDiscounted, } from "../../utils/utilities";
import { updateCartItemQuantity } from "../../redux/slices/cartSlice";
import { addToCart, getCartObj, getPriceListCartObj } from "../../redux/slices/cartSlice";
import { closeLoginModal, openLoginModal, } from "../../redux/slices/loginModalSlice";
import { constant } from "../../utils/constants";
import OutsideClickHandler from "../../utils/OutsideClickHandler";
import PopUp from "../popUp/PopUp";
import { getCookie } from "cookies-next";
import { PiUserLight } from "react-icons/pi";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoIosHeartEmpty } from "react-icons/io";
import NewNavMobile from "../navMobile/NewNavMobile";
import { useScrollDirection } from "../../utils/useScroll";


const NavbarClient = ({ cookie }: any) => {
  const cookies = { value: getCookie("uid") };;
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const isLoginOpen = useAppSelector(
    (state: any) => state.loginReducer.isLoginOpen
  );
  const [showLogin, setShowLogin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const mobile = useMediaQuery("(max-width:1080px)");
  const isScrolled = useScrollDirection();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const matches = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [variant, setVariant] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    dispatch(openLoginModal());
    setShowLogin(true);
    document.body.classList.add("no-scroll");
  };

  const closeLoginMenu = () => {
    setShowLogin(false);
    dispatch(closeLoginModal());
    document.body.classList.remove("no-scroll");
  };

  async function getCart() {
    const cart = await getUserCartDetails(cookie);
    dispatch(initializeCart(cart));
  }
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookies),
  });
  // console.log(userData,"userData---------->");

  async function fetchSearchedProducts(searchquery: any) {
    let res: any;
    if (debouncedSearch) {
      res = await handleTypesenseSearch(searchquery);
    }
    if (res) {
      setSearchedProducts(res);
    }
  }

  // async function handleLogout() {
  //   signOut(auth)
  //     .then(async () => {
  //       await axios.get(`/api/logout`);
  //       await queryClient.setQueryData(["userData"], null);
  //       toast.success("Logged out");
  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       toast.error("cannot Logout at the moment");
  //     });
  // }

  async function handleLogout() {
    signOut(auth)
      .then(async () => {
        toast.success("Logged out");
        await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/logout`);
        // await axios.get(`/api/logout`);
        await queryClient.invalidateQueries({ queryKey: ["userData"] });

        // Sign-out successful.
        router.replace("/");
        await queryClient.refetchQueries({ queryKey: ["userData"] });
      })
      .catch((error) => {
        // An error happened.
        toast.error("cannot Logout at the moment");
      });
  }

  async function addItemToCart(product: any) {
    let data: any = {
      product,
      productID: product?.id,
      index: variant,
      isPriceList: product?.isPriceList,
    };
    const cartObject = product?.isPriceList
      ? getPriceListCartObj({
        product: product,
        quantity: 1,
        index: data.index,
      })
      : getCartObj({
        product: product,
        productID: product?.id,
        quantity: 1,
      });
    if (auth.currentUser) {
      const docId = await addCartObjToUser(cartObject);
      cartObject["id"] = docId;
    }
    dispatch(addToCart(cartObject));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      getCart();
    }
    setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedProducts([]);
    }
    if (debouncedSearch) {
      fetchSearchedProducts(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="fixed top-0 w-full z-40 ">
      {showPopup && <PopUp setShowPopup={setShowPopup} />}

      {matches ? (
        <NewNavMobile
          cookie={cookie}
          isClient={isClient}
          handleLogout={handleLogout}

        />
      ) : (
        <div className="">
          {!isScrolled ?
            <div className="bg-primary text-white py-2 text-sm font-semibold w-full px-body z-10  ">
              <div className="flex items-center   w-full  justify-between lg:gap-5  ">
                <Link href={`/view-all?type=product-carousel&id=H6ZyHPlP74sOsbcsA8Cj&name=${encodeURIComponent("BESTSELLER")}`}
                  className="flex justify-center items-center gap-2   w-full  xl:text-sm text-xs "
                >
                  <p className=" text-base lg:text-lg text-secondary font-bold">
                    New Users Only{" "}
                  </p>
                  <p className=" text-base lg:text-2xl font-bold">
                    All India Free Delivery + 15% Extra Discount{" "}
                  </p>
                  <p className=" text-base lg:text-lg text-secondary font-bold">
                    {" "}
                    Code: SHE15
                  </p>
                </Link>
              </div>
            </div>
            : <></>
          }
          <div className="z-10  ">
            {/* nav header section  */}
            {!isScrolled &&
              <div className="flex text-sm  font-semibold   bg-white  w-full px-body ">
                <div className=" w-full   ">
                  <div className="  flex items-center w-full  justify-between   ">
                    <div className="min-h-[100px] flex items-center   w-[30%]  ">
                      <div className=" relative w-full h-full flex items-center border border-[#999999] px-4 justify-between gap-3 search-container z-20 ">
                        <div>
                          <FlatIcon
                            className={"flaticon-camera  text-xl text-[#999999]"}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="What are you Looking for"
                          name=""
                          id=""
                          value={searchQuery}
                          className="py-3 px-4  w-full outline-none focus:border-none  bg-transparent "
                          onChange={(e) => {
                            setSearchQuery(e.target.value);

                          }}
                        />
                        <div>
                          <FlatIcon
                            className={"flaticon-search  text-xl text-[#999999]"}
                          />
                        </div>
                        {searchedProducts.length !== 0 &&
                          pathname !== "/search" && (
                            <OutsideClickHandler
                              onClick={() => {
                                setSearchedProducts([]);
                                setSearchQuery("");
                              }}
                            >
                              <div className="absolute z-50  top-[45px] left-0 rounded-lg  shadow-md bg-white xl:w-full w-[300px] lg:min-h-[100px] lg:max-h-[400px] overflow-y-auto  px-4 flex flex-col py-4 gap-3  ">
                                {searchedProducts?.map((prod, idx) => {
                                  return (
                                    <div
                                      className=" flex justify-between items-center gap-x-4 border-t-gray-300  border-t py-4  w-full"
                                      key={idx}
                                    >
                                      <Link
                                        key={idx}
                                        href={`/product/${prod?.slug?.name}`}
                                        onClick={() => {
                                          setSearchedProducts([]);
                                          setSearchQuery("");
                                        }}
                                      >
                                        <div className=" flex  gap-x-3 z-10  w-full  ">
                                          <div className="w-[30%] h-auto aspect-[1/1]">
                                            <Image
                                              src={
                                                prod.coverPic?.url
                                                  ? prod.coverPic?.url
                                                  : constant.errImage
                                              }
                                              alt=""
                                              height={1000}
                                              width={1000}
                                              className="object-fill h-full w-full "
                                            />
                                          </div>
                                          <div className="flex flex-col gap-y-1.5 w-[70%]">
                                            <h1 className="xl:text-sm text-xs font-medium line-clamp-1">
                                              {prod?.prodName}
                                            </h1>
                                            <div className="flex lg:flex-row flex-col lg:items-center  gap-x-2 font-bold xl:text-base text-sm truncate">
                                              {" "}
                                              <h1>
                                                {constant.currency}{" "}
                                                {prod?.discountedPrice}
                                              </h1>
                                              {checkIfPriceDiscounted({
                                                price: prod?.prodPrice,
                                                discountedPrice:
                                                  prod?.discountedPrice,
                                              }) && (
                                                  <h3 className="text-xs text-gray-500 font-medium line-through ">
                                                    {constant.currency}{" "}
                                                    {prod?.prodPrice}
                                                  </h3>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="w-[20%] flex justify-end z-30 ">
                                        {/* new start  */}
                                        {checkIfItemExistInCart(cart, prod, 0) ? (
                                          <div
                                            className=" my-auto flex justify-center  items-center right-2 "
                                            onClick={(e) => {
                                              // e.preventDefault();
                                              // console.log("CLICKED");
                                            }}
                                          >
                                            <div className="flex items-center ">
                                              <div
                                                // className="bg-slate-200 p-1 cursor-pointer hover:bg-primary hover:text-white"
                                                className=" shadow-lg  rounded-md p-0.5 md:p-1.5 lg:p-2.5  text-lg text-gray-500 flex justify-center items-center cursor-pointer"
                                                onClick={() => {
                                                  if (
                                                    getProductIndexFromCart(
                                                      cart,
                                                      prod
                                                    ) >= 0
                                                  ) {
                                                    let currQty =
                                                      cart[
                                                        getProductIndexFromCart(
                                                          cart,
                                                          prod
                                                        )
                                                      ]?.quantity;
                                                    let decqty =
                                                      currQty > prod?.minQty
                                                        ? 1
                                                        : prod?.minQty;
                                                    dispatch(
                                                      updateCartItemQuantity({
                                                        type: "dec",
                                                        addedQty: decqty,
                                                        // prod?.minQty || 1,
                                                        index:
                                                          getProductIndexFromCart(
                                                            cart,
                                                            prod
                                                          ),
                                                      })
                                                    );
                                                  }
                                                }}
                                              >
                                                <FlatIcon
                                                  className={
                                                    "flaticon-minus text-secondary font-normal lg:text-xs text-[10px]"
                                                  }
                                                />
                                              </div>
                                              <div className="px-3">
                                                {
                                                  getProductFromCart(cart, prod)
                                                    ?.quantity
                                                }
                                              </div>
                                              <div
                                                className=" shadow-lg  rounded-md p-0.5 md:p-1.5 lg:p-2.5  text-lg text-gray-500 flex justify-center items-center cursor-pointer"
                                                // className="bg-slate-200 p-1 cursor-pointer hover:bg-primary hover:text-white"
                                                onClick={() => {
                                                  if (
                                                    getProductIndexFromCart(
                                                      cart,
                                                      prod
                                                    ) >= 0
                                                  ) {
                                                    let currQty =
                                                      cart[
                                                        getProductIndexFromCart(
                                                          cart,
                                                          prod
                                                        )
                                                      ]?.quantity;
                                                    let addqty =
                                                      currQty < prod?.minQty
                                                        ? prod?.minQty
                                                        : 1;
                                                    if (prod.isPriceList) {
                                                      if (
                                                        currQty +
                                                        (prod?.minQty || 1) >
                                                        parseFloat(
                                                          prod?.priceList[0]
                                                            ?.totalQuantity
                                                        )
                                                      ) {
                                                        toast.error(
                                                          "Cannot add more of this item"
                                                        );
                                                      } else {
                                                        dispatch(
                                                          updateCartItemQuantity({
                                                            type: "inc",
                                                            addedQty: addqty,
                                                            // prod?.minQty ||
                                                            // 1,
                                                            index:
                                                              getProductIndexFromCart(
                                                                cart,
                                                                prod
                                                              ),
                                                          })
                                                        );
                                                      }
                                                    } else {
                                                      if (
                                                        currQty +
                                                        (prod?.minQty || 1) >
                                                        parseFloat(
                                                          prod?.productQty
                                                        )
                                                      ) {
                                                        toast.error(
                                                          "Cannot add more of this item"
                                                        );
                                                      } else {
                                                        dispatch(
                                                          updateCartItemQuantity({
                                                            type: "inc",
                                                            addedQty: addqty,
                                                            // prod?.minQty ||
                                                            // 1,
                                                            index:
                                                              getProductIndexFromCart(
                                                                cart,
                                                                prod
                                                              ),
                                                          })
                                                        );
                                                        // setQuantity((val) => val + (product?.minQty || 1));
                                                      }
                                                    }
                                                  }
                                                }}
                                              >
                                                <FlatIcon className="flaticon-plus-1  font-normal text-[10px] lg:text-xs " />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() => {
                                              addItemToCart(prod);
                                            }}
                                            className=" shadow-lg  rounded-md p-0.5 md:p-1.5 lg:p-2.5  text-lg text-gray-500 flex justify-center items-center cursor-pointer "
                                          >
                                            <FlatIcon
                                              className={
                                                "flaticon-plus-1  font-normal text-[10px] lg:text-xs"
                                              }
                                            />
                                          </div>
                                        )}


                                      </div>
                                    </div>
                                    // </Link>
                                  );
                                })}
                                {/* </div> */}
                              </div>
                            </OutsideClickHandler>
                          )}
                        {/* {searchQuery&&<SearchResults/>} */}
                      </div>
                    </div>
                    {/* // ) : ( */}
                    <div className=" w-[30%] flex justify-center">
                      <Link href={"/"}>
                        <Image
                          src={logo}
                          alt=""
                          className=" "
                          width={1000}
                          height={1000}
                          style={{
                            aspectRatio: "auto",
                            width: "200px",
                            height: "auto",
                          }}
                        />
                      </Link>
                    </div>
                    <div className="flex items-center justify-end gap-7  w-[30%]">
                      {userData ? (
                        <div className="flex items-center justify-center">
                          <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="relative text-left flex justify-center items-center group"
                          >
                            <div className=" cursor-pointer">
                              <div className="flex items-center gap-2">
                                <PiUserLight className=" text-3xl" />
                                {/* {(userData && userData?.name) || "User "} */}
                              </div>
                            </div>
                            <Transition
                              as={Fragment}
                              show={isMenuOpen}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <div className="z-50 absolute right-0 mt-2 top-full w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                  <Link href={"/profilepage"} className="">
                                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                                      Profile
                                    </button>
                                  </Link>
                                  <button
                                    onClick={handleLogout}
                                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]"
                                  >
                                    Logout
                                  </button>
                                </div>
                              </div>
                            </Transition>
                          </div>
                        </div>
                      ) : !isLoginOpen ? (
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={handleLoginClick}
                        >
                          <PiUserLight className=" text-3xl" />
                          <h3>Login</h3>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <PiUserLight className=" text-3xl" />
                          <h3>Login</h3>
                        </div>
                      )}
                      <Link href={"/wishlist"}>
                        <div className="cursor-pointer">
                          <IoIosHeartEmpty className=" text-3xl " />
                        </div>
                      </Link>
                      <Link
                        href={"/cart"}
                        className="flex items-center  gap-2 cursor-pointer relative"
                      >
                        <PiShoppingCartLight className=" text-3xl" />
                        <div className="h-[15px] w-[15px] rounded-full bg-primary absolute top-0 -right-1 flex items-center justify-center text-[8px] text-white">
                          {cart.length > 0 ? cart.length : 0}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
            <Categories />
          </div>
        </div>
      )}
      {isClient && isLoginOpen && (
        <SideMenuLogin
          isOpen={isLoginOpen}
          setShowLogin={setShowLogin}
          onClose={closeLoginMenu}
        />
      )}
    </div>
  );
};

export default NavbarClient;










