"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import referAndEarnImg from "../../images/Group 1797.svg"
import { auth } from '../../config/firebase-config'
import { toast } from 'react-toastify'
const ReferAndEarn = () => {
  const [textToCopy, setTextToCopy] = useState('Text to be copied');
  const [isCopied, setIsCopied] = useState(false);
  console.log(auth,"auth");
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true)
        toast.success("Link copied successfully.")
      })
      .catch(err => {
        toast.error("Failed to copy text")
        console.error('Failed to copy text: ', err)
      });
  };
  return (
    <div className='flex px-body md:flex-row flex-col items-center sm:gap-10 gap-5 justify-between w-full mt-8'>
        <div className='md:w-[55%] w-[100%] '>
            <h1 className='md:text-5xl text-2xl font-bold text-secondary'>Refer & Earn</h1>
            <p className='text-[#555555] sm:text-sm text-xs font-semibold mt-5 '>Welcome to our "Refer and Earn" program – the ultimate way to share the benefits of our products/services with your friends and family while earning fantastic rewards in the process.</p>
          {auth?.currentUser?.uid?
           <div className='md:mt-14 mt-6 w-fit flex gap-4 py-2 px-2'>
            <p className='border border-gray-500  px-5 py-1  border-dashed text-primary '>{textToCopy}</p>
           {/* <input type="text" value={"referandearn"} className='border border-secondary' /> */}
           <button onClick={()=>handleCopyClick()} className='bg-[#171717] text-white font-medium text-sm px-3 py-1'>Copy Link</button>
         </div>
          :
            <div className='md:mt-14 mt-6'><button className='bg-[#171717] text-white font-medium text-sm px-12 py-2.5'>Sign Up</button></div>
          }
            </div>
        <div className='md:w-[45%] sm:w-[70%] w-[100%]'><Image src={referAndEarnImg} alt='' height={1000} width={1000} style={{width:"100%",height:"auto",aspectRatio:"auto" }}/></div>
    </div>
  )
}

export default ReferAndEarn