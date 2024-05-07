import React from "react";
import getQueryClient from "../../utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { handleTypesenseSearch } from "../../config/typesense";
import Hydrate from "../../utils/hydrate.client";
import SearchClient from "../../components/SearchClient/SearchClient";

const SearchPage = async ({ searchParams }) => {
  console.log(searchParams,"searchParams--------------------");
  
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["search", searchParams?.q],
    queryFn: () => handleTypesenseSearch(searchParams?.q),
    cacheTime: 60 * 60 * 3,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SearchClient query={searchParams?.q} />
    </Hydrate>
  );
};

export default SearchPage;
