"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, Fragment } from "react";
import {
  fetchCategoryProducts,
  fetchFiltersData,
} from "../../utils/databaseService";
import FilterSection from "./filterSections";
import ProductCard from "./productCard";
import { useMediaQuery, Skeleton } from "@mui/material";
import { constant } from "../../utils/constants";
import {
  getFilteredProducts,
  lowToHigh,
  highToLow,
  getOtherFilteredProducts,
  whatIsNew,
  betterDiscount,
} from "../../utils/utilities";

import { Transition } from "@headlessui/react";
import Link from "next/link";
import darrow from "../../images/darrow.png";
import Image from "next/image";

const CategoryProductComponent = ({ params, queryKey = [] }: any) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const [filters, setFiters] = useState(constant.filters);
  const [minMax, setMinMax] = useState(null);
  const [products, setProducts] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterSelected, setFilterSelected] = useState<{
    [key: string]: string[];
  }>({});

  console.log("filters", filters);

  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: ["shop", "category", params?.slug],
    queryFn: () =>
      fetchCategoryProducts({
        slug: params?.slug,
        subCatSlug: params?.subCategorySlug,
        subSubCatSlug: params?.subSubCategorySlug,
      }),
  });

  const { data: filtersData } = useQuery({
    queryKey: ["filtersData"],
    queryFn: () => fetchFiltersData(),
  });

  const handleFiltersApply = async (data) => {
    const result = await getOtherFilteredProducts({
      filters: filters,
      products: categoryProducts?.products,
      otherFilters: data,
    });
    console.log("result1", result);
    setFilteredProducts(result);
  };

  const clearFilterHandler = async (data) => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(
        filtersData.map((filter) => [filter.name, []])
      );
      setFilterSelected(initialFilterState);
    }
  };

  useEffect(() => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(
        filtersData.map((filter) => [filter.name, []])
      );
      setFilterSelected(initialFilterState);
    }
  }, [filtersData]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const result = await getOtherFilteredProducts({
          filters: filters,
          products: categoryProducts?.products,
          otherFilters: filterSelected,
        });
        console.log("result2", filteredProducts);
        setFilteredProducts(result);
      } catch (error) {
        console.error("Error fetching filtered products", error);
      }
    };
    fetchFilteredProducts();
  }, [filterSelected]);

  useEffect(() => {
    if (!products) {
      setProducts(categoryProducts?.products);
    }
    if (categoryProducts) {
      setMinMax(categoryProducts?.minMax);
      const result = getFilteredProducts({
        filters: filters,
        products: categoryProducts?.products,
      });
      console.log("result3", result);
      setFilteredProducts(result);
      if (!filters.price) {
        setFiters({ ...filters, price: categoryProducts?.minMax });
      }
      console.log("filter2", filters);
    }
  }, [categoryProducts, filters]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortingTab, setSortingTab] = useState("Recommended");
  const [sortingTabValue, setSortingTabValue] = useState(0);

  useEffect(() => {
    if (!products) {
      setProducts(categoryProducts?.products);
    }
    if (categoryProducts) {
      if (sortingTabValue == 5) {
        const result = lowToHigh({
          products: categoryProducts?.products,
        });

        setFilteredProducts(result);
      } else if (sortingTabValue == 5) {
        const result = highToLow({
          products: categoryProducts?.products,
        });
        console.log("result4", result);
        setFilteredProducts(result);
      } else if (sortingTabValue == 3) {
        const result = betterDiscount({
          products: categoryProducts?.products,
        });
        console.log("result4", result);
        setFilteredProducts(result);
      } else if (sortingTabValue == 1) {
        const result = whatIsNew({
          products: categoryProducts?.products,
        });
        console.log("result4", result);
        setFilteredProducts(result);
      }
    }
  }, [sortingTab]);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col px-body   h-full  ">
      <div className="w-full flex flex-col lg:flex-row gap-x-4 gap-y-4  mb-20 pt-5 sm:pt-10 md:pt-0 ">
        {minMax && filters?.price ? (
          <FilterSection
            filters={filters}
            setFiters={setFiters}
            minMax={minMax}
            setMinMax={setMinMax}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            onhandleFiltersApply={handleFiltersApply}
            onClearFilter={clearFilterHandler}
          />
        ) : isLoading ? (
          <div className="w-full flex-[0.2] flex lg:hidden gap-4 bg-red-300">
            {isClient && (
              <Skeleton variant="rounded" animation="wave" height={600} />
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="w-full flex-1">
          <div className="px-3 mt-2">
            <div className="flex justify-end items-center py-2">
              <div className="flex  items-center">
                <h4 className="font-semibold text-base text-secondary mx-2 my-1 ">
                  Sort By{" "}
                </h4>

                <div className="flex items-center justify-center w-52 border-2 border-black">
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative text-left flex justify-center items-center group"
                  >
                    <div className=" cursor-pointer">
                      <div className="flex items-center gap-2 font-semibold mx-5 my-2">
                        {sortingTab}{" "}
                        <Image
                          alt=""
                          src={darrow}
                          height={15}
                          width={15}
                        ></Image>
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
                      <div className="z-50 absolute  mt-2 top-full w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Link
                            onClick={() => {
                              setSortingTab("Recommended");
                              setSortingTabValue(0);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Recommended
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("What's New");
                              setSortingTabValue(1);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              What's New
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("Popularity");
                              setSortingTabValue(2);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Popularity
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("Better Discount");
                              setSortingTabValue(3);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Better Discount
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("Price: High to Low");
                              setSortingTabValue(4);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Price: High to Low
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("Price: Low to High");
                              setSortingTabValue(5);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Price: Low to High
                            </button>
                          </Link>
                          <Link
                            onClick={() => {
                              setSortingTab("Customer Rating");
                              setSortingTabValue(6);
                            }}
                            href={""}
                            className=""
                          >
                            <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary  hover:bg-[#F2F7FF]">
                              Customer Rating
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {matches && (
            <>
              <div className="flex justify-between mt-4 mb-5 items-center border border-[#EEF0F5] px-5 py-4">
                <h4 className=" text-sm font-medium  ">
                  {filteredProducts && filteredProducts.length} Items Found
                </h4>
              </div>
            </>
          )}
          {categoryProducts && filteredProducts?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-20 lg:py-32">
              <h2 className="font-semibold md:text-xl text-base">
                No Products Found !
              </h2>
            </div>
          ) : (
            <div className="w-full  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 grid sm:gap-y-8 gap-y-4  md:mb-10   ">
              {categoryProducts &&
                filteredProducts.map((product: any) => {
                  return <ProductCard product={product} key={product?.id} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductComponent;
