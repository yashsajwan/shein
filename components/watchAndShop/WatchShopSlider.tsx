"use client";
import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import WatchShopCard from "./WatchShopCard";
import Link from "next/link";
import FlatIcon from "../flatIcon/flatIcon";
import { fetchVideoProducts } from "../../utils/databaseService";

const WatchShopSlider = () => {
  const slider = useRef<any>(null);
  const { data: videoProducts } = useQuery({
    queryKey: ["video-products"],
    queryFn: () => fetchVideoProducts(),
  });
  // console.log(similarData,"simildar data");

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
          slidesToScroll: 2.5,
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
      {videoProducts && videoProducts.length > 0 && (
        <div className="px-body bg-[#fef8fb] relative my-[2.5rem]">
          <div className="md:pt-6  ">
            <div className="text-center ">
              <h1 className="sm:text-3xl text-xl font-bold">WATCH AND SHOP</h1>
              {/* <div className="">
                <Link
                  href={`/view-all?type=${section?.widgetType}&id=${section?.widgetID}&name=${section?.sectionName}`}
                  className="text-primary font-medium underline"
                >
                  View All
                </Link>
              </div> */}
            </div>
            {/* <div> */}
            <div className="  justify-center items-center   md:py-12 py-6 ">
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
                    {videoProducts.map((item: any, idx: number) => {
                      return (
                        <div key={item?.id}>
                          <WatchShopCard item={item} />
                          {/* <ProductCard product={item} mx={2.5} /> */}
                        </div>
                      );
                    })}
                  </Slider>
                  <div className="">
                    <button
                      className={`${arrowButtonClass} right-0 lg:right-4 text-center flex items-center justify-center   `}
                      onClick={() => slider.current?.slickNext()}
                    >
                      <FlatIcon className="flaticon-left-arrow -rotate-180 text-white sm:text-xl text-lg font-bold" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchShopSlider;
