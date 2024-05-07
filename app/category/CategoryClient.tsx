"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCategories } from "../../utils/databaseService";
import Loading from "../loading";
import CategoryCard from "../../components/categoryCard/CategoryCard";

const CategoryClient = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
  return (
    <div className="flex flex-col px-body py-6">
      {!categories && isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <h1 className="text-lg md:text-4xl font-semibold">Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4 sm:gap-x-10 gap-x-2 sm:gap-y-10 gap-y-5">
            {categories?.map((category) => {
              return (
                <CategoryCard
                  cat={category?.category}
                  heading={category?.category?.name}
                  slug={category?.category?.slug?.name}
                  path={`${
                    category?.category?.isSubcategories
                      ? "/category"
                      : "/shop/category"
                  }/${category?.category?.slug?.name}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryClient;
