"use client";
import React, { FC, useState } from "react";
import image from "../../images/wdc.webp";
import Image from "next/image";
import Link from "next/link";
import FlatIcon from "../../flatIcon/flatIcon";
interface Props {
  type: string;
  categories?: any;
  subCategories?: any;
  hoveredCategory?: any;
}
const CategoriesBar: FC<Props> = ({
  type,
  categories = null,
  hoveredCategory = 0,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(hoveredCategory);

  const style =
    "flex items-center justify-between gap-2 font-bold lg:text-base text-sm lg:px-[20px] px-[10px] py-2 cursor-pointer";
  const style2 = "font-semibold lg:text-base text-sm lg:px-[20px] px-[10px]";

  return (
    <div className="absolute left-0  w-full   z-30">
      <div className="flex justify-between gap-2 absolute left-0  w-full  bg-white shadow-lg">
        {type === "shopby" && (
          <div className=" w-[25%] py-[20px] flex flex-col   bg-[#ececec]">
            {categories &&
              categories?.map((categoryData: any, idx: any) => {
                let category = categoryData?.category;
                return (
                  <Link
                    href={`/category-product/${category?.slug?.name}`}
                    key={idx}
                  >
                    <div
                      className={`${style} hover:bg-white`}
                      onMouseEnter={() => {
                        setSelectedCategory(idx);
                      }}
                    >
                      <h2>{category?.name}</h2>
                      {category?.isSubcategories && (
                        <span>
                          <FlatIcon className={"flaticon-arrow-right"} />
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        )}

        {/* <div className="flex flex-col h-[500px]  flex-wrap  w-[80%] p-[20px]">
          {categories &&
            categories[selectedCategory]?.subcategories &&
            categories[selectedCategory]?.subcategories.map((subCat, index) => {
              return (
                <div key={index}>
                  <p className="lg:text-sm text-xs">{subCat?.name}</p>
                </div>
              );
            })}
        </div> */}
      </div>
    </div>
  );
};
export default CategoriesBar;
