"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getUserPoints } from '../../utils/databaseService';

const Points = ({cookie}) => {
    const { data: userPoints } = useQuery({
        queryKey: ["userPoints"],
        queryFn: () => getUserPoints(cookie),
        //
        // keepPreviousData: true,
        // enabled: isClient,
      });
      console.log("userPoints",userPoints);
      
  return (
<div className='w-[100%] h-full'>
    {/* <div className='flex flex-col gap-5 '> */}
    {userPoints&&userPoints.length>0?
  <div className='flex flex-col gap-5 w-full h-full'>
    {
          userPoints.map((item:any,idx:number)=>{
            return <div key={idx} className='border border-gray-400 p-5 flex flex-col gap-3'>
    <p className='text-lg font-semibold text-primary'>{item.msg}</p>
    <div className='flex flex-col gap-2'>
    <div className='flex items-center gap-1 text-base font-semibold'>
            <p className=' font-semibold text-gray-500 '>Points{" "}:{" "}</p>
            <p className={``}>{item?.point}</p>
        </div>
        <div className='flex items-center gap-1 text-base font-semibold'>
            <p className=' font-semibold text-gray-500 '>Type{" "}:{" "}</p>
            <p className={`${item.type==="debit"?"text-[red]":"text-[green]"}`}>{item?.type}</p>
        </div>
        
    </div>
            </div>
        })
    }
  </div>
  :
  <div className='w-full h-full flex  justify-center items-center sm:text-xl text-sm text-gray-500'>No Points Found !</div>
}

    {/* </div> */}

</div>
  )
}

export default Points