"use client"
import React,{useState} from 'react'
import Image from "next/image";
import logo from "../../images/Frame 34284.svg"
import img1 from "../../images/delivery-status 1.svg"
import img2 from "../../images/timing 1.svg"
import img3 from "../../images/protection 1.svg"
import FlatIcon from '../flatIcon/flatIcon';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { toast } from 'react-toastify';


const data = [{ image: img1, heading: "30 DAYS RETURN", subHeading: "Simply return it within 30 days" }, { image: img2, heading: "FREE & FAST DELIVERY", subHeading: "On order over Rs 999" }
  , { image: img3, heading: "SECURE PAYMENT", subHeading: "100% safe Payments" }]


const dummy_data = ["FDHGFHGH", "HJGHKJK", "FDGFGFH", "FDGFGFH", "FDGFGFH", "FDGFGFH", "FDGFGFH", "FDGFGFH", "FDGFGFH", "KKUIYU", "KKUIYU", "KKUIYU", "KKUIYU"]




const NewsLetter = () => {
  const [email,setEmail]=useState("")

  const onSubscribeSumbitHandler=async()=>{
  const data={
    email:email,
    createdAt:new Date(),
  }
    console.log("submitted");
    await addDoc(collection(db, "newsletter"), data)
    toast.success("Subscribed !")
    setEmail("")
    // .then((result) => {
    //   console.log("Document written with ID: ", result.id);
    // })
    // const docRef = await addDoc(collection(db, "newsletters"), data);
    // console.log("Document written with ID: ", docRef.id);
  }
  return (
    <div className='w-full'>
      <div className='bg-secondary py-2  '>
        <h4 className='text-center text-primary font-semibold md:text-base sm:text-sm text-xs'>Join Our SHEIN STYLE STORES Gang!</h4>
      </div>
      <div className='flex justify-center items-center mt-3'><Image src={logo} alt=''
        className="aspect-auto sm:w-[190px] w-[130px] h-auto "
        width={1000}
        height={1000}
      /></div>
      <div className='px-body '>
        <div className='   sm:my-10 my-5 sm:py-[60px] py-[30px] px-3 border border-primary'>
          <h1 className='text-center text-secondary md:text-3xl sm:text-2xl text-xl font-bold mb-[15px]'>NEWSLETTER</h1>
          <p className='text-center text-[#555555] font-semibold mb-1 md:text-base sm:text-sm text-xs '>Join now and get 10% off on your next purchase and Be the first to know about </p>
          <p className='text-center text-[#555555] font-semibold  md:text-base sm:text-sm text-xs '>new collections and exclusive offers.</p>
          <div className='flex sm:w-[60%] w-[100%] mx-auto justify-between mb-2 sm:mt-[100px] mt-[50px] email-container  items-center gap-3'>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  type='email' className=' w-full outline-0' placeholder='Your email address' />
            <div onClick={()=>onSubscribeSumbitHandler()} className='flex gap-2 text-secondary md:text-base text-xs font-semibold cursor-pointer'><p>SUBSCRIBE</p>
              <FlatIcon icon={"flaticon-arrow rotate-180 text-secondary text-xl"} />
            </div>
          </div>
          <div className="bg-secondary    p-[1px] sm:w-[60%] w-[100%] mx-auto h-[2px]"></div>
        </div>
      </div>
      <div className='px-body sm:mb-[50px] mb-[25px]  '><h1 className='text-secondary md:text-2xl sm:text-xl text-lg font-semibold  text-center mb-5'>POPULAR SEARCH</h1 >
        <div className='flex text-[#333333] font-medium text-center md:text-sm text-xs'>CROP TOP   I  BLOUSE TOPS  I   SHORT DRESSES   I  BAGGY CARGO    I  PARACHUTE PANTS    I  WIDE LEG JEANS  MIDI DRESSES   I   OVERSIZED T-SHIRT   I   SATIN SHIRT   I   OVERSIZED HOODIES   I   SWEATSHIRT   I  SWEATPANTS PARTY DRESSES    I   PULLOVERS   I  TROUSERS    I  PURSE & BAGS  </div>
      </div>
      <div className="border-b-[1px] border-[#EBEBEB] border-line"></div>
      <div className='flex flex-wrap lg:flex-nowrap px-body w-full lg:justify-between justify-center lg:gap-18 gap-5 items-center sm:py-[40px] py-[20px] '>
        {data.map((item: any, idx: number) => {
          return <div className='flex items-center gap-4  md:w-auto sm:w-[60%] w-full' key={idx} >
            <div ><Image src={item.image} alt='' height={1000} width={1000} style={{ aspectRatio: "auto", width: "65px", height: "auto" }} /></div>
            <div>
              <h2 className='text-secondary font-bold mb-1 md:text-lg sm:text-sm text-xs'>{item.heading}</h2>
              <p className='text-[#555555] font-medium md:text-base sm:text-sm text-xs'>{item.subHeading}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default NewsLetter