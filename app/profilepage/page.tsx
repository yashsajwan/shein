import React from "react";
import Profile from "../../components/profile/Profile";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { cookies } from "next/dist/client/components/headers";
import getQueryClient from "../../utils/getQueryClient";
import Hydrate from "../../utils/hydrate.client";

const ProfilePage = async () => {
  const cookie = cookies().get("uid");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["userData"], () => getUserData(cookie));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile cookie={cookie} />
    </Hydrate>
  );
};

export default ProfilePage;
