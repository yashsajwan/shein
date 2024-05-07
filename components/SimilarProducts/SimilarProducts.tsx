import React, { useEffect, useState, useRef } from 'react'
import { fetchSimilarProductsForCart } from '../../config/typesense'
import ProductCard from '../categoryProduct/productCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FlatIcon from '../flatIcon/flatIcon';

const SimilarProducts = ({ heading, similarProductData,from }) => {
  // console.log(similarProductData, "dfgggfdh---------");
// console.log(from,"from");

  const [similarProducts, setSimilarProducts] = useState([])
  const slider = useRef<any>(null);

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
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          infinite: false,
          dots: false,
          arrows: false
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
    {similarProductData&&similarProductData.length > 0&&<div className=''>
      <div className={`px-body ${from==="cart"?"text-start":"text-center"}`}><h1 className={` ${from==="cart"?"sm:text-2xl text-xl" :"sm:text-3xl text-xl"} ${from==="cart"?"font-semibold":"font-bold"}`}>{heading}</h1></div>
      <div className={` justify-center items-center relative   ${from==="cart"?"my-5":"md:my-12 my-6"}`}>
      <div className="">
                <button
                  className={`${arrowButtonClass} left-0 lg:left-4 flex items-center justify-center`}
                  onClick={() => slider.current?.slickPrev()}
                >
                  <FlatIcon className="flaticon-left-arrow text-white sm:text-xl text-lg font-bold"/>
                </button>
              </div>
        <div className="back  ">
          <div className="w-[100%] px-body h-auto only-carousel">
            <Slider
              ref={slider}
              {...settings}
              className=""
              dotsClass={`slick-dots `}
              nextArrow={<></>}
              prevArrow={<></>}
              draggable={true}
            >
              {similarProductData && similarProductData.length > 0 && similarProductData.map((item: any, idx: number) => {
                return <div key={idx} >
                  <ProductCard product={item} mx={2.5} />
                </div>

              })}
            </Slider>
          </div>
        </div>
        <div className="">
                <button
                  className={`${arrowButtonClass} right-0 lg:right-4 text-center flex items-center justify-center   `}
                  onClick={() => slider.current?.slickNext()}
                >
                  <FlatIcon className="flaticon-left-arrow -rotate-180 text-white sm:text-xl text-lg font-bold"/>
                </button>
              </div>
      </div>
    </div>
  }
  </>
  )
}

export default SimilarProducts