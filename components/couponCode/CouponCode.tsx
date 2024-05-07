import React,{useEffect,useState} from 'react'
import Link from "next/link";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../../config/firebase-config";
import {addAddressToUser,fetchStates,getUserData,updateDefaultAddress,} from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { initialAddress, paymentMethods, tabs } from "../../utils/utilities";
import { useAppSelector } from "../../redux/hooks";
import { getGstAppilicableInfo } from "../../utils/cartUtilities/cartUtility";
import { constant } from "../../utils/constants";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const CouponCode = () => {
  const router=useRouter()
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const [paymentSummary, setPaymentSummary] = useState(null);
  

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    
    keepPreviousData: true,
  });
// console.log(userData,"DATA----------");
const [addressToDeliver, setAddressToDeliver] = useState(
  (userData && userData?.defaultAddress) || initialAddress
);
async function getPaymentSummary() {
  const getPaymentSummaryDetails = httpsCallable(
    functions,
    "orders-getOrderPaymentDetails"
  );
  const isGst = await getGstAppilicableInfo();
  let data = {
    address: addressToDeliver,
    products: cart,
    isGstApplicable: isGst,
    customDeliverySettings: null,
  };
  const res = await getPaymentSummaryDetails(data);
  console.log(res,"res------------");
  
  setPaymentSummary(res.data);
}

// console.log(auth,"auth");

const onCheckOutHandler=()=>{
if(auth?.currentUser?.uid){
router.push("/checkout")
}else{
  toast.error("Please login first.")
}
}
  useEffect(()=>{
    getPaymentSummary()
  },[])
  return (<div className='flex flex-col w-full'>
    <div className=' border border-gray-400  flex flex-col w-full  px-5 py-5 '>
      <div className='flex  justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Price </h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>{constant.currency} {paymentSummary?.totalMrp.toFixed(2)}</h2></div>
      {/* <div className='my-4'><input type="text" className='border border-gray-300 w-full py-3 rounded px-3 outline-0' placeholder='Enter a Coupon Code' /></div> */}
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Subtotal</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>{constant.currency} {paymentSummary?.totalMrp.toFixed(2)}</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Shipping Fees</h3>
      <h2 className='font-semibold text-secondary sm:text-base text-sm' >{paymentSummary?.delivery?.deliveryCost === 0 ? "Free": `${constant.currency} ${paymentSummary?.delivery?.deliveryCost.toFixed(2)}`}</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Discount</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>       {constant.currency}{" "}
                      {paymentSummary?.discountOnMrp.toFixed(2)}</h2></div>
      <div className='flex items-center justify-between w-full'><h3 className='text-gray-500 font-medium sm:text-base text-sm mb-4'>Taxes</h3><h2 className='font-semibold text-secondary sm:text-base text-sm'>Rs. 3290</h2></div>
      <div className='w-full bg-gray-300 h-[1px]'></div>
      <div className='flex items-center justify-between w-full text-secondary'><h3 className=' font-medium sm:text-lg text-sm mt-3 mb-5'>Total</h3>
      <h2 className='font-semibold text-secondary sm:text-base text-sm'>{constant.currency}{" "}{paymentSummary?.totalPayable.toFixed(2)}</h2></div>
      {/* <Link href={"/checkout"} onClick={()=>onCheckOutHandler()}> */}
        <div className='flex  justify-between w-full' onClick={()=>onCheckOutHandler()}><button className='bg-secondary text-white font-semibold w-full text-center py-2 sm:text-base text-xs'>Checkout</button></div>
      {/* </Link> */}
    </div>
  </div>
  )
}

export default CouponCode