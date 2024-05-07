"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCategories } from "../../../utils/databaseService";
import Loading from "../../loading";
import CategoryCard from "../../../components/categoryCard/CategoryCard";

const SubCategoryClient = ({ params }: any) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  // console.log(
  //   "Checing",
  //   categories?.filter((cat) => cat?.category?.slug?.name === params?.slug)
  // );

  function renderData() {
    if (params?.subCategorySlug && params?.slug) {
      return (
        <>
          <h1 className="text-lg md:text-4xl font-semibold">
            {
              categories
                ?.filter((cat) => cat?.category?.slug?.name === params?.slug)[0]
                ?.subcategories?.filter(
                  (subCat) => subCat?.slug?.name === params?.subCategorySlug
                )[0]?.name
            }
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 sm:gap-x-10 gap-x-2 sm:gap-y-10 gap-y-5">
            {categories
              ?.filter((cat) => cat?.category?.slug?.name === params?.slug)[0]
              ?.subcategories?.filter(
                (subSub) => subSub?.slug?.name === params?.subCategorySlug
              )[0]
              ?.subSubCategories?.map((subCat) => {
                return (
                  <CategoryCard
                    cat={subCat}
                    heading={subCat?.name}
                    slug={subCat?.slug?.name}
                    path={
                      subCat?.isSubcategories
                        ? `/category/${params?.slug}/${params?.subCategorySlug}/${subCat?.slug?.name}`
                        : `/shop/category/${params?.slug}/${params?.subCategorySlug}/${subCat?.slug?.name}`
                    }
                  />
                );
              })}
          </div>
        </>
      );
    }
    if (params?.slug) {
      return (
        <>
          <h1 className="text-lg md:text-4xl font-semibold">
            {
              categories?.filter(
                (cat) => cat?.category?.slug?.name === params?.slug
              )[0]?.category?.name
            }
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 sm:gap-x-10 gap-x-2 sm:gap-y-10 gap-y-5">
            {categories
              ?.filter((cat) => cat?.category?.slug?.name === params?.slug)[0]
              ?.subcategories?.map((subCat) => {
                return (
                  <CategoryCard
                    cat={subCat}
                    heading={subCat?.name}
                    slug={subCat?.slug?.name}
                    path={
                      subCat?.isSubcategories
                        ? `/category/${params?.slug}/${subCat?.slug?.name}`
                        : `/shop/category/${params?.slug}/${subCat?.slug?.name}`
                    }
                  />
                );
              })}
          </div>
        </>
      );
    }

    return <></>;
  }

  return (
    <div className="flex flex-col px-body py-6">
      {!categories && isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        renderData()
      )}
    </div>
  );
};

export default SubCategoryClient;
