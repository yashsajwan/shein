"use client";
import React, { useState } from "react";
import logo from "../../images/MedX-Pharmacy-Logo-R-01 2 (1).svg";
import Image from "next/image";
import img1 from "../../images/image 146.svg";
import img2 from "../../images/da1cd32c-33a4-48a2-9873-f45c918d31f5 1.svg";
import img3 from "../../images/image 147.svg";
import img4 from "../../images/Fedex-logo 1.svg";
import img5 from "../../images/pngkit_delivery-com-logo-png_5554386 1.svg";
import codImg from "../../images/image 148.svg";
import americanExpImg from "../../images/pngwing 1.svg";
import masterCardImg from "../../images/MasterCard_Logo 1.svg";
import visaImg from "../../images/visa 3.svg";
import gpayImg from "../../images/google-pay 1.svg";
import paytmImg from "../../images/Paytm-Logo 1.svg";
import FlatIcon from "../flatIcon/flatIcon";
import appStoreImg from "../../images/Group 34287.svg";
import playStoreImg from "../../images/Group 34288.svg";
import facebookImg from "../../images/facebook (2) 1.svg";
import whatsappImg from "../../images/whatsapp.svg";
import instagram from "../../images/instagram (3) 1.svg";
import pinterest from "../../images/pinterest (1) 1.svg";
import twitter from "../../images/twitter.svg";
import youtube from "../../images/youtube.svg";
import snapchat from "../../images/snapchat.svg";
import quora from "../../images/quora.svg";
import { getStoreDetails } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { db } from "../../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import blacklogo from "../../images/logo (4).svg";
import Loader from "../loader/Loader";

const DUMMY_DATA = [
  // {
  //   heading: "SHEIN STYLE STORES",
  //   subLinks: [
  //     { name: "About", href: "about" },
  //     { name: "Careers", href: "careers" },
  //     { name: "Influencer Program", href: "influencer-program" },
  //     { name: "Social Responsibility", href: "social-responsibility" },
  //     { name: "Business Enquiries", href: "business-enquiries" },
  //     { name: "Become a Partner", href: "bacome-a-partner" },
  //     { name: "Fraud Alert", href: "fraud-alert" },
  //     { name: "Store Locations", href: "store-locations" },
  //   ],
  // },
  {
    heading: "SHEIN STYLE INFO",
    subLinks: [
      { name: "About Us", href: "about" },
      { name: "Store Locater", href: "happy-customers" },
      { name: "Influencer Collab Hub", href: "brand-feedback" },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    subLinks: [
      { name: "FAQ's", href: "faqs" },
      { name: "Size Guide", href: "size-guide" },
      { name: "Track your Order", href: "track-order" },
      { name: "Join SHEINXY Points", href: "bonus-points" },
      { name: "Refer and Earn", href: "loyality-program" },
      { name: "Site Map", href: "store-locations" },
      // { name: "Happy Customers", href: "happy-customers" },
      // { name: "Brand Feedback", href: "brand-feedback" },
      // { name: "Loyalty Program", href: "loyality-program" },
      // { name: "Store Locations", href: "store-locations" },
    ],
  },
  {
    heading: "OUR POLICIES",
    subLinks: [
      { name: "Shipping Policy", href: "shipping-terms" },
      { name: "Return & Exchange", href: "return-and-exchange" },
      { name: "Terms & Conditions", href: "terms-and-conditions" },
      { name: "Privacy & Cookies Policy", href: "privacy-policy" },
    ],
  },
  // {
  //   heading: "OUR POLICIES",
  //   subLinks: [
  //     { name: "Return and Exchange", href: "return-and-exchange" },
  //     { name: "Privacy Policy", href: "privacy-policy" },
  //     { name: "Terms & Conditions", href: "terms-and-conditions" },
  //     { name: "Shipping Terms", href: "shipping-terms" },
  //     { name: "Cookies Policy", href: "cookies-policy" },
  //     { name: "Accessibility", href: "accessbility" },
  //   ],
  // },
];

const images = [
  { image: img1 },
  { image: img2 },
  { image: img5 },
  { image: img3 },
  { image: img4 },
];

const pyamentModeImages = [
  { image: codImg },
  { image: americanExpImg },
  { image: masterCardImg },
  { image: visaImg },
  { image: gpayImg },
  { image: paytmImg },
];
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubscribeSumbitHandler = async () => {
    setLoading(true);
    const data = {
      email: email,
      createdAt: new Date(),
    };
    // console.log("data");
    try {
      if (email) {
        console.log("submitted");
        await addDoc(collection(db, "newsletter"), data);
        setLoading(false);
        toast.success("Subscribed !");
        setEmail("");
      } else {
        setLoading(false);
        toast.error("Please enter email!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const { data: storeData } = useQuery({
    queryKey: ["storeDetails"],
    queryFn: () => getStoreDetails(),
    keepPreviousData: true,
  });
  // console.log(storeData,"storeData");

  return (
    <>
      <div>
        <div className="flex lg:flex-row flex-col flex-col-reverse bg-black">
          <div className="lg:w-[100%]  w-[100%]  ">
            <h3 className="w-[100%] sm:pt-10 pt-5 px-body relative font-bold md:text-xl text-base text-white ">
              We are SHEIN Style Store
              <div className="bg-primary   absolute bottom-[-12px] p-[1px] w-[55px] h-[2px]"></div>
            </h3>
            <div className=" w-[100%] sm:pt-10 pt-5 px-body lg:flex sm:flex-row grid sm:grid-cols-2 grid-cols-1 flex-col xl:gap-x-5 gap-x-4 gap-y-4">
              {/* <div className="grid  lg:w-[65%] w-[100%] xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:gap-x-5 gap-x-4 gap-y-4 sm:mb-[60px] mb-[40px]  "> */}
              {DUMMY_DATA.map((item: any, idx: number) => {
                return (
                  <div className="lg:w-[20%]  flex flex-col gap-4   " key={idx}>
                    <h3 className=" relative font-bold md:text-xl text-base text-white ">
                      {item.heading}
                      {/* <div className="bg-primary   absolute bottom-[-12px] p-[1px] w-[55px] h-[2px]"></div> */}
                    </h3>
                    <div className="flex flex-col gap-4 mt-4 cursor-pointer">
                      {item.subLinks.map((item: any, idx: number) => {
                        return (
                          <Link key={idx} href={`${item.href}`}>
                            <p className="text-sm text-[#858484] hover:text-white font-medium">
                              {/* <p className="text-sm text-[#fff] font-medium"> */}
                              {item.name}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {/* <div className="lg:w-[30%]   flex flex-col gap-4    ">
                <h3 className=" relative font-bold md:text-xl text-base text-white ">
                  OUR OFFICE
                  <div className="bg-primary   absolute bottom-[-12px] p-[1px] w-[55px] h-[2px]"></div>
                </h3>
                <div className="flex flex-col gap-4 mt-4 text-sm text-[#fff] font-semibold ">
                  {storeData?.storeAddress?.address && (
                    <div className="flex gap-3 cursor-pointer">
                      <div>
                        <FlatIcon className="flaticon-address text-2xl font-bold text-white " />
                      </div>
                      <p>{storeData?.storeAddress?.address}</p>
                    </div>
                  )}
                  {storeData?.storePhone && (
                    <div className="flex gap-3 cursor-pointer">
                      <div>
                        <FlatIcon className="flaticon-contact text-2xl font-bold text-white" />
                      </div>
                      <p>{storeData?.storePhone}</p>
                    </div>
                  )}
                  {storeData?.storeEmail && (
                    <a
                      href={`mailto:${storeData?.storeEmail}`}
                      className="flex gap-3 cursor-pointer"
                    >
                      <div>
                        <FlatIcon className="flaticon-contact-1 text-2xl font-bold text-white" />
                      </div>
                      <p className="line-clamp-1">{storeData?.storeEmail}</p>
                    </a>
                  )}
                </div>
              </div> */}

              <div className="lg:w-[30%]   bg-black  flex items-center   ">
                <div className="  h-fit flex flex-col gap-6 sm:gap-8 lg:gap-8  ">
                  <div className="w-full flex sm:justify-center">
                    <div className="sm:w-[180px] w-[150px]  ">
                      <Image
                        src={blacklogo}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-full "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-white  gap-6 sm:gap-8 lg:gap-10">
                    <p className="  font-semibold sm:text-xl text-lg md:mx-5 lg:text-center sm:text-center">
                      Signup now & get 10 % discount your first order**{" "}
                    </p>
                    <div className="flex p-1 bg-white rounded-md w-[100%] mx-auto justify-between  email-container  items-center ">
                      <div className="w-[70%]">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="w-[100%] outline-0 py-3 sm:px-3 px-1 rounded-md text-black"
                          placeholder="Your email address"
                        />
                      </div>

                      <div
                        onClick={() => onSubscribeSumbitHandler()}
                        className="  xl:w-[30%] w-[40%] h-fit  py-3 bg-primary text-white xl:text-base md:text-sm text-xs font-semibold cursor-pointer rounded-md "
                      >
                        <button
                          className=" w-full text-center  "
                          style={{ height: "100%", position: "relative" }}
                        >
                          {loading && (
                            <div
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
                          {!loading && "SUBSCRIBE"}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center items-center md:text-2xl sm:text-xl text-lg font-semibold text-white mb-3">
                      <h2 className="mr-5">Customer Support</h2>
                      <Link
                        href={storeData ? storeData?.externalContact?.link : ""}
                        target="_blank"
                      >
                        <div>
                          <Image
                            src={whatsappImg}
                            width={35}
                            height={35}
                            alt=""
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" sm:py-[28px] py-[20px] ">
              <div className=" flex lg:flex-row md:flex-col sm:flex-row  w-full xl:gap-x-8 gap-x-4"></div>
              <div className="px-body">
                {/* <div className="flex  md:items-center md:flex-row flex-col gap-y-4 justify-between gap-x-3"> */}

                <div className="flex  md:items-center md:flex-row flex-col gap-y-4 justify-center gap-x-3">
                  <div className="flex flex-col">
                    <div className=" md:text-2xl sm:text-xl text-lg font-semibold text-white mb-3">
                      <h2>
                        Follow us on social media get{" "}
                        <span className="text-primary">1000 Bonus </span>{" "}
                        points*
                      </h2>
                    </div>
                    <div className="flex items-center justify-center lg:flex-nowrap flex-wrap md:gap-x-6 gap-x-4 gap-y-2 cursor-pointer">
                      {/* {pyamentModeImages.map((item: any, idx: number) => {
                        return (
                          <div key={idx}>
                            <Image src={item.image} alt="" />
                          </div>
                        );
                      })} */}

                      <Link
                        className="px-3"
                        href={
                          storeData
                            ? storeData?.facebookUrl
                            : "https://www.facebook.com/ootdsheinindias/"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image src={facebookImg} alt="" />
                        </div>
                      </Link>
                      <Link
                        className="px-3"
                        href={
                          storeData
                            ? storeData?.instagramUrl
                            : "https://www.instagram.com/ootdsheinindia?igsh=MTVzNnAyMjJ0aThpdw%3D%3D&utm_source=qr"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image src={instagram} alt="" />
                        </div>
                      </Link>

                      <Link
                        className="px-3"
                        href={
                          "https://in.pinterest.com/OOTDSHEININDIA/?invite_code=5635d8fa76bd4165aeee9a226f64206f&sender=1097119296632599009"
                        }
                        target="_blank"
                      >
                        <div className="cursor-pointer">
                          <Image src={pinterest} alt="" />
                        </div>
                      </Link>

                      <Link
                        className="px-3"
                        href={
                          storeData
                            ? storeData?.twitterUrl
                            : "https://twitter.com/OOTDSHEININDIA"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image
                            className="bg-white rounded-md"
                            src={twitter}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                      </Link>

                      <Link
                        className="px-3"
                        href={
                          storeData
                            ? storeData?.youtubeUrl
                            : "https://www.youtube.com/channel/UC-wwq3jrMDQ0mpz1LwCniNw"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image
                            className=" bg-white rounded-md"
                            src={youtube}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                      </Link>

                      <Link
                        className="px-3"
                        href={
                          "https://www.snapchat.com/add/ootdsheinindias?share_id=-wTCfKde5nl&locale=en-GB"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image
                            className="bg-white rounded-md"
                            src={snapchat}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                      </Link>

                      <Link
                        className="px-3"
                        href={
                          "https://www.quora.com/profile/OOTDSHEININDIA?ch=10&oid=2570461730&share=47998cb5&srid=3GaM2C&target_type=user"
                        }
                        target="_blank"
                      >
                        <div>
                          <Image
                            className="bg-[#b0271e] rounded-md"
                            src={quora}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/* <div className="flex flex-col">
                    <div className=" md:text-2xl sm:text-xl text-lg font-semibold text-white mb-3 md:text-end">
                      <h2>Delivery Partners</h2>
                    </div>
                    <div className="flex items-center md:justify-end lg:flex-nowrap flex-wrap md:gap-x-6 gap-x-4  gap-y-2 cursor-pointer">
                      {images.map((item: any, idx: number) => {
                        return (
                          <div key={idx}>
                            <Image src={item.image} alt="" />
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="  h-fit">
              <div className="flex      w-full">
                {/* <div className="bg-[#F6F4F1] text-white  w-full "> */}
                <div className="bg-[#000] text-white  w-full ">
                  <div className="border-b-[1.5px] border-[white] border-line"></div>
                  <div className="flex sm:flex-row flex-col items-center sm:justify-between gap-x-4 gap-y-4  py-5  px-body ">
                    <p className="text-white md:text-base text-sm font-medium text-center w-full ">
                      ©2019-2023 SHEINSTYESTORES INC All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="lg:w-[37%] w-[100%] py-5 lg:py-10 px-body  bg-black  flex items-center">
            <div className="  h-fit flex flex-col gap-6 sm:gap-8 lg:gap-8  ">
              <div className="w-full flex justify-center">
              <div className="sm:w-[180px] w-[150px] border border-[red] ">
            <Image
                  src={blacklogo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-full "
                />
                </div>
                </div>
              <h1 className=' text-white lg:text-3xl sm:text-xl text-xl font-bold lg:text-center text-center '>NEWSLETTER</h1>
              <div className="flex flex-col text-white  gap-6 sm:gap-8 lg:gap-16">
                <p className='  font-semibold  md:text-base sm:text-sm text-xs lg:text-center text-center'>Join now and get 10% off on your next purchase and Be the first to know about new collections and exclusive offers. </p>
                <div className='flex p-1 bg-white rounded-md w-[100%] mx-auto justify-between  email-container  items-center '>
                  <div className="w-[70%]">
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      className='w-[100%] outline-0 py-3 sm:px-3 px-1 rounded-md text-black' placeholder='Your email address' />
                  </div>
                 
                
<div onClick={() => onSubscribeSumbitHandler()} className="  xl:w-[30%] w-[40%] h-fit  py-3 bg-primary text-white xl:text-base md:text-sm text-xs font-semibold cursor-pointer rounded-md ">
<button className=" w-full text-center  " style={{ height: "100%", position: "relative" }}>
{loading && (
                  <div
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
                {!loading && "SUBSCRIBE"}
</button>
</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
