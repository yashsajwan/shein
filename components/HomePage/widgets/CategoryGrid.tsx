"use client";
import React, { useEffect, useState } from "react";
import CategoryGridCard from "../categoryGridCard/CategoryGridCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeSections } from "../../../utils/databaseService";
import FlatIcon from "../../flatIcon/flatIcon";
import Link from "next/link";
const CategoryGrid = ({ section }) => {
  // console.log("section",section);
  

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });

  const endDate = new Date(section?.endAt).getTime(); // Convert to milliseconds
  const now = new Date().getTime();
  // console.log(endDate > now ? "true" : "false");

  useEffect(() => {
    // Calculate the time difference between now and the end date
    // Convert to milliseconds

    const timeDifference = endDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the countdown state
    setCountdown({ days, hours, minutes, seconds });

    // Update the countdown every second
    const intervalId = setInterval(() => {
      const newTimeDifference = endDate - new Date().getTime(); // Convert to milliseconds
      const newDays = Math.floor(newTimeDifference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (newTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const newMinutes = Math.floor(
        (newTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const newSeconds = Math.floor((newTimeDifference % (1000 * 60)) / 1000);

      setCountdown({
        days: newDays,
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
  //   // If the countdown is zero, the end date and time have passed, so don't render the component
  //   return null;
  // }

  return (
    <>
      {endDate > now && (
        <div className="px-body my-[2.5rem]">
          <div className="text-3xl  text-center font-bold mb-5 ">
            {/* <div><span className='text-primary'>#SHIEN </span><span>STYLE STORES</span></div>
        <h1>COMBO SALE</h1> */}
            <h1>
              {/* {section?.sectionName} */}
              #SHEIN <span className="text-primary">Style Store</span> Combo
              Sale
            </h1>
          </div>
          <div className="flex items-center justify-between w-full mb-14">
            {/* <div className="flex items-center gap-6 w-1/3 ">
            <div className="text-xl font-semibold">Ends in</div>
            <div className="flex items-center gap-x-2">
              <div className="px-3 py-2 bg-primary text-white text-base font-semibold">
                08
              </div>
              <div>:</div>
              <div className="px-3 py-2 bg-primary text-white">46</div>
              <div>:</div>
              <div className="px-3 py-2 bg-primary text-white">23</div>
            </div>
          </div> */}

            <div className="flex items-center sm:gap-6 gap-2 lg:w-1/3 w-fit  ">
              <div className="xl:text-xl text-base font-semibold">Ends in</div>
              <div className="flex items-center gap-x-2 lg:text-base text-sm">
                {/* <div className="md:px-3 px-2 md:py-2 py-1 bg-primary text-white  font-semibold">{countdown.days}</div> */}
                {/* <div>:</div> */}
                <div className="md:px-3 px-2 md:py-2 py-1  bg-black  text-white">
                  {countdown.hours?.toString().padStart(2, "0")}
                </div>
                <div>:</div>
                <div className="md:px-3 px-2 md:py-2 py-1  bg-black text-white">
                  {countdown.minutes?.toString().padStart(2, "0")}
                </div>
                <div>:</div>
                <div className="md:px-3 px-2 md:py-2 py-1  bg-black text-white">
                  {countdown.seconds?.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
            {/* w-1/3 */}
            <Link
              href={`/view-all?type=${section?.widgetType}&id=${section?.widgetID}&name=${section?.sectionName}`}
              className="text-primary  w-fit text-center  font-medium underline "
            >
              View All
            </Link>
            <div className="lg:flex items-center lg:w-1/3 w-0 hidden ">
              {/* <div className='h-[48px] w-[48px] flex items-center justify-center rounded-full arrow-container cursor-pointer'><FlatIcon className="flaticon-arrow text-lg"/></div>
            <div className='h-[48px] w-[48px] flex items-center justify-center rounded-full arrow-container cursor-pointer'><FlatIcon className="flaticon-arrow rotate-180 text-lg"/></div> */}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {homeData &&
              homeData?.data?.filter(
                (val: any) => val?.id === section?.widgetID
              ) &&
              homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
              homeData?.data
                ?.filter((val: any) => val?.id === section?.widgetID)[0]
                ?.arr?.map((cat: any, idx: any) => {
                  // console.log();

                  return (
                    <div className="" key={idx}>
                      <CategoryGridCard
                        cat={cat}
                        path={
                          cat?.isSubcategories
                            ? `/category/${cat?.slug?.name}`
                            : `/shop/category/${cat?.slug?.name}`
                        }
                        // heading={cat?.name}
                        // slug={cat?.slug?.name}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      )}
      {/* <CategoryGridCard/> */}
    </>
    // <div><CategoryGridCard/></div>
  );
};

export default CategoryGrid;
