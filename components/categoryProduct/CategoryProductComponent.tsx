"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchCategoryProducts, fetchFiltersData } from "../../utils/databaseService";
import FilterSection from "./filterSections";
import ProductCard from "./productCard";
import { useMediaQuery, Skeleton } from "@mui/material";
import { constant } from "../../utils/constants";
import { getFilteredProducts, getOtherFilteredProducts } from "../../utils/utilities";

const CategoryProductComponent = ({ params, queryKey = [] }: any) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const [filters, setFiters] = useState(constant.filters);
  const [minMax, setMinMax] = useState(null);
  const [products, setProducts] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterSelected, setFilterSelected] = useState<{ [key: string]: string[] }>({});

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
      otherFilters: data
    })
    setFilteredProducts(result)
  };

  const clearFilterHandler = async (data) => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
      setFilterSelected(initialFilterState)
    }
  };

  useEffect(() => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
      setFilterSelected(initialFilterState)
    }
  }, [filtersData])

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const result = await getOtherFilteredProducts({
          filters: filters,
          products: categoryProducts?.products,
          otherFilters: filterSelected,
        });
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
      })
      setFilteredProducts(result)
      if (!filters.price) {
        setFiters({ ...filters, price: categoryProducts?.minMax });
      }
    }
  }, [categoryProducts, filters]);

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
          {matches && (
            <>
              <div className="flex justify-between mt-4 mb-5 items-center border border-[#EEF0F5] px-5 py-4">
                <h4 className=" text-sm font-medium  ">
                  {filteredProducts && filteredProducts.length}{" "}Items Found
                </h4>
              </div>
            </>
          )}
          {categoryProducts&&filteredProducts?.length === 0 ? (
            <div className="w-full flex justify-center items-center py-20 lg:py-32">
              <h2 className="font-semibold md:text-xl text-base">No Products Found !</h2>
            </div>
          ) :
            (<div className="w-full  grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 grid sm:gap-y-8 gap-y-4  md:mb-10   ">
              {categoryProducts &&
                filteredProducts.map((product: any) => {
                  return <ProductCard product={product} key={product?.id} />;
                })
              }
            </div>)
          }
        </div>
      </div>

    </div>
  );
};

export default CategoryProductComponent;


