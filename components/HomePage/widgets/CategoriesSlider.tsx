"use client";
import React, { useRef, useState } from "react";
import CategoryCard from "../../categoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeSections } from "../../../utils/databaseService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CategoryGrid from "./CategoryGrid";
import { getDocFromWidget } from "../../../utils/databaseService";
import FlatIcon from "../../flatIcon/flatIcon";
import PopUp from "../../popUp/PopUp";
import Link from "next/link";
const CategoriesSlider = ({ section, myKey }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
 
  const { data: widgetData } = useQuery({
    queryKey: ["widgetDoc"],
    queryFn: () => getDocFromWidget(section?.widgetID),
  });
  // console.log(widgetData,"widgetData");
  // console.log(homeData.data,"homedata from CategoriesSlider ");
  const data = homeData?.data?.filter(
    (val: any) => val?.id === section?.widgetID
  );
  // console.log(homeData.data,"home data");
  // console.log(data,"data-------------------->");
  // console.log(section,"section");
  const slider = useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          // dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          // dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const arrowButtonClass =
    "absolute top-0 bottom-0 my-auto  w-10 h-10 block text-white cursor-pointer z-20";
  // console.log(widgetData&&widgetData[0]?.style?.itemStyle?.style,"style");
  // if(widgetData&&widgetData[0]?.style?.itemStyle?.style!=="one"){
  //    return <CategoryGrid section={section}/>
  // }
  return (
    <>
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div className=" px-body ">
            {section?.sectionName && (
              <div
                //     onClick={()=>{
                //   setShowPopUp((prev)=>!prev)
                // }}
                className=" flex  flex-col items-center gap-2 justify-center sm:mt-5 sm:mb-10 mb-5"
              >
                <h1 className="text-secondary sm:text-3xl text-xl font-bold  ">
                  {section?.sectionName}
                </h1>
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

            {/* <div className="flex justify-center items-center relative md:my-12 my-6 "> */}
            {/* <div className="">
                <button
                  className={`${arrowButtonClass} left-0 lg:-left-4 flex justify-center items-center `}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-left-arrow text-2xl font-bold text-secondary"/>
                </button>
              </div> */}
            <div className="back ">
              <div className="w-full h-auto   ">
                <div className="grid xl:grid-cols-6  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-x-4 gap-x-2 sm:gap-y-4 gap-y-2">
                  {/* <Slider
                    ref={slider}
                    {...settings}
                    className=""
                    dotsClass={`slick-dots `}
                    arrows={true}
                    nextArrow={<></>}
                    prevArrow={<></>}
                    draggable={true}
                  > */}
                  {homeData &&
                    homeData?.data?.filter(
                      (val: any) => val?.id === section?.widgetID
                    ) &&
                    homeData?.data?.filter(
                      (val) => val?.id === section?.widgetID
                    ) &&
                    homeData?.data
                      ?.filter((val: any) => val?.id === section?.widgetID)[0]
                      ?.arr?.map((cat: any, idx: any) => {
                        // console.log();
                        return (
                          <div className="" key={idx}>
                            <CategoryCard
                              cat={cat}
                              heading={cat?.name}
                              slug={cat?.slug?.name}
                              path={
                                cat?.isSubcategories
                                  ? `/category/${cat?.slug?.name}`
                                  : `/shop/category/${cat?.slug?.name}`
                              }
                            />
                          </div>
                        );
                      })}
                </div>
                {/* </Slider> */}
              </div>
            </div>
            {/* <div className="">
                <button
                  className={`${arrowButtonClass} right-0 lg:-right-4 flex justify-center items-center -rotate-180 `}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-left-arrow text-2xl font-bold text-secondary"/>
                </button>
              </div> */}
            {/* </div> */}
            {/* category grid start  */}
            {/* <div>
  <CategoryGrid section={section}/>
</div> */}
          </div>
        )}
      {/* {
  showPopUp&&<PopUp  setShowPopUp={setShowPopUp}/>
} */}
    </>
  );
};
export default CategoriesSlider;
