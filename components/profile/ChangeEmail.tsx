"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { getCookie } from "cookies-next";

const ChangeEmail = () => {
  const cookies = { value: getCookie("uid") };
  const client = useQueryClient();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookies),

    // keepPreviousData: true,
    // enabled: isClient,
  });
  // console.log(userData,"user");

  const [state, setState] = useState({
    firstName: userData?.name,
    lastName: userData?.lastName ? userData?.lastName : "",
    email: userData?.email,
    phone: userData?.phoneNo,
    about: userData?.aboutMe ? userData?.aboutMe : "",
    // currPassword: "",
    // newPassword: "",
  });

  const onSaveChangesHandler = async () => {
    setIsLoading(true);
    // console.log("start");
    const newInfo = {
      name: state.firstName,
      lastName: state.lastName,
      email: state.email,
      // phone: state.phone,
      about: state.about,
      // currPass:state.currPassword,
      // newPass:state.newPassword
    };
    // console.log(newInfo, "fdg");
    const userId = await userData.id;
    if (userId) {
      // console.log("inside if start");
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
      await client.invalidateQueries({ queryKey: ["userData"] });
      await client.refetchQueries({ queryKey: ["userData"] });
      toast.success("Changes saved succesfullly.");
      // console.log("inside if end");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    // console.log(newInfo,"new info");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="w-full ">
      <div className="flex md:flex-row flex-col gap-4 w-full mb-5"></div>
      <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
        <div className="md:w-[50%] w-full flex flex-col gap-3 ">
          <label className="text-[#555555] font-medium text-sm">
            Email Address*
          </label>
          <input
            className="py-3 border-[1px] border-[#838383] outline-0 px-3"
            value={isClient && state?.email ? state?.email : ""}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </div>
      </div>


      <div className="flex md:flex-row flex-col gap-x-4 gap-y-4 w-full mb-5 mt-10">
        <div
          onClick={async () => await onSaveChangesHandler()}
          className="md:w-[50%] w-full  bg-secondary text-white text-center  py-3  text-sm font-medium cursor-pointer flex justify-center items-center "
        >
          <button style={{ height: "100%", position: "relative" }}>
            {isLoading && (
              <div
                className=""
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Loader />
              </div>
            )}
            {!isLoading && "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
