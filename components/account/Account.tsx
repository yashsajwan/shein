"use client";
import { getUserData } from "../../utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";

import accountbanner from "../../images/account_banner.png";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

import unpaid from "../../images/unpaid.png";
import processing from "../../images/processing.png";
import shipped from "../../images/shipped.png";
import wallet from "../../images/wallet.png";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { RiEdit2Fill } from "react-icons/ri";

const Account = ({ cookie, setSelectedTab, selectedTab }) => {
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
  });

  const uploadImage = async (userPic: any) => {
    if (userPic) {
      setLoading(true);
      // console.log("inside if start")
      // console.log(userPic,"FROM upload img");
      let timeStamp = new Date().getMilliseconds();
      const userId = await userData.id;
      // console.log(userId,"user id from if");
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `users/${userId}/images/${userPic.name}___${timeStamp}`
      );
      await uploadBytes(storageRef, userPic).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          await setDoc(
            doc(db, "users", userId),
            { dP: downloadURL },
            { merge: true }
          );
          // console.log(downloadURL, "url");
          await client.invalidateQueries({ queryKey: ["userData"] });
          await client.refetchQueries({ queryKey: ["userData"] });
          toast.success("Profile pic updated successfully.");
        });
      });
      // console.log("inside if end")
      setLoading(false);
    } else {
      console.log("insile else");
    }
  };

  const [isClient, setIsClient] = useState(false);
  async function uploadTask(userPic: any) {
    await uploadImage(userPic);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <div className="w-full h-full ">
            {userData && userData.length === 0 ? (
              <div className="w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500">
                No Account Found !
              </div>
            ) : (
              <div className="grid grid-cols-4">
                <div className="grid col-span-4 md:col-span-3 bg-gradient-to-r from-white via-[#fa7bc1] to-[#fa7bc1]  rounded-3xl ">
                  <div className="lg:px-5 px-2 lg:py-5 py-3 relative">
                    <div className=" text-secondary text-lg font-semibold flex items-center mb-5">
                      <div className="border border-[#EEEEEE] rounded-full p-2 ">
                        <div className=" rounded-full  relative">
                          <Image
                            src={
                              (isClient && userData?.dP) || constant.errImage
                            }
                            alt=""
                            width={1000}
                            height={1000}
                            style={{
                              aspectRatio: "auto",
                              width: "110px",
                              height: "110px",
                            }}
                            className="rounded-full"
                          />
                          <div className="absolute bottom-0 right-0">
                            <input
                              placeholder="Destination Image"
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                // console.log(e.target.files[0],"from input");
                                await uploadTask(e.target.files[0]);
                              }}
                              id="Destination-Image"
                              className="w-full hover:cursor-pointer   outline-none px-[10px] py-[7px] hidden rounded-md "
                            />
                            {/* <label htmlFor='Destination-Image' className='hover:cursor-pointer '>v</label> */}
                            <label
                              htmlFor="Destination-Image"
                              className="hover:cursor-pointer h-[30px] w-[30px] rounded-full border border-[#EEEEEE] bg-white flex justify-center items-center"
                            >
                              <RiEdit2Fill className="text-primary text-xl" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <h2 className="ml-5 text-2xl">
                        <h5 className="text-white font-semibold text-3xl mb-1">
                          {userData?.name}{" "}
                          {userData?.lastName && userData?.lastName}
                          {/* Arjun Rawat */}
                        </h5>
                        <h6 className="text-white font-medium text-xl">
                          {userData?.email}
                          {/* rajun.rawat@gmail.com */}
                        </h6>
                      </h2>
                    </div>

                    <Image
                      src={accountbanner}
                      alt=""
                      width={1000}
                      height={1000}
                      className="h-full w-auto absolute right-0 top-0 rounded-3xl hidden  xl:block"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="w-full md:w-3/4 my-5 border-2 border-primary p-4">
              <div className="flex justify-around my-2 items-center h-32">
                <div
                  onClick={() => setSelectedTab(8)}
                  className=" cursor-pointer p-3 text-xl text-center h-full flex items-center"
                >
                  <div>
                    <div className="text-3xl font-bold">5</div>
                    <div>Coupons</div>
                  </div>
                </div>
                <div
                  onClick={() => setSelectedTab(4)}
                  className=" cursor-pointer p-3 text-xl text-center h-full flex items-center"
                >
                  <div>
                    <div className="text-3xl font-bold">200</div>
                    <div>Points</div>
                  </div>
                </div>
                <div
                  onClick={() => setSelectedTab(9)}
                  className=" cursor-pointer p-3 text-xl text-center h-full flex items-center"
                >
                  <div>
                    <Image src={wallet} alt="unpaid"></Image>
                    <div>Wallets</div>
                  </div>
                </div>
                {/* <div className="p-3 text-xl">Review</div> */}
              </div>
            </div>

            <div className="w-full md:w-3/4 my-5 border-2 border-primary p-4">
              <div className="flex justify-between items-center">
                <div className="text-3xl">My Orders</div>
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedTab(2)}
                >
                  View All
                </div>
              </div>
              <div className="flex justify-around my-5 items-center h-32">
                <div className="p-3 text-xl text-center h-full flex items-center">
                  <div>
                    <Image src={unpaid} alt="unpaid"></Image>
                    <div>Unpaid</div>
                  </div>
                </div>
                <div className="p-3 text-xl text-center h-full flex items-center">
                  <div>
                    <Image src={processing} alt="unpaid"></Image>
                    <div>Processing</div>
                  </div>
                </div>
                <div className="p-3 text-xl text-center h-full flex items-center">
                  <div>
                    <Image src={shipped} alt="unpaid"></Image>
                    <div>Shipped</div>
                  </div>
                </div>
                {/* <div className="p-3 text-xl">Review</div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Account;
