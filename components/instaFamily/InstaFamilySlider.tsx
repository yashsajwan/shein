"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import { fetchSimilarProductsForCart } from '../../../config/typesense';
import instagram2 from "../../images/instagram (9) 1.svg";

// import VideoCard from '../videoCard/VideoCard';
import Image from "next/image";
import { fetchInstagramVideosData } from "../../utils/databaseService";
import FlatIcon from "../flatIcon/flatIcon";
import InstaFamilyCard from "./InstaFamilyCard";

const InstaFamilySlider = () => {
  const slider = useRef<any>(null);
  const { data: instagramData } = useQuery({
    queryKey: ["instagram-section"],
    queryFn: () => fetchInstagramVideosData(),
  });
  console.log(instagramData, "instagram-section");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={`${className}`} onClick={onClick} />;
  }
  const arrowButtonClass =
    "absolute top-0 bottom-0 my-auto bg-primary sm:w-8 sm:h-8 h-8 w-8 block text-white cursor-pointer z-20 rounded-full ";

  return (
    <>
      {instagramData && instagramData.length > 0 && (
        // <div className="px-body bg-instagram-section-bg bg-cover bg-no-repeat  md:py-16 py-10  -mb-4">
        <div className="px-body relative  bg-cover bg-no-repeat   ">
          {/* <div className="text-white"> */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2 ">
              {/* <div>
                <Image src={instagram} alt="" />
              </div> */}
              {/* <FlatIcon className="flaticon-instagram  sm:text-5xl text-3xl" /> */}
              <h1 className="sm:text-3xl text-xl font-bold flex justify-center items-center">
                <div className="sm:w-fit sm:h-full h-8 w-8 px-3 ">
                  <Image src={instagram2} alt="" />
                </div>
                INSTAGRAM FAMILY
              </h1>
            </div>
            <h5 className="text-center sm:text-xl sm font-semibold">
              {/* Tag us @shienstylestores to get featured */}
              Tag us @sheinstylestores and use #sheinstylestores to get
              feautured
            </h5>
            <div className="text-primary font-medium underline text-center cursor-pointer">
              {/* <Link
                    href={`/view-all?type=${section?.widgetType}&id=${section?.widgetID}&name=${encodeURIComponent(section?.sectionName)}`}
                    className="text-primary font-medium underline"
                  > */}
              View All
              {/* </Link> */}
            </div>
          </div>
          <div className="  justify-center items-center    md:py-12 py-6">
            <div className="">
              <button
                className={`${arrowButtonClass} left-0 lg:left-4 flex items-center justify-center`}
                onClick={() => slider.current?.slickPrev()}
              >
                <FlatIcon className="flaticon-left-arrow text-white sm:text-xl text-lg font-bold" />
              </button>
            </div>
            <div className="back  ">
              <div className="w-[100%]  h-auto only-carousel">
                <Slider
                  ref={slider}
                  {...settings}
                  className=""
                  dotsClass={`slick-dots `}
                  nextArrow={<></>}
                  prevArrow={<></>}
                  draggable={true}
                >
                  {instagramData?.map((item: any, idx: number) => {
                    return (
                      <div key={idx}>
                        <InstaFamilyCard item={item} />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="">
              <button
                className={`${arrowButtonClass} right-0 lg:right-4 text-center flex items-center justify-center   `}
                onClick={() => slider.current?.slickNext()}
              >
                <FlatIcon className="flaticon-left-arrow -rotate-180 text-white sm:text-xl text-lg font-bold" />
              </button>
            </div>
          </div>
          <div className="flex items-center sm:gap-3 gap-2 justify-center lg:text-2xl md:text-xl sm:text-base text-sm font-semibold ">
            <h2>EXPLORE MORE ON</h2>
            <div className="sm:w-fit sm:h-full h-8 w-8 ">
              <Image src={instagram2} alt="" />
            </div>
            {/* <FlatIcon className="flaticon-instagram  sm:text-5xl text-3xl" /> */}
            <h2>@sheinstylestores</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default InstaFamilySlider;
