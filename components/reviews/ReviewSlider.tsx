"use client"
import React,{useRef} from 'react'
import ReviewCard from './ReviewCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FlatIcon from '../flatIcon/flatIcon';

const ReviewSlider = () => {
    const data=[{image:"",name:"Zia Mohyeddin",about:"Video Creator - Influencer",review:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",ratings:"5"},
    {image:"",name:"Zia Mohyeddin",about:"Video Creator - Influencer",review:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",ratings:"5"},
    {image:"",name:"Zia Mohyeddin",about:"Video Creator - Influencer",review:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",ratings:"5"}
]
   

const slider = useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        //   dots: true,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        //   dots: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        //   dots: true,
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
    "absolute top-0 bottom-0 my-auto bg-[#fef8fb] w-10 h-10 block text-white cursor-pointer z-20";
  return (
    <div className='flex  md:flex-row flex-col gap-y-8 items-center  justify-between px-body  md:py-16 py-8 gap-x-4 bg-[#fef8fb] my-[2.5rem]'>
        <div className='md:w-[40%]  w-[90%] '>
            <div className='  w-[100%]  flex flex-col  gap-y-2'>
            <h1 className='sm:text-3xl text-xl  font-bold '>WHAT THEY&apos;RE SAYING</h1>
            <h6 className='text-[#555555] font-medium text-xs leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h6>
            </div>
        </div>
        <div className="flex justify-center items-center relative lg:mt-5   md:w-[60%] w-[100%] ">
              <div className="">
                <button
                  className={`${arrowButtonClass} left-0 lg:-left-4 flex items-center justify-center`}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-left-arrow text-secondary text-2xl font-bold"/>

                  {/* L */}
                </button>
              </div>

              <div className="back ">
              {/* <div className="w-[50%] h-auto border border-[red] "> */}

                <div className="w-[50vw] lg:w-[45vw] h-auto  ">
                  <Slider
                    ref={slider}
                    {...settings}
                    className=""
                    dotsClass={`slick-dots `}
                    arrows={true}
                    nextArrow={<></>}
                    prevArrow={<></>}
                    draggable={true}
                  >
                    {data.map((item:any,idx:number)=>{
                        return <div key={idx}>
                            <ReviewCard item={item}/>
                        </div>
                    })}
                  </Slider>
                </div>
              </div>

              <div className="">
                <button
                  className={`${arrowButtonClass} right-0 lg:-right-4 text-center flex items-center justify-center   `}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-left-arrow -rotate-180 text-secondary text-2xl font-bold"/>

                  {/* R */}
                  {/* <FlatIcon className="flaticon-left-arrow lg:text-xl text-lg" /> */}
                </button>
              </div>
            </div>
      </div>
  )
}

export default ReviewSlider