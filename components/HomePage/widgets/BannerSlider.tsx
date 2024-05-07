// "use client";
// import React, { useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchHomeSections } from "../../../utils/databaseService";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Image from "next/image";
// import { bannerLink } from "../../../utils/bannerLink/bannerLinking";

// const BannerSlider = ({ section, myKey }) => {
//   const { data: homeData } = useQuery({
//     queryKey: ["homeSections"],
//     queryFn: fetchHomeSections,
//   });
//   const slider = useRef<any>(null);

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   // let arr=homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]?.arr
// const data = homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]?.arr
//   console.log(data,"arr");
//   console.log("hii");

//   // console.log(homeData,"home data");
  
//   function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return <div className={`${className}`} onClick={onClick} />;
//   }

//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return <div className={`${className}`} onClick={onClick} />;
//   }
  
//   return (
//     <div className="relative">
//       {homeData &&
//         homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
//         homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
//         homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
//           ?.arr?.length !== 0 && (
//           <div className="w-full">
//             <Slider
//               ref={slider}
//               {...settings}
//               // nextArrow={<></>}
//               // prevArrow={<></>}
//               nextArrow={<SampleNextArrow />}
//               prevArrow={<SamplePrevArrow />}
//               className="overflow-hidden"
//             >
//               {homeData &&
//                 homeData?.data?.filter(
//                   (val: any) => val?.id === section?.widgetID
//                 ) &&
//                 homeData?.data?.filter(
//                   (val) => val?.id === section?.widgetID
//                 ) &&
//                 homeData?.data
//                   ?.filter((val: any) => val?.id === section?.widgetID)[0]
//                   ?.arr?.map((banner: any, idx: any) => (
//                     <div
//                       className="h-auto w-full"
//                       key={idx}
//                       onClick={() => bannerLink(banner)}
//                     >
//                       <Image
//                         src={banner?.image?.org}
//                         alt={banner?.image?.caption || "image"}
//                         width={1000}
//                         height={100}
//                         layout="responsive"
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   ))}
//             </Slider>
//           </div>
//         )}
//     </div>
//   );
// };

// export default BannerSlider;

// import React, { useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchHomeSections } from "../../../utils/databaseService";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Image from "next/image";
// import { bannerLink } from "../../../utils/bannerLink/bannerLinking";

// const BannerSlider = ({ section, myKey }) => {
//   const { data: homeData } = useQuery({
//     queryKey: ["homeSections"],
//     queryFn: fetchHomeSections,
//   });
//   const slider = useRef<any>(null);

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Show 3 images at a time in the slider
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="relative">
//       {homeData && homeData?.data?.filter((val: any) => val?.id === section?.widgetID)?.length > 0 && (
//         <div className="w-full">
//           {homeData?.data
//             ?.filter((val: any) => val?.id === section?.widgetID)[0]
//             ?.arr?.length === 1 ? ( // Check if there is only one image
//             <div
//               className="w-full"
//               onClick={() =>
//                 bannerLink(
//                   homeData?.data
//                     ?.filter((val: any) => val?.id === section?.widgetID)[0]
//                     ?.arr[0]
//                 )
//               }
//             >
//               <Image
//                 src={
//                   homeData?.data
//                     ?.filter((val: any) => val?.id === section?.widgetID)[0]
//                     ?.arr[0]?.image?.org
//                 }
//                 alt={
//                   homeData?.data
//                     ?.filter((val: any) => val?.id === section?.widgetID)[0]
//                     ?.arr[0]?.image?.caption || "image"
//                 }
//                 width={1000}
//                 height={100}
//                 layout="responsive"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           ) : (
//             homeData?.data
//               ?.filter((val: any) => val?.id === section?.widgetID)[0]
//               ?.arr?.map((banner: any, idx: any) => (
//                 <div
//                   className={`h-auto w-${100 / homeData?.data
//                     ?.filter((val: any) => val?.id === section?.widgetID)[0]
//                     ?.arr?.length}%`}
//                   key={idx}
//                   onClick={() => bannerLink(banner)}
//                 >
//                   <Image
//                     src={banner?.image?.org}
//                     alt={banner?.image?.caption || "image"}
//                     width={1000}
//                     height={100}
//                     layout="responsive"
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BannerSlider;



"use client";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeSections } from "../../../utils/databaseService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bannerLink } from "../../../utils/bannerLink/bannerLinking";
import FlatIcon from "../../flatIcon/flatIcon";
import Link from "next/link";
const BannerSlider = ({ section, myKey }) => {
  const router = useRouter();
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
  });
  const slider = useRef<any>(null);
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    "absolute top-0 bottom-0 my-auto bg-primary sm:w-8 sm:h-8 h-8 w-8 block text-white cursor-pointer z-20 rounded-full";
  return (
    // <div className="relative" key={myKey}>
    <>
      {homeData &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID) &&
        homeData?.data?.filter((val) => val?.id === section?.widgetID).length >
          0 &&
        homeData?.data?.filter((val: any) => val?.id === section?.widgetID)[0]
          ?.arr?.length !== 0 && (
          <div className="w-full  relative  ">
             <div className="">
                <button
                  className={`${arrowButtonClass} left-0 lg:-left-0 flex items-center justify-center`}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-left-arrow text-white sm:text-xl text-lg font-bold"/>
                </button>
              </div>
            <Slider
              ref={slider}
              {...settings}
              dotsClass={`slick-dots `}
              nextArrow={<></>}
              prevArrow={<></>}
              autoplay={true}
              dots={false}
              className="relative"
            >
              {homeData &&
                homeData?.data?.filter(
                  (val: any) => val?.id === section?.widgetID
                ) &&
                homeData?.data?.filter(
                  (val) => val?.id === section?.widgetID
                ) &&
                homeData?.data
                  ?.filter((val: any) => val?.id === section?.widgetID)[0]
                  ?.arr?.map((banner: any, idx: any) => (
                    <Link
                    target="_blank"
                    href={`${bannerLink(banner)}`}
                    onClick={(e) => {
                      if (
                        !bannerLink(banner) ||
                        bannerLink(banner)?.includes("undefined")
                      ) {
                        // console.log("inside preventDefault");
                        
                        e.preventDefault();
                      }
                    }}
                      className="sm:h-auto h-[235px] w-full  "
                      key={idx + 100}
                      // onClick={async () => {
                      //   let res = await bannerLink(banner);
                      //   console.log({ res });
                      //   if (res.isMultiple) {
                      //     router.push(res.path);
                      //   } else {
                      //     router.push(res.path);
                      //   }
                      // }}
                    >
                      <Image
                        src={banner?.image?.org}
                        alt={banner?.image?.caption || "image"}
                        width={1000}
                        height={100}
                        // layout="responsive"
                        className="object-fill w-[100%] h-[100%]  "
                      />
                    </Link>
                  ))}
            </Slider>
            <div className="">
                <button
                  className={`${arrowButtonClass} right-0 lg:-right-0 text-center flex items-center justify-center   `}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-left-arrow -rotate-180 text-white sm:text-xl text-lg font-bold"/>
                </button>
              </div>
          </div>
        )}
    </>
    // </div>
  );
};
export default BannerSlider;

