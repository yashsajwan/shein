import Link from "next/link";
import { openLoginModal } from "../../redux/slices/loginModalSlice";
import FlatIcon from "../flatIcon/flatIcon";
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, getStoreDetails } from "../../utils/databaseService";
import { useState } from "react";
import OutsideClickHandler from "../../utils/OutsideClickHandler";
import { auth } from "../../config/firebase-config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";

import { getUserData } from "../../utils/databaseService";
import { getCookie } from "cookies-next";

const social = [
  {
    iconName: "flaticon-facebook",
    name: "Facebook",
    key: "facebookUrl",
  },
  {
    iconName: "flaticon-youtube",
    name: "Youtube",
    key: "youtubeUrl",
  },
  {
    iconName: "flaticon-instagram",
    name: "Instagram",
    key: "instagramUrl",
  },
  {
    iconName: "flaticon-twitter",
    name: "Twitter",
    key: "twitterUrl",
  },
  {
    name: "Tiktok",
    key: "tiktokUrl",
  },
  {
    name: "Linkedin",
    key: "linkedinUrl",
  },
];

function SidebarDrawer(props) {
  const browse2 = [
    {
      name: "Login",
      path: "/profile",
      tab: null,
    },
  ];
  const browse = [
    {
      name: "Profile",
      path: "/profilepage",
      tab: 1,
    },
    {
      name: "My Account",
      path: "/profilepage",
      tab: 6,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      tab: null,
    },
    {
      name: "My Orders",
      path: "/profilepage",
      tab: 2,
    },
    {
      name: "Logout",
      path: "/",
      tab: null,
    },
  ];

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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
  const { data: storeData } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () => getStoreDetails(),
    keepPreviousData: true,
  });
  // console.log(storeData,"----------");

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookies),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isShopByOpen, setIsShopByOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const cookies = { value: getCookie("uid") };

  return (
    <div
      className={`h-[100vh]  w-[100vw] bg-[rgba(0,0,0,0.5)]  fixed top-0 left-0 z-30 ${
        !props.isMobile && "hidden"
      }`}
    >
      <Transition
        show={props.isMobile}
        enter="transition-transform ease-in-out duration-200"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        className={`z-40 relative h-[100vh] rounded-br-md overflow-y-auto`}
        leave="transition-transform ease-in-out duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div
          onClick={() => {
            props.setIsMobile(false);
            document.body.classList.remove("no-scroll");
          }}
          className="absolute top-[14px] right-3 rounded-full ml-4  z-50 "
        >
          <FlatIcon className="flaticon-close text-2xl text-white " />
        </div>
        <OutsideClickHandler
          onClick={() => {
            document.body.classList.remove("no-scroll");
            props.setIsMobile(false);
          }}
        >
          <div
            className={`  bg-white overflow-y-auto h-full rounded-br-md  sm:w-[50%] w-[86%] absolute top-0 left-0  z-30  `}
          >
            <div className="flex flex-col gap-2 relative ">
              <div className="flex flex-col gap-3 py-3">
                {/* <div className="px-3 flex flex-col justify-start">
                  <div
                    className="flex justify-between w-full"
                    onClick={() => {
                      if (isShopByOpen) {
                        setIsShopByOpen(false);
                      } else {
                        setIsShopByOpen(true);
                      }
                    }}
                  >
                    <p className="font-[600] ">Shop by Category</p>
                    <FlatIcon
                      className={`flaticon-arrow-right transition-all ease-in ${
                        isShopByOpen ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </div>

                  <Transition
                    show={isShopByOpen}
                    enter="transition-all ease-in-out duration-200"
                    enterFrom=" opacity-0 h-20"
                    enterTo=" opacity-100 h-full"
                    className={`z-40 `}
                    leave="transition-all ease-in-out duration-200"
                    leaveFrom=" opacity-100 h-full"
                    leaveTo=" opacity-0 h-0"
                  >
                    <div className="flex flex-col gap-2 py-1 pl-3">
                      {categories &&
                        categories?.slice(6)?.map((category) => {
                          return (
                            <div
                              key={category?.category?.id}
                              className="flex flex-col justify-start"
                            >
                              <div
                                className="flex justify-between w-full"
                                onClick={() => {
                                  if (
                                    selectedCategory &&
                                    selectedCategory === category?.category?.id
                                  ) {
                                    setSelectedCategory(null);
                                  } else {
                                    setSelectedCategory(category?.category?.id);
                                  }
                                }}
                              >
                                <Link
                                  className="flex justify-between w-full"
                                  onClick={(e) => {
                                    if (category?.category?.isSubcategories) {
                                      e.preventDefault();
                                    } else {
                                      props.setIsMobile(false);
                                      document.body.classList.remove(
                                        "no-scroll"
                                      );
                                      setSelectedCategory(null);
                                      setSelectedSubCategory(null);
                                    }
                                  }}
                                  href={`/shop/category/${category?.category?.slug?.name}`}
                                >
                                  <p className="">{category?.category?.name}</p>
                                  {category?.category?.isSubcategories && (
                                    <FlatIcon
                                      className={`flaticon-arrow-right transition-all ease-in ${
                                        selectedCategory ===
                                        category?.category?.id
                                          ? "-rotate-90"
                                          : "rotate-90"
                                      }`}
                                    />
                                  )}
                                </Link>
                              </div>

                              
                              <Transition
                                show={
                                  selectedCategory === category?.category?.id &&
                                  category?.category?.isSubcategories
                                }
                                enter="transition-all ease-in-out duration-200"
                                enterFrom=" opacity-0 h-20"
                                enterTo=" opacity-100 h-full"
                                className={`z-40 `}
                                leave="transition-all ease-in-out duration-200"
                                leaveFrom=" opacity-100 h-full"
                                leaveTo=" opacity-0 h-0"
                              >
                                <div className="flex flex-col gap-2 py-1 pl-3">
                                  {category?.subcategories?.map((subCat) => {
                                    return (
                                      <div
                                        key={category?.category?.id}
                                        className=" flex flex-col justify-start"
                                      >
                                        <div
                                          className="flex justify-between w-full"
                                          onClick={() => {
                                            if (selectedSubCategory) {
                                              setSelectedSubCategory(null);
                                            } else {
                                              setSelectedSubCategory(
                                                subCat?.id
                                              );
                                            }
                                          }}
                                        >
                                          <Link
                                            className="flex justify-between w-full"
                                            onClick={(e) => {
                                              if (subCat.isSubcategories) {
                                                e.preventDefault();
                                              } else {
                                                props.setIsMobile(false);
                                                document.body.classList.remove(
                                                  "no-scroll"
                                                );
                                                setSelectedCategory(null);
                                                setSelectedSubCategory(null);
                                              }
                                            }}
                                            href={`/shop/category/${category?.category?.slug?.name}/${subCat?.slug?.name}`}
                                          >
                                            <p>{subCat?.name}</p>
                                            {subCat.isSubcategories && (
                                              <FlatIcon
                                                className={`flaticon-arrow-right transition-all ease-in ${
                                                  selectedSubCategory ===
                                                  subCat?.id
                                                    ? "-rotate-90"
                                                    : "rotate-90"
                                                }`}
                                              />
                                            )}
                                          </Link>
                                        </div>

                                        <Transition
                                          show={
                                            selectedSubCategory ===
                                              subCat?.id &&
                                            subCat?.isSubcategories
                                          }
                                          enter="transition-all ease-in-out duration-200"
                                          enterFrom=" opacity-0 h-20"
                                          enterTo=" opacity-100 h-full"
                                          className={`z-40 `}
                                          leave="transition-all ease-in-out duration-200"
                                          leaveFrom=" opacity-100 h-full"
                                          leaveTo=" opacity-0 h-0"
                                        >
                                          <div className="flex flex-col gap-2 py-1 pl-3">
                                            {subCat.subSubCategories?.map(
                                              (subSubCat) => {
                                                return (
                                                  <div className="flex justify-between w-full">
                                                    <Link
                                                      onClick={() => {
                                                        props.setIsMobile(
                                                          false
                                                        );
                                                        document.body.classList.remove(
                                                          "no-scroll"
                                                        );
                                                        setSelectedCategory(
                                                          null
                                                        );
                                                        setSelectedSubCategory(
                                                          null
                                                        );
                                                      }}
                                                      className="flex justify-between w-full"
                                                      href={`/shop/category/${category?.category?.slug?.name}/${subCat?.slug?.name}/${subSubCat?.slug?.name}`}
                                                    >
                                                      <p>{subSubCat?.name}</p>
                                                      {subSubCat.isSubcategories && (
                                                        <FlatIcon
                                                          className={`flaticon-arrow-right transition-all ease-in`}
                                                        />
                                                      )}
                                                    </Link>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </Transition>
                                      </div>
                                    );
                                  })}
                                </div>
                              </Transition>
                            </div>
                          );
                        })}
                    </div>
                  </Transition>
                </div> */}

                {/* Dynamic Categories */}
                {categories &&
                  categories?.slice(0)?.map((category) => {
                    return (
                      <div
                        key={category?.category?.id}
                        className="px-3 flex flex-col justify-start "
                      >
                        <div
                          className="flex justify-between w-full"
                          onClick={() => {
                            if (
                              selectedCategory &&
                              selectedCategory === category?.category?.id
                            ) {
                              setSelectedCategory(null);
                            } else {
                              setSelectedCategory(category?.category?.id);
                            }
                          }}
                        >
                          <Link
                            className="flex justify-between w-full"
                            onClick={(e) => {
                              if (category?.category?.isSubcategories) {
                                e.preventDefault();
                              } else {
                                props.setIsMobile(false);
                                document.body.classList.remove("no-scroll");
                                setSelectedCategory(null);
                                setSelectedSubCategory(null);
                              }
                            }}
                            href={`/shop/category/${category?.category?.slug?.name}`}
                          >
                            <p className="font-semibold  text-sm">
                              {category?.category?.name}
                            </p>
                            {category?.category?.isSubcategories && (
                              <FlatIcon
                                className={`flaticon-arrow-down text-sm font-bold text-black transition-all ease-in 
                                ${
                                  selectedCategory === category?.category?.id &&
                                  "rotate-180"
                                }
                                `}
                              />
                            )}
                          </Link>
                        </div>

                        {/* subCategory */}
                        <Transition
                          show={
                            selectedCategory === category?.category?.id &&
                            category?.category?.isSubcategories
                          }
                          enter="transition-all ease-in-out duration-200"
                          enterFrom=" opacity-0 h-20"
                          enterTo=" opacity-100 h-full"
                          className={`z-40 `}
                          leave="transition-all ease-in-out duration-200"
                          leaveFrom=" opacity-100 h-full"
                          leaveTo=" opacity-0 h-0"
                        >
                          {/* subsubcategory start */}
                          <div className="flex flex-col gap-2 py-1 pl-3">
                            {category?.subcategories?.map((subCat) => {
                              return (
                                <div
                                  key={category?.category?.id}
                                  className=" flex flex-col justify-start"
                                >
                                  <div
                                    className="flex justify-between w-full"
                                    onClick={() => {
                                      if (selectedSubCategory) {
                                        setSelectedSubCategory(null);
                                      } else {
                                        setSelectedSubCategory(subCat?.id);
                                      }
                                    }}
                                  >
                                    <Link
                                      className="flex justify-between w-full"
                                      onClick={(e) => {
                                        if (subCat.isSubcategories) {
                                          e.preventDefault();
                                        } else {
                                          props.setIsMobile(false);
                                          document.body.classList.remove(
                                            "no-scroll"
                                          );
                                          setSelectedCategory(null);
                                          setSelectedSubCategory(null);
                                        }
                                      }}
                                      href={`/shop/category/${category?.category?.slug?.name}/${subCat?.slug?.name}`}
                                    >
                                      <p className="">{subCat?.name}</p>
                                      {subCat.isSubcategories && (
                                        <FlatIcon
                                          className={`flaticon-arrow-down text-sm font-bold text-black transition-all ease-in ${
                                            selectedSubCategory ===
                                              subCat?.id && "rotate-180"
                                          }`}
                                        />
                                      )}
                                    </Link>
                                  </div>

                                  <Transition
                                    show={
                                      selectedSubCategory === subCat?.id &&
                                      subCat?.isSubcategories
                                    }
                                    enter="transition-all ease-in-out duration-200"
                                    enterFrom=" opacity-0 h-20"
                                    enterTo=" opacity-100 h-full"
                                    className={`z-40 `}
                                    leave="transition-all ease-in-out duration-200"
                                    leaveFrom=" opacity-100 h-full"
                                    leaveTo=" opacity-0 h-0"
                                  >
                                    {/* subsubcategory start */}
                                    <div className="flex flex-col gap-2 py-1 pl-3">
                                      {subCat.subSubCategories?.map(
                                        (subSubCat) => {
                                          return (
                                            <div className="flex justify-between w-full">
                                              <Link
                                                onClick={() => {
                                                  props.setIsMobile(false);
                                                  document.body.classList.remove(
                                                    "no-scroll"
                                                  );
                                                  setSelectedCategory(null);
                                                  setSelectedSubCategory(null);
                                                }}
                                                className="flex justify-between w-full"
                                                href={`/shop/category/${category?.category?.slug?.name}/${subCat?.slug?.name}/${subSubCat?.slug?.name}`}
                                              >
                                                <p className="">
                                                  {subSubCat?.name}
                                                </p>
                                                {subSubCat.isSubcategories && (
                                                  <FlatIcon
                                                    className={`flaticon-arrow-down text-sm font-bold text-black transition-all ease-in`}
                                                  />
                                                )}
                                              </Link>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                    {/* subsubcategory end */}
                                  </Transition>
                                </div>
                              );
                            })}
                          </div>
                          {/* subsubcategory end */}
                        </Transition>
                        {/* subCategory End */}
                      </div>
                    );
                  })}
                {/* Dynamic Categories END*/}
              </div>
            </div>

            <div className="flex flex-col px-3 gap-2 items-start">
              <h1 className="text-3xl mt-3 text-[#a9a9a9] font-light">
                BROWSE
              </h1>
              <div className="flex flex-col gap-2 items-start mt-1">
                {userData ? (
                  <>
                    {browse?.map((link, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            if (link.name == "Logout") {
                              handleLogout();
                            } else {
                              localStorage.setItem(
                                "tab",
                                JSON.stringify(link.tab)
                              );
                            }

                            props.setIsMobile(false);
                            document.body.classList.remove("no-scroll");

                            router.push(link.path);
                          }}
                        >
                          {link.name}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {browse2?.map((link, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            if (
                              link?.path === "/profile" &&
                              !auth.currentUser?.uid
                            ) {
                              e.preventDefault();
                              props.setIsMobile(false);
                              document.body.classList.remove("no-scroll");
                              dispatch(openLoginModal());
                              document.body.classList.add("no-scroll");
                            }
                          }}
                        >
                          {link.name}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col px-3 gap-2 items-start my-3">
              <h1 className="text-3xl mt-3 text-[#a9a9a9] font-light">
                WANT TO CHAT?
              </h1>
              <div className="flex flex-col gap-2 items-start mt-1">
                <Link
                  href={`tel:${
                    storeData && storeData?.storePhone?.split("+91")[1]
                  }`}
                >
                  Call us toll free{" "}
                  {storeData && storeData?.storePhone?.split("+91")[1]}
                </Link>
              </div>
            </div>
            <div className="flex flex-col px-3 gap-2 items-start my-3">
              <h1 className="text-3xl mt-3 text-[#a9a9a9] font-light">
                SOCIAL
              </h1>
              <div className="flex flex-col gap-2 items-start mt-1">
                {social?.map((media) => {
                  if (storeData && storeData[media.key]) {
                    return (
                      <Link
                        href={storeData[media.key]}
                        target="_blank"
                        key={media.key}
                        className="flex items-center gap-3"
                      >
                        <FlatIcon
                          className={`${media.iconName} text-2xl text-[#a9a9a9]`}
                        />
                        <p>{media.name}</p>
                      </Link>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </Transition>
    </div>
  );
}

export default SidebarDrawer;
