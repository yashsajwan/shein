"use client"
import React from 'react'
import Image from 'next/image';
import { constant } from '../../utils/constants';

const OrderDetailsPage = ({singleOrder}) => {
  console.log("singleOrder",singleOrder);
  
  return (
    <>
    <div className='w-full  '>
      <div className=' '>
      <div className='flex justify-between bg-primary px-5 py-2.5 text-white sm:text-sm text-xs'>
        <div>Order Number{" "}:{" "}OD{singleOrder?.orderId}</div>
        {/* <div>QTY{" "}:{" "}{singleOrder?.products?.length}</div> */}
      </div>
      <div className='border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400'>
        <div className='flex justify-between items-center xl:px-5 px-5 py-5 '>
          <p className='font-semibold sm:text-sm text-xs'>Status:</p>
          <p className='text-[#FFAB07] sm:text-sm text-xs bg-[#FFF8EC] px-5 py-1.5'>{singleOrder?.status}</p>
        </div>
        <div className='flex flex-col gap-7 '>
        {
          singleOrder.products.map((item:any,idx:number)=>{
            return <div key={idx} className='md:px-5 px-3 '>
              <div className={`flex lg:flex-row flex-col lg:items-center justify-between gap-5 h-auto    cursor-pointer `}>
            <div className='flex items-center sm:gap-x-8 gap-x-4 '>
                <div className='h-[108px] w-[108px] '>
                    <Image src={item?.img?.url?item?.img?.url:constant.errImage} alt='' width={1000} height={1000} className=' h-[100%] w-[100%] object-fill ' />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='xl:text-base text-sm font-semibold line-clamp-1 '> {item?.name}</h2>

                    <div className="flex items-center gap-2 text-[#555555] xl:text-sm text-xs font-medium ">
              <span>Size : </span> <span>
                {/* {item?.pack?.weight} */}
                {item?.pack?.weight?.split("/")&&item?.pack?.weight?.split("/")[0]}
                </span>{" "}
                {item?.pack?.weight?.includes("/")? 
                <div><span>|</span>  Color :  <span> 
                    {/* {item?.color?.name} */}
                  {item?.pack?.weight?.split("/")[1]}</span></div>:null}
              
            </div>
            <h5 className='text-[#555555] xl:text-sm text-xs'>Qty{" "}:{" "}{item?.quantity}</h5>

            <div className="flex items-center   gap-4 mt-3 ">
              <p className="text-center text-black xl:text-base text-sm font-bold leading-[29px]">
                {constant?.currency} {item?.price?.toFixed(2)}
              </p>
              <p className=" text-[#555555] xl:text-sm text-xs font-semibold line-through">
                {constant?.currency} {item?.mrpPrice?.toFixed(2)}
              </p>
            </div>
                </div>
                
            </div>
            {/* <div className='flex flex-col items-center  gap-2'>
              <h3 className='text-xs text-[#555555]'>Expected date by :</h3>
              <h3 className='text-sm font-semibold'>22nd August 2023</h3>
            </div> */}
            </div>
        </div>
          })
        }
        </div>
           <div>
<div><h2 className='xl:text-xl text-base font-semibold px-5 mt-5'>Order Summary</h2></div>
<div className='2xl:w-[40%] sm:w-[60%] w-full flex flex-col gap-3 px-7 py-5'>
  <div className='flex justify-between xl:text-base text-sm '>
    <h3 className='text-gray-500 font-medium'>Subtotal</h3>
    <h3 className='t font-semibold'>{constant?.currency} {singleOrder?.totalMrp.toFixed(2)}</h3>
  </div>
  <div className='flex justify-between xl:text-base text-sm '>
  <h3 className='text-gray-500 '>Shipping Fees</h3>
    <h3 className='font-semibold'>{constant?.currency} {singleOrder?.delivery?singleOrder?.delivery.toFixed(2):"Free"}</h3>
  </div>
  <div className='flex justify-between xl:text-base text-sm '> 
  <h3 className='text-gray-500'> Discount</h3>
    <h3 className='font-semibold'>{constant?.currency} {singleOrder?.discountOnMrp.toFixed(2)}</h3>
  </div>
  {singleOrder?.pointDiscount&&
     <div className='flex justify-between xl:text-base text-sm '> 
     <h3 className='text-gray-500'>Loyality Point Discount</h3>
       <h3 className='font-semibold'>{constant?.currency} {singleOrder?.pointDiscount.toFixed(2)}</h3>
     </div>
  }
 {singleOrder?.couponDiscount!==0&&<div className='flex justify-between xl:text-base text-sm '> 
  <h3 className='text-gray-500'>Coupon Discount</h3>
    <h3 className='font-semibold'>{constant?.currency} {singleOrder?.couponDiscount.toFixed(2)}</h3>
  </div>}
  {/* <div className='flex justify-between xl:text-base text-sm '>
  <h3 className='text-gray-500'>Taxes</h3>
    <h3 className='font-semibold'>Rs. 100</h3>
  </div> */}
  <div className='w-full border-b border-b-gray-500 xl:text-base text-sm  my-1'></div>
  <div className='flex justify-between xl:text-base text-sm '>
  <h3 className='font-semibold'>Total</h3>
  <h3 className='font-semibold'>{constant?.currency} {singleOrder?.totalAmountToPaid.toFixed(2)}</h3>
</div>
</div>

</div>
      </div>
    </div>
    </div>
    </>
  )
}

export default OrderDetailsPage