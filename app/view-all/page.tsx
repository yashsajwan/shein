"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchHomeSections } from "../../utils/databaseService";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import ProductCarouselCard from "../../components/HomePage/productCarouselCard/ProductCarouselCard";

const page = async ({ searchParams }) => {
  console.log({ searchParams });
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
    cacheTime: 180,
  });
console.log(searchParams,"searchParams");

  function renderData() {
    if (searchParams?.type === "categories") {
      return (
        <div className="grid xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-x-10 gap-x-2 sm:gap-y-10 gap-y-5 relative z-10 ">
          {homeData &&
            homeData?.data?.filter(
              (val: any) => val?.id === searchParams?.id
            ) &&
            homeData?.data?.filter((val) => val?.id === searchParams?.id) &&
            homeData?.data
              ?.filter((val: any) => val?.id === searchParams?.id)[0]
              ?.arr?.map((category, idx) => {
                return (
                  <div className="" key={idx}>
                    <CategoryCard
                      cat={category}
                      heading={category?.name}
                      slug={category?.slug?.name}
                      path={
                        category?.isSubcategories
                          ? `/category/${category?.slug?.name}`
                          : `/shop/category/${category?.slug?.name}`
                      }
                    />
                  </div>
                );
              })}
        </div>
      );
    }
    if (searchParams?.type === "product-carousel" ||searchParams?.type === "product-list"  ) {
      return (
        <div className="grid xl:grid-cols-4  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-x-6w gap-x-2 sm:gap-y-10 gap-y-5">
          {homeData &&
            homeData?.data?.filter(
              (val: any) => val?.id === searchParams?.id
            ) &&
            homeData?.data?.filter((val) => val?.id === searchParams?.id) &&
            homeData?.data
              ?.filter((val: any) => val?.id === searchParams?.id)[0]
              ?.arr?.map((productData, idx) => {
                return (
                  <div className="" key={idx}>
                    <ProductCarouselCard
                      product={{
                        ...productData?.data,
                        ...productData,
                        data: null,
                      }}
                      id={productData?.id}
                    />
                  </div>
                );
              })}
        </div>
      );
    }
    return <></>;
  }

  return (
    <div className="flex flex-col py-5 px-body">
      <div className="flex justify-center py-4">
        <h1 className="text-center sm:text-3xl text-xl font-bold">
          {searchParams?.name || ""}
        </h1>
      </div>

      {renderData()}
    </div>
  );
};

export default page;
