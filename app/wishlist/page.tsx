import React from "react";
import WishlistComponent from "../../components/WishlistComponent/WishlistComponent";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { cookies } from "next/dist/client/components/headers";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, getUserWishlistData2 } from "../../utils/databaseService";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../utils/getQueryClient";
import Hydrate from "../../utils/hydrate.client";

const WishListPage = async () => {
  const cookie = cookies().get("uid");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["wishlistData-products"], () =>
    getUserWishlistData2(cookie)
  );
  const dehydratedState = dehydrate(queryClient);
  // const { data: userData } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: () => getUserData(cookie),
  //
  //   // keepPreviousData: true,
  //   // enabled: isClient,
  // });

  // console.log(userData,"-----------");

  //   const getData=async()=>{
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });
  // }
  return (
    <Hydrate state={dehydratedState}>
      <div className="body">
        <WishlistComponent cookie={cookie} />
      </div>
    </Hydrate>
  );
};

export default WishListPage;
