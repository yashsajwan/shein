"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { fetchCategoryProducts } from "../../utils/databaseService";
// import FilterSection from "./filterSections";
// import ProductCard from "./productCard";
import { useMediaQuery } from "@mui/material";
import ProfileOptions from "./ProfileOptions";
import { getUserData } from "../../utils/databaseService";
// import { cookies } from "next/dist/client/components/headers";
import { db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import EditProfile from "./EditProfile";
import OrderPage from "../orderPage/OrderPage";
import HelpAndSupport from "../helpAndSupport/HelpAndSupport";
import Addresses from "../addresses/Addresses";
import OrderDetailsPage from "../orderPage/OrderDetailsPage";
import Points from "./Points";

const Profile = ({ cookie }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const matches = useMediaQuery("(min-width:1024px)");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    //
    // keepPreviousData: true,
    // enabled: isClient,
  });
  const [state, setState] = useState({
    firstName: userData?.name,
    lastName: userData?.lastName ? userData?.lastName : "",
    email: userData?.email,
    phone: userData?.phoneNo,
    about: userData?.aboutMe ? userData?.aboutMe : "",
    // currPassword: "",
    // newPassword: "",
  });
  // const cookie = cookies().get("uid");

  // const { data: userData } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: () => getUserData(cookie),
  //
  //   keepPreviousData: true,
  //   // enabled: isClient,
  // });
  // console.log(userData, "userData");

  const onSaveChangesHandler = async () => {
    console.log("start");
    const newInfo = {
      name: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      about: state.about,
      // currPass:state.currPassword,
      // newPass:state.newPassword
    };
    console.log(newInfo, "fdg");
    const userId = await userData.id;
    if (userId) {
      console.log("inside if start");
      await setDoc(
        doc(db, "users", userId),
        {
          name: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phoneNo: state.phone,
          aboutMe: state.about,
        },
        { merge: true }
      );
      console.log("inside if end");
    }
    // console.log(newInfo,"new info");
  };

  //   const renderTabs=(tab=1)=>{
  //     switch (selectedTab){
  //       case selectedTab==="4" : return<EditProfile/>
  //       // case selectedTab===tab:return <EditProfile/>
  //       // case selectedTab===4:return <OrderPage/>
  // default:
  //     }
  //   }

  const onView = (state) => {
    console.log(state);

    setSelectedTab(state);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col px-body gap-2 mt-2  h-full ">
      <div className="w-full flex flex-col md:flex-row gap-4 mt-5 sm:mb-20 mb-10">
        <ProfileOptions
          cookie={cookie}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
        <hr />
        <div className="w-full flex-1 ">
          {selectedTab === 1 && <EditProfile />}
          {selectedTab === 2 && (
            <OrderPage
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              onView={onView}
            />
          )}
          {selectedTab === 3 && <Addresses userId={userData?.id} />}
          {selectedTab === 4 && <Points  cookie={cookie}/>}

          {selectedTab === 5 && <HelpAndSupport />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
