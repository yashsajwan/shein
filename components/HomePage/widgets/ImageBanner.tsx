import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchHomeSections } from "../../../utils/databaseService";
import Image from "next/image";
import { constant } from "../../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { bannerLink } from "../../../utils/bannerLink/bannerLinking";
import Link from "next/link";
const ImageBanner = ({ section, myKey = `` }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  const [hoveredProduct, setHoveredProduct] = useState(false);

  const imagesArr =
    homeData &&
    homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
    homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
    homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr;
  // console.log(imagesArr,"img arr");

  const newImagesArr = imagesArr.slice(0, 3);
  // console.log(newImagesArr,"newImagesArr");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: hoveredProduct ? true : false,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  function getProduct(product) {
    return product?.data || product;
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  if (imagesArr.length === 0) return <div className="hidden"></div>;

  

  // new start
  if (imagesArr.length === 7) {
    return (
      <div
        className={` only-carousel `}
        // onMouseEnter={() => {
        //   setHoveredProduct(true);
        // }}
        // onMouseLeave={() => {
        //   setHoveredProduct(false);
        // }}
      >
        <div className="grid md:grid-cols-2 md:grid-cols-1  gap-x-5 gap-y-5">
          <div className="md:h-[450px] h-[200px]">
            <Image
              src={imagesArr[0].image?.org}
              alt=""
              width={1000}
              height={1000}
              className="h-full"
            />
          </div>
          <div className="grid grid-cols-3 md:h-[450px] h-[200px] ">
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[6].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full border"
              />
            </div>
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[5].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full"
              />
            </div>
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[4].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full"
              />
            </div>
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[3].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full"
              />
            </div>
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[2].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full"
              />
            </div>
            <div className="md:h-[225px] h-[100px] ">
              <Image
                src={imagesArr[1].image?.org}
                alt=""
                width={1000}
                height={1000}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const image =
    (homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr &&
      homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr[0]
        ?.image?.org) ||
    homeData?.data?.filter((val) => val?.id === section?.widgetID)[0]?.arr[0]
      ?.image?.url;

  return (
    <div
      className={` w-full ${imagesArr.length === 3? "-mt-5":  "mt-0"} ${imagesArr.length === 3? "px-body": imagesArr.length === 2 ? "px-[1.5%]": "px-0"}    z-30`}
    >
      {/* <div className="flex justify-center items-center mb-8"><h1 className="sm:text-3xl text-xl font-bold">#SHEINSTYLESTORES CAMPAIGN</h1></div> */}

      <div
        className={` w-full  flex  items-center ${
          imagesArr.length === 3 ? "sm:gap-7" : "sm:gap-2"
        } `}
        key={myKey}
      >
        {newImagesArr.map((imageData:any, index:number) => (
          // console.log("imageData",imageData)
          
          <Link
          target="_blank"
          href={`${bannerLink(imageData)}`}
          onClick={(e) => {
            if (
              !bannerLink(imageData) ||
              bannerLink(imageData)?.includes("undefined")
            ) {
              // console.log("inside preventDefault");
              
              e.preventDefault();
            }
          }}
            key={imageData.image.org || imageData.image.url}
            className={` ${
              newImagesArr.length === 1
                ? "w-full flex justify-center items-center  "
                : `w-${100 / newImagesArr.length} `
            }  `}
          >
            <Image
              src={imageData.image.org || imageData.image.url}
              alt="banner"
              width={1000}
              height={1000}
              // layout="responsive"
              style={{ aspectRatio: "auto" }}
              className={`flex-1 ${
                imagesArr.length === 2 ? "sm:h-[25rem] h-[10rem]" : "h-auto"
              } object-fit `}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageBanner;



{/* <div className={` w-full  ${imagesArr.length===3?"px-body":imagesArr.length===2?"px-[1.5%]":"px-0"}   ${imagesArr.length===3?"lg:-mt-36 -mt-16":"-mt-0"} z-30`}> */}
{/*  */}