"use client";
import React, { useEffect, useState } from "react";
import { fetchHomeSections } from "../../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ReactPlayer from "react-player";

const ImageBlock = ({ myKey, section, isVideo = false }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.docSnap && (
          <div className="px-body">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                {isClient && isVideo ? (
                  <ReactPlayer
                    controls={true}
                    url={`https://www.youtube.com/watch?v=${
                      homeData?.data?.filter(
                        (val: any) => val?.id === section?.widgetID
                      )[0]?.docSnap?.videoID
                    }`}
                  />
                ) : (
                  <Image
                    src={
                      homeData?.data?.filter(
                        (val: any) => val?.id === section?.widgetID
                      )[0]?.docSnap?.coverImage?.org
                    }
                    alt="banner"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-fill rounded-xl max-h-[200px] lg:max-h-max"
                  />
                )}
              </div>
              <div
                className="flex-1 flex flex-wrap overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html:
                    homeData?.data?.filter(
                      (val: any) => val?.id === section?.widgetID
                    )[0]?.docSnap?.description || "",
                }}
              />
            </div>
          </div>
        )}
    </>
  );
};

export default ImageBlock;
