"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import FlatIcon from "../../flatIcon/flatIcon";
import Image from "next/image";
interface Props {
  type: string;
  categories?: any;
  subCategories?: any;
  hoveredCategory?: any;
  setHoveredCategory?: any;
}
const CategoriesBar: FC<Props> = ({
  type,
  categories = null,
  hoveredCategory = 0,
  setHoveredCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const style =
    "flex items-center justify-between gap-2 font-bold lg:text-base text-sm lg:px-[20px] px-[10px] py-2 cursor-pointer";
  const style2 = "font-semibold lg:text-base text-sm lg:px-[20px] px-[10px]";
  if (hoveredCategory === null) return <></>;
  if (hoveredCategory === "shopby") {
    return SubSubCategoryRender(
      categories,
      setSelectedCategory,
      setHoveredCategory,
      selectedCategory
    );
  }
  return (
    <div className="absolute left-0 w-[98.75vw]  right-0  flex justify-center rounded-b-lg min-w-[100%]  mx-auto   z-30 ">
      <div
        className="flex justify-center gap-x-12 px-[4%] w-[100%]  bg-white z-30  shadow-lg rounded-b-lg "
        onMouseLeave={() => {
          setHoveredCategory(null);
        }}
      >
        <div className=" py-4 rounded-bl-lg  max-h-[400px] flex flex-row gap-12  ">
          {categories[hoveredCategory]?.subcategories?.map((subCat) => {
            return (
              <div className="flex flex-col ">
                <Link
                  href={
                    subCat?.isSubcategories
                      ? `/category/${categories[hoveredCategory]?.category?.slug?.name}/${subCat?.slug?.name}`
                      : `/shop/category/${categories[hoveredCategory]?.category?.slug?.name}/${subCat?.slug?.name}`
                  }
                  className={`${subCat?.isSubcategories ? "" : "mb-1"}`}
                  key={subCat?.id}
                  onClick={() => setHoveredCategory(null)}
                >
                  <div
                    className={` w-auto flex items-center justify-between px-2 gap-6   hover:bg-white`}
                  >
                    <h2 className="whitespace-nowrap font-semibold text-lg hover:text-primary">
                      {subCat?.name}
                    </h2>
                  </div>
                </Link>
                {subCat?.isSubcategories &&
                  subCat?.subSubCategories &&
                  subCat?.subSubCategories.length > 0 &&
                  subCat?.subSubCategories.map((subSubCat, index) => {
                    return (
                      <Link
                        href={`/shop/category/${categories[hoveredCategory]?.category?.slug?.name}/${subCat?.slug?.name}/${subSubCat?.slug?.name}`}
                        key={subSubCat?.id}
                        className={`${
                          index + 1 === subCat?.subSubCategories?.length &&
                          "mb-2"
                        }`}
                        onClick={() => setHoveredCategory(null)}
                      >
                        <div
                          className={`mt-1 w-auto flex items-center justify-between px-2   hover:bg-white`}
                        >
                          <h2 className="whitespace-nowrap text-base hover:text-primary">
                            {subSubCat?.name}
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              // </div>
            );
          })}
        </div>
        {categories[hoveredCategory]?.category?.banner &&
          categories[hoveredCategory]?.category?.banner?.url && (
            // <div className="bg-yellow-400  w-[25%] max-h-[400px] rounded-br-lg flex flex-col items-center justify-center p-8 mr-6  ">
              <div className=" h-[350px] w-[350px]  flex items-center justify-center object-contain my-4">
                <Image
                  src={categories[hoveredCategory]?.category?.banner?.url}
                  alt={categories[hoveredCategory]?.category?.name}
                  width={500}
                  height={500}
                  className="w-[100%] h-[100%] object-cover "
                />
              </div>
            // </div>
          )}
      </div>
    </div>
  );
};
export default CategoriesBar;
function SubSubCategoryRender(
  categories: any,
  setSelectedCategory: React.Dispatch<any>,
  setHoveredCategory: any,
  selectedCategory: any
): React.ReactNode {
  return (
    <div className="absolute left-0  w-[90vw]   min-w-[100%]  z-30">
      <div className="flex  gap-2 absolute left-0 w-auto  min-w-[100%]  bg-white shadow-lg rounded-b-lg">
        <div className=" w-fit py-[0px] flex flex-col  bg-[#ECECEC] rounded-b-lg">
          {categories &&
            categories?.map((categoryData, idx) => {
              let category = categoryData?.category;
              return (
                <div
                  key={category?.id}
                  className="relative"
                  onMouseEnter={() => {
                    setSelectedCategory(idx);
                  }}
                  // onMouseLeave={() => setSelectedCategory(null)}
                >
                  <Link
                    href={
                      category?.isSubcategories
                        ? `/category/${category?.slug?.name}`
                        : `/shop/category/${category?.slug?.name}`
                    }
                    key={idx}
                    onClick={() => setHoveredCategory(null)}
                  >
                    <div
                      className={`relative w-auto flex items-center justify-between px-2 gap-6 py-2  hover:bg-white`}
                    >
                      <h2 className="whitespace-nowrap">{category?.name}</h2>
                      {category?.isSubcategories && (
                        <span>
                          <FlatIcon className={"flaticon-arrow-right"} />
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col  flex-wrap max-h-[400px] px-2 py-2">
          {categories[selectedCategory]?.subcategories?.map((subCat) => {
            return (
              <div className="flex flex-col flex-wrap max-h-[400px] mt-2">
                <Link
                  href={
                    subCat?.isSubcategories
                      ? `/category/${categories[selectedCategory]?.category?.slug?.name}/${subCat?.slug?.name}`
                      : `/shop/category/${categories[selectedCategory]?.category?.slug?.name}/${subCat?.slug?.name}`
                  }
                  key={subCat?.id}
                  onClick={() => setHoveredCategory(null)}
                >
                  <div
                    className={` w-auto flex items-center justify-between px-2 gap-6   hover:bg-white`}
                  >
                    <h2 className="whitespace-nowrap font-semibold text-base hover:text-primary">
                      {subCat?.name}
                    </h2>
                  </div>
                </Link>
                {subCat?.isSubcategories &&
                  subCat?.subSubCategories &&
                  subCat?.subSubCategories.length > 0 &&
                  subCat?.subSubCategories.map((subSubCat) => {
                    return (
                      <Link
                        href={`/shop/category/${categories[selectedCategory]?.category?.slug?.name}/${subCat?.slug?.name}/${subSubCat?.slug?.name}`}
                        key={subSubCat?.id}
                        onClick={() => setHoveredCategory(null)}
                      >
                        <div
                          className={`mt-1 w-auto flex items-center justify-between px-2   hover:bg-white`}
                        >
                          <h2 className="whitespace-nowrap text-sm hover:text-primary">
                            {subSubCat?.name}
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}