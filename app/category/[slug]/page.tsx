import React from 'react'
import Hydrate from "../../../utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../utils/getQueryClient";
import SubCategoryClient from "./SubCategoryClient";

const Category = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <SubCategoryClient params={params} />
    </Hydrate>
  );
};

export default Category;
