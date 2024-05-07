"use client"
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchUsersOrdersList, getUserData } from '../../utils/databaseService';
import Image from 'next/image';
import { constant } from '../../utils/constants';
import OrderDetailsPage from './OrderDetailsPage';

const OrderPage = ({setSelectedTab,selectedTab,onView}) => {
    // console.log(selectedTab,"tab");
    const [IsOrderPage,setIsOrderPage]=useState(false)
    const [orderPageData,setOrderPageData]=useState("")
    
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUserData(null),
    });
    const { data: orderList } = useQuery({
        queryKey: ["orderData"],
        queryFn: () => fetchUsersOrdersList(userData?.id),
    })
// console.log("orderList",orderList);


    return (
        <>
        {IsOrderPage?<OrderDetailsPage singleOrder={orderPageData}/>:
        (
            <div className='w-full h-full '>
                {orderList&&orderList.length===0?
                <div className='w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500'>No Orders Found !</div>:
                
                <div className='w-full flex md:flex-row flex-col gap-x-8 gap-y-6  h-auto'>
                    {/* <div className='md:w-[25%] w-[100%] border border-primary h-fit md:px-5 px-3 md:py-5 py-3 cursor-pointer'>
                        <div className=''><h3 className='text-primary font-semibold md:text-base text-sm mb-1'>My Orders{" "}({orderList?.length})</h3></div>
                        <h4 onClick={()=>setSelectedTab(6)} className='text-gray-500 text-xs font-semibold'>View Order Status</h4>
                    </div> */}
                    <div className='md:w-[100%] w-[100%] flex flex-col gap-y-5 h-auto'>
                        {
                            orderList && orderList.length > 0 && orderList.map((orders: any, idx: number) => {
                                return <div className=' border border-primary ' key={idx}>
                                    <div className=' flex flex-col h-auto'>
                                        <div className='flex  items-center justify-between  md:px-5 px-3 py-3 border-b border-b-primary '>
                                            <h3 className='  md:text-sm text-xs font-semibold'>OD{orders.orderId}</h3>
                                            <div className='flex items-center gap-5  md:text-sm text-xs font-semibold '>
                                                <h3 >items{" "}:{" "}{orders?.products?.length}</h3>
                                                <div onClick={()=>{
                                                    // console.log("clicked");
                                                    setIsOrderPage(true)
                                                    setOrderPageData(orders)
                                                    
                                                }}><button className='text-primary '>View Order Details</button></div>
                                            </div>
                                        </div>
                                        <div className=' h-auto flex flex-col border-container'>
                                            {
                                                orders?.products.map((item: any, idx: number) => {
                                                    // console.log(item?.img?.url,"url---------",item.productId,item.name);
                                                    
                                                    return <div className={`flex lg:flex-row flex-col lg:items-center justify-between gap-5 h-auto  py-5 md:px-5 px-3  cursor-pointer ${!(idx === orders?.products?.length - 1) && "border-b border-b-gray-400 "}`}>
                                                        <div className='flex items-center sm:gap-x-8 gap-x-4 '>
                                                            <div className='h-[108px] w-[108px] '>
                                                                <Image src={item?.img?.url?item?.img?.url:constant.errImage} alt='' width={1000} height={1000} className='aspect-auto h-[100%] w-[100%] object-fill ' />
                                                            </div>
                                                            <div className='flex flex-col gap-y-3'>
                                                                <h2 className='md:text-base text-sm font-semibold line-clamp-1 '> {item?.name}</h2>
                                                                <h5 className='text-gray-500 md:text-sm text-xs font-semibold'>Qty{" "}:{" "}{item?.quantity}</h5>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center gap-x-2'>
                                                            <div className={`h-[10px] w-[10px] rounded-full ${orders?.status==="Confirmed"&&"bg-[#6AC113]"} ${orders?.status==="Cancelled"&&"bg-[red]"} ${orders?.status==="Returned"&&"bg-gray-500"} ${orders?.status==="Delivered"&&"bg-[blue]"} `}></div>
                                                            <div><h3 className={` md:text-sm text-xs font-semibold ${orders?.status==="Cancelled"&&"text-[red]"||orders?.status==="Confirmed"&&"text-[#6AC113]"||orders?.status==="Returned"&&"text-gray-500"||orders?.status==="Confirmed"&&"text-[#6AC113]"||orders?.status==="Delivered"&&"text-[blue]"} `}>{orders?.status}</h3></div>
                                                        </div>


                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                }
            </div>
        )
            }
        </>
    )
}

export default OrderPage