import React from "react";
import getQueryClient from "../../../utils/getQueryClient";
import { fetchSingleProduct } from "../../../utils/databaseService";
import Hydrate from "../../../utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import ProductInfo from "../../../components/singleProduct/ProductInfo";

const ProductInfoPage = async ({ params }) => {    
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", params?.slug],
    queryFn: () => fetchSingleProduct(params?.slug),
    cacheTime: 60 * 60 * 3,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ProductInfo params={params} />
    </Hydrate>
  );
};

export default ProductInfoPage;
