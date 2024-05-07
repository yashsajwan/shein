import React from "react";
import getQueryClient from "../../../../../../utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../../../../../../utils/hydrate.client";
import SubCategoryClient from "../../../../[slug]/SubCategoryClient";
export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const id = params?.slug;
  // const { name }: any = await fetchBySlug({
  //   collectionName: "categories",
  //   collectionSlug: id,
  //   subCollection: "subcategories",
  //   subCollectionSlug: params?.subCategorySlug,
  // });

  // return {
  //   title: name ,
  // };
}

const SubCategory = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SubCategoryClient params={params} />
    </Hydrate>
  );
};

{
  /* <CategoryProductComponent params={params} /> */
}

export default SubCategory;
