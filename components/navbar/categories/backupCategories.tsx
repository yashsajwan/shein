"use client";
import React, { useState } from "react";
import Image from "next/image";
import image from "../../images/wdc.webp";
import OutsideClickHandler from "../../../utils/OutsideClickHandler";
import CategoriesBar from "./categoriesBar";
import whiteBg from "../../../images/Rectangle 24031.png";
import fireImg from "../../../images/fi_1685179.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../utils/databaseService";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import FlatIcon from "../../flatIcon/flatIcon";
import { Prev } from "react-bootstrap/esm/PageItem";
import PopUp from "../../popUp/PopUp";
const data = [
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
  "dfgfghfhh",
];

const Categories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const [tab, setTab] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  //  console.log(categories,);

  const handleTabClick = (tabIndex) => {
    if (tab === tabIndex) {
      setTab(0); // Close the categories if the clicked tab is already open
    } else {
      setTab(tabIndex); // Open the clicked tab
    }
  };

  return (
    <div className="w-full bg-secondary px-body relative">
      <div className=" relative   py-3.5  ">
        <OutsideClickHandler
          onClick={() => {
            // setTab(0);
          }}
        >
          <div className="   ">
            <div className="w-full mx-auto flex items-center justify-between ">
              <div className="flex items-center xl:gap-10 lg:gap-5 gap-2 ">
                <div
                  onClick={() => {
                    // handleTabClick(0);
                  }}
                  onMouseEnter={() => {
                    setTab(0);
                    setHoveredCategory("shopby");
                  }}
                  onMouseLeave={() => {
                    setTab(null);
                    setHoveredCategory(null);
                  }}
                  className={`
                   ${
                     hoveredCategory === "shopby" && ""
                   }  lg:gap-2 gap-1 items-center w-fit  hover:border-b-2  hover:border-primary  `}
                >
                  <h1 className="xl:text-sm text-xs   text-white  cursor-pointer font-medium ">
                    Whats New
                  </h1>

                  <Transition
                    appear={true}
                    show={hoveredCategory !== null && tab === 0}
                  >
                    <Transition.Child
                      className="flex flex-col absolute left-0 pt-5 w-full   z-30  transition duration-300"
                      enter="ease-in-out"
                      enterFrom=" opacity-0"
                      enterTo=" opacity-100"
                      leave="ease-out"
                      leaveFrom=" opacity-100"
                      leaveTo=" opacity-0"
                    >
                      <CategoriesBar
                        type={
                          hoveredCategory === "shopby" ? hoveredCategory : null
                        }
                        categories={categories}
                        hoveredCategory={hoveredCategory}
                      />
                    </Transition.Child>
                  </Transition>
                </div>
                {categories &&
                  categories.length > 0 &&
                  categories.map((categoryData, index) => {
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
                          setTab(null);

                          if (category?.isSubcategories) {
                            setHoveredCategory(null);
                          } else {
                            setHoveredCategory(null);
                          }
                        }}
                        className={`
                     lg:gap-2 gap-1 items-center w-fit  hover:border-b-2 hover:border-primary `}
                      >
                        <Link
                          href={`/category-product/${category?.slug?.name}`}
                        >
                          <h1 className="xl:text-sm text-xs  text-white  cursor-pointer font-medium">
                            {category.name}
                          </h1>
                        </Link>
                        <Transition
                          appear={true}
                          show={hoveredCategory !== null && tab === index + 1}
                        >
                          <Transition.Child
                            className="flex flex-col absolute left-0 pt-5 w-full   z-30  transition duration-300"
                            enter="ease-in-out"
                            enterFrom=" opacity-0"
                            enterTo=" opacity-100"
                            leave="ease-out"
                            leaveFrom=" opacity-100"
                            leaveTo=" opacity-0"
                          >
                            <CategoriesBar
                              type={
                                hoveredCategory === "shopby"
                                  ? hoveredCategory
                                  : null
                              }
                              categories={categories}
                              hoveredCategory={hoveredCategory}
                            />
                          </Transition.Child>
                        </Transition>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
      <div className="absolute right-0 bottom-0   bg-primary cursor-pointer rounded-tl-full rounded-bl-full">
        <div
          // onClick={()=>{
          //   setShowPopUp((prev)=>!prev)
          // }}
          className="flex item-center justify-center lg:gap-2 gap-1  text-white   font-medium  lg:px-14  px-3 xl:text-sm text-xs"
        >
          <p className="py-3.5 ">Men&apos;s Wear</p>
          {/* <div className="py-3.5 border border-primary  "> */}
          <FlatIcon className="flaticon-arrow text-white text-sm font-semibold rotate-180 " />
          {/* </div> */}

          {/* <div className="py-3.5 border border-[#0092FF] ">right arrow</div> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
