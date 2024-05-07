import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../../../../../utils/getQueryClient";
import Hydrate from "../../../../../../../../utils/hydrate.client";
import CategoryProductComponent from "../../../../../../../../components/categoryProduct/CategoryProductComponent";
import { fetchCategoryProducts } from "../../../../../../../../utils/databaseService";
// import { fetchCategoryProducts } from "@/utils/databaseService";
// import Productsidecomponent from "@/components/productsidecomponent/Productsidecomponent";

const SubSubCategoryProducts = async ({ params }: any) => {
  const queryClient: any = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      "shop",
      "category",
      params?.slug,
      params?.subCategorySlug,
      params?.subSubCategorySlug,
    ],
    queryFn: () =>
      fetchCategoryProducts({
        slug: params?.slug,
        subCatSlug: params?.subCategorySlug,
        subSubCatSlug: params?.subSubCategorySlug,
      }),
    cacheTime: 60 * 60 * 3,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <CategoryProductComponent
        params={params}
        queryKey={[
          "shop",
          "category",
          params?.slug,
          params?.subCategorySlug,
          params?.subSubCategorySlug,
        ]}
      />
    </Hydrate>
  );
};

export default SubSubCategoryProducts;
