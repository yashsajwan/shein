"use client"
import React from 'react'
import FlatIcon from '../flatIcon/flatIcon';
import usrImg from "../../images/Ellipse 114.svg"
import profilePic from "../../images/Rectangle 110.png"
// import profilePic from "../../images/Rectangle 110.png"
import pic from "../../images/Ellipse 114.png"
import Image from "next/image";

const ReviewCard = ({item}) => {
    // console.log(item);
    
  return (
    <div className='flex flex-col gap-y-4'>
        <div className='flex justify-center items-center sm:flex-row flex-col gap-y-4 gap-x-4  w-full'>
        <div className=" rounded-full p-1 mb-2 flex items-center justify-center review-user">
      <div className=" rounded-full  relative" >
      <Image src={pic} alt="" width={1000} height={1000} style={{aspectRatio:"auto",width:"80px",height:"80px"}} className="rounded-full"/>
      {/* <div className="absolute bottom-0 right-0">
      <input placeholder='Destination Image' type='file' accept="image/*" onChange={async (e) => {
        // console.log(e.target.files[0],"from input");
                  await uploadTask(e.target.files[0])
                }} id="Destination-Image" className='w-full hover:cursor-pointer   outline-none px-[10px] py-[7px] hidden rounded-md border-[#bcbcbc] border-[1px]' />
                <label htmlFor='Destination-Image' className='hover:cursor-pointer '>v</label>
      </div> */}
      </div>
    </div>
        {/* <div className='h-[74px] w-[74px] rounded-full border border-gray-500 p-1'><div className='border border-gray-400 rounded-full w-full h-full'></div></div> */}
        <div className='sm:text-start text-center'>
            <h1 className='font-bold sm:text-base text-sm'>{item.name}</h1>
            <h3 className='text-[#999999] sm:text-sm text-xs font-semibold'>{item.about}</h3>
        </div>
        </div>
        <div className='flex flex-col gap-y-10 '>
        <div className='text-sm font-bold text-center leading-6'>{item.review}</div>
        <div className='flex justify-center items-center gap-x-1'>
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
            <FlatIcon className="flaticon-star lg:text-xl text-lg text-primary" />
        </div>
        </div>
    </div>
  )
}

export default ReviewCard