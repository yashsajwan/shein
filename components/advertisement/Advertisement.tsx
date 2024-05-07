"use client"
import React from 'react'
import Image from 'next/image'
import advestisingImg from '../../images/Group 34289.png'

const Advertisement = () => {
  return (
    <>
    <div className='flex px-body '>
      <div className=' flex md:flex-row flex-col w-full gap-x-10 gap-y-5 items-center '>
        <div className='md:w-[45%] w-[100%]  flex flex-col sm:gap-y-12 gap-y-6'>
          <div className='flex flex-col sm:gap-y-6 gap-y-4 sm:text-start text-center'>
            <h1 className='lg:text-3xl  text-xl font-bold '><span className='text-primary'>ADVERTISE </span>OUR PRODUCTS<br></br> AND <span className='text-primary'>EARN</span></h1>
            <p className='lg:text-base text-sm font-semibold '>By advertising our products , you can Earn 10% commission. <br></br>Share with your friends and family.</p>
            </div>
            <div className='  w-full sm:text-start text-center flex justify-center sm:justify-start'>
              <button className='bg-secondary lg:text-sm text-xs text-white px-12 py-3 w-fit '>SIGN UP</button></div>
        </div>
        <div  className='md:w-[55%] w-[100%]  '>
            <Image src={advestisingImg} alt='' width={1000} height={1000} className='w-[100%] h-auto'/>
        </div>
        </div>
    </div>
    </>
  )
}

export default Advertisement