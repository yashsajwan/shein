"use client"
import React from 'react'
import FlatIcon from '../../flatIcon/flatIcon'
import { useScrollDirection } from "../../../utils/useScroll";

const FeaturesHeader = () => {
  const isScrolled = useScrollDirection();

  return (
    <div className={`${isScrolled?"mt-[55px]":"md:mt-[200px] mt-[139px]"}  w-full px-body   h-auto `}>
   <div className='md:grid hidden md:grid-cols-4 grid-cols-2 py-2  justify-between items-stretch'>
   <div className="flex gap-2 justify-center items-center ">
      <FlatIcon className=" text-primary flaticon-free-delivery md:text-2xl lg:text-4xl font-bold" />
      <p className="md:text-sm lg:text-lg font-semibold">All India Free Delivery</p>
    </div>
    <div className="flex gap-2 justify-center items-center ">
      <FlatIcon className=" text-primary flaticon-fast-delivery md:text-2xl lg:text-4xl font-bold" />
      <p className="md:text-sm lg:text-lg font-semibold">Fast Delivery</p>
    </div>
    <div className="flex gap-2 justify-center items-center ">
      <FlatIcon className=" text-primary flaticon-trending-topic md:text-2xl lg:text-4xl font-bold" />
      <p className="md:text-sm lg:text-lg font-semibold">Trending Style</p>
    </div>
    <div className="flex gap-2 justify-center items-center ">
      <FlatIcon className=" text-primary flaticon-delivery-status-3 md:text-2xl lg:text-4xl font-bold" />
      <p className="md:text-sm lg:text-lg font-semibold">Easy Return & Exchange</p>
    </div>
   </div>
  </div>
  )
}

export default FeaturesHeader