"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import profilePic from "../../images/Ellipse 77.svg";
import FlatIcon from "../flatIcon/flatIcon";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import { db, auth } from "../../config/firebase-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";
import { constant } from "../../utils/constants";
import { Disclosure } from "@headlessui/react";

const ProfileOptions = ({ cookie, setSelectedTab, selectedTab }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // console.log(userId,"user id");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();
  const pathname = usePathname();
  // const [imgUrl,setImgUrl]=useState()
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),

    // keepPreviousData: true,
    // enabled: isClient,
  });
  // console.log(userData,"data");
  const [imgUrl, setImgUrl] = useState(userData ? userData?.dP : "");

  // console.log(userData?.dP,"----------------------");

  // const uploadImage = async (userPic: any) => {
  //   if (userPic) {
  //     setLoading(true);
  //     // console.log("inside if start")
  //     // console.log(userPic,"FROM upload img");
  //     let timeStamp = new Date().getMilliseconds();
  //     const userId = await userData.id;
  //     // console.log(userId,"user id from if");
  //     const storage = getStorage();
  //     const storageRef = ref(
  //       storage,
  //       `users/${userId}/images/${userPic.name}___${timeStamp}`
  //     );
  //     await uploadBytes(storageRef, userPic).then(async (snapshot) => {
  //       await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
  //         await setDoc(
  //           doc(db, "users", userId),
  //           { dP: downloadURL },
  //           { merge: true }
  //         );
  //         // console.log(downloadURL, "url");
  //         await client.invalidateQueries({ queryKey: ["userData"] });
  //         await client.refetchQueries({ queryKey: ["userData"] });
  //         toast.success("Profile pic updated successfully.");
  //       });
  //     });
  //     // console.log("inside if end")
  //     setLoading(false);
  //   } else {
  //     console.log("insile else");
  //   }
  // };

  async function handleLogout() {
    signOut(auth)
      .then(async () => {
        toast.success("Logged out");
        await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/logout`);
        // await axios.get(`/api/logout`);
        await queryClient.invalidateQueries({ queryKey: ["userData"] });

        // Sign-out successful.
        router.replace("/");
        await queryClient.refetchQueries({ queryKey: ["userData"] });
      })
      .catch((error) => {
        // An error happened.
        toast.error("cannot Logout at the moment");
      });
  }

  // async function uploadTask(userPic: any) {
  //   await uploadImage(userPic);
  // }

  useEffect(() => {
    setIsClient(true);
    // console.log(userData,"DATA AFTER RELOAD");
  }, []);

  const my_account = [
    { name: "My Account", tab: 6 },
    { name: "My Profile", tab: 1 },
    { name: "Addresses", tab: 3 },
    { name: "Change Email", tab: 7 },
  ];

  const my_assets = [
    { name: "Points", tab: 4 },
    { name: "My Coupons", tab: 8 },
    { name: "Wallet", tab: 9 },
  ];

  const my_orders = [
    { name: "All", tab: 2 },
    { name: "Confimed", tab: 10 },
    { name: "Accepted", tab: 11 },
    { name: "Dispatch", tab: 12 },
    { name: "Delivered", tab: 13 },
  ];

  // const dummyDATA=[{icon:}]
  return (
    <>
      <div className=" xl:flex-[0.25] md:flex-[0.45] filter-border  h-fit ">
        {/* <div className="flex flex-col items-center mt-5 mb-7">
          <div className="border border-[#EEEEEE] rounded-full p-2 mb-2">
            <div className=" rounded-full  relative">
              <Image
                src={(isClient && userData?.dP) || constant.errImage}
                alt=""
                width={1000}
                height={1000}
                style={{ aspectRatio: "auto", width: "110px", height: "110px" }}
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

                <label
                  htmlFor="Destination-Image"
                  className="hover:cursor-pointer h-[30px] w-[30px] rounded-full border border-[#EEEEEE] bg-white flex justify-center items-center"
                >
                  <RiEdit2Fill className="text-primary text-xl" />
                </label>
              </div>
            </div>
          </div>
          <h5 className="text-secondary font-semibold text-sm mb-1">
            {isClient && userData?.name}{" "}
            {isClient && userData?.lastName && userData?.lastName}
          </h5>
          <h6 className="text-[#555555] font-medium text-sm">
            {isClient && userData?.email}
          </h6>
        </div> */}

        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  
                  className={`flex border-b border-[#CCCCCC] items-center sm:text-base font-semibold text-xs justify-between w-full ${
                    open ? "font-semibold" : ""
                  } `}
                >
                  <div
                    className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${
                      selectedTab === 1 ||
                      selectedTab === 6 ||
                      selectedTab === 3 ||
                      selectedTab === 7
                        ? "text-primary"
                        : "text-secondary"
                    }`}
                  >
                    <div>
                      <FlatIcon
                        icon={
                          "flaticon-user-fill  font-normal text-2xl hover:text-primary "
                        }
                      />
                    </div>
                    <h4 className=" font-semibold text-sm ">My Account</h4>
                  </div>
                  <FlatIcon
                    className="mr-2"
                    icon={"flaticon-plus text-[#999999] text-xs"}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" pt-0 pb-2 text-base text-gray-500 w-full">
                  <ul className="list-disc">
                    {my_account.map((ele, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTab(ele.tab)}
                        className={`gap-3 py-2 px-6 hover:text-primary ${
                          selectedTab === ele.tab
                            ? "text-primary"
                            : "text-gray-500"
                        } cursor-pointer`}
                      >
                        {ele.name}
                      </div>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                
                  className={`flex border-b border-[#CCCCCC] items-center sm:text-base font-semibold text-xs justify-between w-full ${
                    open ? "font-semibold" : ""
                  } `}
                >
                  <div
                    className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${
                      selectedTab === 4 ||
                      selectedTab === 8 ||
                      selectedTab === 9
                        ? "text-primary"
                        : "text-secondary"
                    }`}
                  >
                    <div>
                      <FlatIcon
                        icon={
                          "flaticon-location  font-normal text-2xl hover:text-primary "
                        }
                      />
                    </div>
                    <h4 className=" font-semibold text-sm ">My Assets</h4>
                  </div>
                  <FlatIcon
                    className="mr-2"
                    icon={"flaticon-plus text-[#999999] text-xs"}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" pt-0 pb-2 text-base text-gray-500 w-full">
                  <ul className="list-disc">
                    {my_assets.map((ele, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTab(ele.tab)}
                        className={`gap-3 py-2 px-6 hover:text-primary ${
                          selectedTab === ele.tab
                            ? "text-primary"
                            : "text-gray-500"
                        } cursor-pointer`}
                      >
                        {ele.name}
                      </div>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
              
                  className={`flex border-b border-[#CCCCCC] items-center sm:text-base font-semibold text-xs justify-between w-full ${
                    open ? "font-semibold" : ""
                  } `}
                >
                  <div
                    className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${
                      selectedTab === 2 ||
                      selectedTab === 10 ||
                      selectedTab === 11 ||
                      selectedTab === 12 ||
                      selectedTab === 13 ||
                      selectedTab === 14 ||
                      selectedTab === 15
                        ? "text-primary"
                        : "text-secondary"
                    }`}
                  >
                    <div>
                      <FlatIcon
                        icon={
                          "flaticon-bag  font-normal text-2xl hover:text-primary "
                        }
                      />
                    </div>
                    <h4 className=" font-semibold text-sm ">My Orders</h4>
                  </div>
                  <FlatIcon
                    className="mr-2"
                    icon={"flaticon-plus text-[#999999] text-xs"}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" pt-0 pb-2 text-base text-gray-500 w-full">
                  <ul className="list-disc">
                    {my_orders.map((ele, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTab(ele.tab)}
                        className={`gap-3 py-2 px-6 hover:text-primary ${
                          selectedTab === ele.tab
                            ? "text-primary"
                            : "text-gray-500"
                        } cursor-pointer`}
                      >
                        {ele.name}
                      </div>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* <div
          onClick={() => setSelectedTab(1)}
          className={`flex gap-3 items-center border-t border-t-[#EEF0F5] border-b border-b-[#EEF0F5] py-4 px-6 hover:text-primary ${
            selectedTab === 1 ? "text-primary" : "text-secondary"
          } cursor-pointer`}
        >
          <div>
            <FlatIcon
              icon={`flaticon-user-fill  font-normal text-2xl cursor-pointer`}
            />
          </div>
          <h4 className={` font-semibold text-sm `}>Profile Info</h4>
        </div> */}

        {/* <div
          onClick={() => setSelectedTab(6)}
          className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer hover:text-primary  ${
            selectedTab === 6 ? "text-primary" : "text-secondary"
          }`}
        >
          <div>
            <FlatIcon
              icon={"flaticon-bag  font-normal text-2xl hover:text-primary "}
            />
          </div>
          <h4 className=" font-semibold text-sm ">My Account</h4>
        </div> */}

        {/* </Link> */}
        <Link href={"/wishlist"}>
          <div className="flex gap-3 items-center  border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer hover:text-primary  text-secondary">
            <div>
              <FlatIcon icon={"flaticon-heart  font-normal text-2xl "} />
            </div>
            <h4
              className={` font-semibold text-sm ${
                pathname.includes("wishlist") && "text-primary"
              } `}
            >
              My Wishlist
            </h4>
          </div>
        </Link>
        {/* <Link href={"/orders"}> */}
        {/* <div
          onClick={() => setSelectedTab(2)}
          className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer hover:text-primary  ${
            selectedTab === 2 ? "text-primary" : "text-secondary"
          }`}
        >
          <div>
            <FlatIcon
              icon={"flaticon-bag  font-normal text-2xl hover:text-primary "}
            />
          </div>
          <h4 className=" font-semibold text-sm ">My Order</h4>
        </div> */}

        {/* </Link> */}
        {/* <div
          onClick={() => setSelectedTab(3)}
          className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${
            selectedTab === 3 ? "text-primary" : "text-secondary"
          }`}
        >
          <div>
            <FlatIcon icon={"flaticon-location  font-normal text-2xl"} />
          </div>
          <h4 className=" font-semibold text-sm">Addresses</h4>
        </div> */}
        {/* <div
          onClick={() => setSelectedTab(4)}
          className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${
            selectedTab === 4 ? "text-primary" : "text-secondary"
          }`}
        >
          <div>
            <FlatIcon icon={"flaticon-location  font-normal text-2xl"} />
          </div>
          <h4 className=" font-semibold text-sm">Points</h4>
        </div> */}
        {/* <div onClick={()=>setSelectedTab(4)} className='flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer text-secondary hover:text-primary'>
          <div><FlatIcon icon={"flaticon-card  font-normal text-2xl"} /></div><h4 className=" font-semibold text-sm">Payment Method</h4>
        </div> */}
        {/* <Link href={"/contact"}> */}
        {/* <div onClick={()=>setSelectedTab(5)} className={`flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer  hover:text-primary ${selectedTab===5?"text-primary":"text-secondary"} `}>
            <div><FlatIcon icon={"flaticon-chat  font-normal text-2xl"} /></div><h4 className=" font-semibold text-sm">Help and Support</h4>
          </div> */}
        {/* </Link> */}
        <Link href={"/referandearn"}>
          <div className="flex gap-3 items-center border-b border-b-[#EEF0F5]  py-4 px-6 cursor-pointer text-secondary hover:text-primary">
            <div>
              <FlatIcon icon={"flaticon-share  font-normal text-2xl"} />
            </div>
            <h4 className=" font-semibold text-sm">Refer and Earn</h4>
          </div>
        </Link>
        <div
          onClick={() => handleLogout()}
          className="flex gap-3 items-center   py-4 px-6 cursor-pointer text-secondary hover:text-primary"
        >
          <div>
            <FlatIcon icon={"flaticon-logout  font-normal text-2xl"} />
          </div>
          <h4 className=" font-semibold text-sm">Logout</h4>
        </div>
      </div>
      {loading && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-30 flex justify-center items-center ">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileOptions;
