"use client";
import React from "react";
import { fetchHomeSections } from "../../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import BrandCard from "../brandCard/BrandCard";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Brands = ({ section, myKey, isBrand = false }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });

  
const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
  };

  return (
    <>
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div className="px-body py-4 flex flex-col justify-center">
            {section?.sectionName && (
              <div className="mb-10 ">
                <h3 className="text-lg lg:text-4xl font-semibold">
                  {section?.sectionName}
                </h3>
              </div>
            )}
            {/* <div className=" flex flex-wrap justify-center items-center relative lg:mt-5"> */}
            <div className=" w-full    ">

            <Slider {...carouselSettings}>
              {homeData &&
                homeData?.data?.filter(
                  (val: any) => val?.id === section?.widgetID
                ) &&
                homeData?.data?.filter(
                  (val) => val?.id === section?.widgetID
                ) &&
                homeData?.data
                  ?.filter((val: any) => val?.id === section?.widgetID)[0]
                  ?.arr?.map((brand: any, idx: any) => {
                    // console.log(homeData?.data
                    //   ?.filter((val: any) => val?.id === section?.widgetID)[0]
                    //   ?.arr)
                    return (
                      <div key={idx} className="flex-1 mx-2 ">
                        <BrandCard brand={brand} />
                      </div>
                    );
                  })}

            </Slider>
            </div>
          </div>
        )}
    </>
  );
};

export default Brands;
