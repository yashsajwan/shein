import React from 'react'
import priceTagImg from "../../images/price-tag (1) 1.svg"
import deliveryTruckimg from "../../images/delivery-truck 1.svg"
import walletImg from "../../images/3d-wallet 1.svg"
import bgPink from "../../images/Rectangle 24105.svg"
import Image from 'next/image'
import coinImg from "../../images/Frame 1796.png"
import coinImg2 from "../../images/Group 1796.png"


const dummydata=[{image:priceTagImg,heading:"Extra 15% Off",text:"Extra 15% off on orders above rs. 999+ ",code:"NEW15"},
{image:deliveryTruckimg,heading:"Free Delivery",text:"Free delivery all over India on your first order "},
{image:walletImg,heading:"Secure Payments",text:"Offers Safe and Secured Payments to customers"},
{image:priceTagImg,heading:"24/7 Support",text:"Offers Safe and Secured Payments to customers"}]

const BonusPoints = () => {
  return (
    <div className=''>
      {/* <div className='flex justify-center border border-primary '><Image src={coinImg} alt='' className='border border-secondary'/></div> */}
      <div className='flex justify-center  w-full md:h-auto h-[150px] px-body relative'>
        <Image src={coinImg2} alt='' width={1000} height={1000} className=' w-[100%] md:h-auto h-[100%]  coin-img '  />
        <div className='absolute  left-1/2 transform -translate-x-1/2  text-center  w-[90%] sm:top-3 top-2 '>
          <h1 className='2xl:text-2xl  lg:text-xl md:text-lg sm:text-base text-sm font-semibold'>BONUS POINTS</h1>
          <h2 className='text-[#FF5A3C] 2xl:text-lg lg:text-base md:text-sm sm;text-sm text-xs font-semibold'>100 Points= Rs. 10</h2>
        </div>
        <div className='absolute sm:bottom-5 bottom-3 w-[100%]  px-[6%] flex flex-col md:gap-y-6 sm:gap-y-4 gap-y-2'>
          <div className='flex flex-col md:gap-y-2 gap-y-1'>
          <h2 className='2xl:text-xl lg:text-lg md:text-base sm:text-base text-sm font-semibold'>Confirm your Registration</h2>
          <h4 className='2xl:text-base lg:text-sm text-xs '>You may verify your email on your profile page to recieve <span className='text-[#EE4C42]'>100</span> Points.</h4>
          </div>
          <div className='flex justify-between font-medium 2xl:text-base md:text-sm sm:text-xs text-xs'>
            <h3 className='underline decoration-0'>Click here for more Information</h3>
            <h3> *New Users Only</h3>
          </div>
        </div>
        </div>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-y-2 px-body gap-x-4 '>

          {/* <div className='flex md:flex-nowrap justify-center flex-wrap w-fit lg:gap-10  gap-5 md:justify-between mx-auto px-body '> */}
            {dummydata.map((item:any,idx:number)=>{
                return <div className='' key={idx}>
                    <div className='relative '><Image src={bgPink} alt='' height={1000} width={1000}/>
                     <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <Image src={item.image} alt='' height={1000} width={1000} style={{width:"84px",height:"84px",aspectRatio:"auto"}}/></div></div>
                        <h1 className='text-center font-semibold text-lg  mb-1'>{item.heading}</h1>
                        <h6 className='text-center text-sm  '>
                            {item.text}
                            {item.code&&
                         <span className='text-base font-semibold'>CODE:{item.code&&item.code}</span>

                            }
                         {/* <span className='text-base font-semibold'>CODE : {item.code&&item.code}</span> */}
                         </h6>
                      {/* <div className='w-[198px]   flex flex-col items-center  gap-y-4  '>
          <div><Image src={promDressImg} alt="" width={1000} height={1000} style={{height:"198px",width:"198px",aspectRatio:"auto"}} className=''/></div>
          <div className='flex flex-col gap-y-2 items-center'><h1 className='md:text-lg text-base   font-bold'>PICK IT</h1>
          <h5 className='text-center  md:text-sm text-xs font-medium'>Select an outfit for your Friends and Family</h5>
          </div>
            </div> */}
                </div>
            })}
         
         
          
             
        </div>
    </div>
  )
}

export default BonusPoints