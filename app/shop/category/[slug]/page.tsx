import React from "react";
import Hydrate from "../../../../utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../utils/getQueryClient";
import CategoryProductComponent from "../../../../components/categoryProduct/CategoryProductComponent";
import { fetchCategoryProducts } from "../../../../utils/databaseService";


const CategoryProducts = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["shop", "category", params?.slug],
    queryFn: () => fetchCategoryProducts({ slug: params?.slug }),
    cacheTime: 60 * 60 * 3,
  });

  
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <CategoryProductComponent
        params={params}
        queryKey={["shop", "category", params?.slug]}
      />
    </Hydrate>
  );
};
export default CategoryProducts;
