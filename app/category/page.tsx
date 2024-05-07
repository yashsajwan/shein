import React from "react";
import getQueryClient from "../../utils/getQueryClient";
import { fetchCategories } from "../../utils/databaseService";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../../utils/hydrate.client";
import CategoryClient from "./CategoryClient";

const CategoryPage = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <CategoryClient />
      {/* <CategoryClient params={params} /> */}
    </Hydrate>
  );
};

export default CategoryPage;
