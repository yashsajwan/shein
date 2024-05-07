import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../../../../utils/getQueryClient";
import Hydrate from "../../../../../../../utils/hydrate.client";
import { fetchCategoryProducts } from "../../../../../../../utils/databaseService";
import CategoryProductComponent from "../../../../../../../components/categoryProduct/CategoryProductComponent";
// import { fetchCategoryProducts } from "@/utils/databaseService";
// import Productsidecomponent from "@/components/productsidecomponent/Productsidecomponent";

const SubCategoryProducts = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["shop", "category", params?.slug, params?.subCategorySlug],
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
        queryKey={["shop", "category", params?.slug, params?.subCategorySlug]}
      />
    </Hydrate>
  );
};

export default SubCategoryProducts;
