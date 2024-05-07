"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import image from "../../images/wdc.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutsideClickHandler from "../../../utils/OutsideClickHandler";
import whiteBg from "../../../images/Rectangle 24031.png";
import fireImg from "../../../images/fi_1685179.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../utils/databaseService";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import CategoriesBar from "./categoriesBar";
import FlatIcon from "../../flatIcon/flatIcon";

const Categories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const [tab, setTab] = useState(0);
  const [catquan, setcatquan] = useState(5);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categorycheck1 = useMediaQuery("(max-width:600px)");
  const categorycheck2 = useMediaQuery("(max-width:655px)");
  const categorycheck3 = useMediaQuery("(max-width:1260px)");
  const categorycheck4 = useMediaQuery("(max-width:1390px)");
  const hovershow = useMediaQuery("(max-width:975px)");

  // console.log("categorycheck1",categorycheck1);
  // console.log("categorycheck2",categorycheck2);
  // console.log("categorycheck3",categorycheck3);
  // console.log("categorycheck4",categorycheck4);
  useEffect(() => {}, []);

  const handleTabClick = (tabIndex) => {
    if (tab === tabIndex) {
      setTab(0); // Close the categories if the clicked tab is already open
    } else {
      setTab(tabIndex); // Open the clicked tab
    }
  };

  return (
    <div className=" relative  py-3.5  w-[100%] mx-auto  bg-black px-body ">
      <OutsideClickHandler
        onClick={() => {
          // setTab(0);
        }}
      >
        <div className="  flex justify-center ">
          <div className="w-full mx-auto flex items-center justify-center gap-5  ">
            <div className="flex items-center lg:gap-7 md:gap-3 gap-5  ">
             

             
              {categories
                ?.slice(
                  0,
                  categorycheck1
                    ? 3
                    : categorycheck2
                    ? 6
                    : categorycheck3
                    ? 9
                    : categorycheck4
                    ? 10
                    : 12
                )
                .map((categoryData, index) => {
                  let category = categoryData?.category;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        // handleTabClick(index + 1);
                      }}
                      onMouseEnter={() => {
                        if (
                          category?.isSubcategories &&
                          categoryData?.subcategories &&
                          categoryData?.subcategories?.length !== 0
                        ) {
                          setTab(index + 1);
                          setHoveredCategory(index);
                        } else {
                          setHoveredCategory(null);
                        }
                      }}
                      onMouseLeave={() => {
                        // setHoveredCategory(null);
                        // setTab(null);
                        // setTab(null);
                        // if (category?.isSubcategories) {
                        //   setHoveredCategory(null);
                        // } else {
                        //   setHoveredCategory(null);
                        // }
                      }}
                      className={`
                     lg:gap-2 gap-1 items-center w-fit  border-b-2 border-black hover:border-primary   `}
                    >
                      <Link
                        href={
                          category?.isSubcategories &&
                          categoryData?.subcategories?.length !== 0
                            ? `/category/${category?.slug?.name}`
                            : `/shop/category/${category?.slug?.name}`
                        }
                        onClick={() => {
                          setHoveredCategory(null);
                        }}
                      >
                        <h1 className="text-xs lg:text-sm text-white font-medium cursor-pointer">
                          {category.name}
                        </h1>
                      </Link>
                      {!hovershow ? (
                        <Transition
                          appear={true}
                          show={hoveredCategory !== null && tab === index + 1}
                        >
                          <Transition.Child
                            className="flex flex-col absolute left-0 pt-3    z-30  transition duration-300"
                            enter="ease-in-out"
                            enterFrom=" opacity-0"
                            enterTo=" opacity-100"
                            leave="ease-out"
                            leaveFrom=" opacity-100"
                            leaveTo=" opacity-0"
                          >
                            <OutsideClickHandler
                              onClick={() => {
                                setHoveredCategory(null);
                                setTab(null);
                              }}
                              onMouseLeave={() => {
                                setHoveredCategory(null);
                                setTab(null);
                              }}
                            >
                              <CategoriesBar
                                type={
                                  hoveredCategory === "shopby"
                                    ? hoveredCategory
                                    : null
                                }
                                categories={categories}
                                hoveredCategory={hoveredCategory}
                                setHoveredCategory={setHoveredCategory}
                              />
                            </OutsideClickHandler>
                          </Transition.Child>
                        </Transition>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
            </div>
            {/* <div className="absolute right-0 bottom-0 top-0 my-auto   bg-primary cursor-pointer rounded-tl-full rounded-bl-full">
              <div
                className="flex item-center justify-center lg:gap-2 gap-1  text-white   font-medium  lg:px-14  px-3 xl:text-sm text-xs"
              >
                <p className="py-3.5 ">Men&apos;s Wear</p>
                <FlatIcon className="flaticon-arrow text-white text-sm font-semibold rotate-180 " />

              </div>
            </div> */}
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Categories;
