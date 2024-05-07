"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import overlayimg from "../../../images/deal-bg_1 1.svg";
import clock from "../../../images/clock.svg";
import {
  fetchHomeSections,
  fetchSectionData,
} from "../../../utils/databaseService";
import ProductListCard from "../productListCard/ProductListCard";
import Link from "next/link";

const ProductList = ({ section, myKey }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  const { data: sectionData } = useQuery({
    queryKey: ["sections", section?.widgetID],
    queryFn: () => fetchSectionData(section?.widgetID),
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
        sectionData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div
            className="px-body py-[5.5rem] flex flex-col gap-8 relative"
            style={{
              backgroundColor:
                sectionData?.style?.widgetStyle?.backgroundColor || "#FFFFF",
            }}
          >
            <div className="absolute top-0 left-0  w-full h-full ">
              <Image
                src={overlayimg}
                alt=""
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between  mb-6">
              {section?.sectionName && (
                <div className="flex  flex-col items-center gap-2 justify-center ">
                  <h3 className="text-[#FFFFFF] text-lg lg:text-4xl font-semibold">
                    {section?.sectionName}
                  </h3>
                  <div className="">
                    <Link
                      href={`/view-all?type=${section?.widgetType}&id=${section?.widgetID}&name=${section?.sectionName}`}
                      className="text-primary font-medium underline"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              )}

              <div className="rounded-full shadow-xl bg-white flex gap-4 px-8 py-4">
                <div>
                  <Image
                    src={clock}
                    alt=""
                    width={25}
                    height={25}
                    className="  "
                  />
                </div>
                <p className="text-lg font-medium">Ends In : 05hr 30min</p>
              </div>
            </div>

            <div className="w-full   ">
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
                    ?.arr?.map((product: any, idx: any) => (
                      <div key={idx} className="px-2 w-full">
                        <ProductListCard product={product?.data || product} />
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        )}
    </>
  );
};

export default ProductList;
