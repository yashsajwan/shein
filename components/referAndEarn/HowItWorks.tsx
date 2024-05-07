import React from 'react'
import promDressImg from "../../images/prom_dress 1.svg"
import coinsImg from "../../images/Group 1788.svg"
import whatsAppImg from "../../images/whatsapp (1) 1.svg"
import instaImg from "../../images/instagram (1) 1.svg"
import fbImg from "../../images/facebook (1) 2.svg"
import telegramImg from "../../images/telegram 1.svg"
import Image from 'next/image'
const HowItWorks = () => {
  return (
    <div className='md:mb-20 mb-10 px-body  w-full'>
      <h1 className='text-center md:text-2xl text-lg font-bold md:my-12  my-6'>HOW IT WORKS?</h1>
      <div className='flex md:flex-nowrap sm:justify-center flex-wrap w-fit lg:gap-20  gap-5 md:justify-between mx-auto '>
        <div className='sm:w-[198px] w-full  flex sm:flex-col flex-row items-center  gap-y-4 gap-x-4   '>
          <div><Image src={promDressImg} alt="" width={1000} height={1000} style={{ height: "198px", width: "198px", aspectRatio: "auto" }} className='' /></div>
          <div className='flex flex-col gap-y-2 items-center'><h1 className='md:text-lg text-base   font-bold'>PICK IT</h1>
            <h5 className='text-center  md:text-sm text-xs font-medium'>Select an outfit for your Friends and Family</h5>
          </div>
        </div>
        <div className='sm:w-[198px] w-full   flex sm:flex-col flex-row  gap-x-12  items-center gap-y-4 '>
          <div className='sm:h-[198px] w-[120px] flex flex-col gap-4    '>
            <div className='flex w-full gap-4'>
              <Image src={whatsAppImg} alt="" style={{ width: "50%" }} />
              <Image src={instaImg} alt="" style={{ width: "50%" }} /></div>
            <div className='flex w-full gap-4'>
              <Image src={fbImg} alt="" style={{ width: "50%" }} />
              <Image src={telegramImg} alt="" style={{ width: "50%" }} />
            </div>
          </div>
          <div className='flex flex-col gap-y-2 items-center sm:text-start text-end'><h1 className='md:text-lg text-base   font-bold'>SHARE</h1>
            <h5 className='text-center   md:text-sm text-xs font-medium'>Share it with your Friends and Family</h5>
          </div>
        </div>
        <div className='sm:w-[198px] w-full  flex sm:flex-col flex-row gap-x-4 items-center  gap-y-4  '>
          <div><Image src={coinsImg} alt="" width={1000} height={1000} style={{ height: "198px", width: "198px", aspectRatio: "auto" }} className='' /></div>
          <div className='flex flex-col gap-y-2 items-center'><h1 className='md:text-lg text-base font-bold'>EARN</h1>
            <h5 className='text-center   md:text-sm text-xs font-medium'>Earn 10% Commission by advertising products</h5>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HowItWorks