"use client"
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import product1 from "../../images/productimg1.svg";
import Image from "next/image";
import { constant } from "../../utils/constants";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  initializeCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";
import { updatedCartFromBackend } from "../../utils/cartUtilities/cartUtility";
import CartItemCard from "../cartitemcard/Cartitemcard";
import CouponCode from "../couponCode/CouponCode";
import { addCartObjToUser, fetchSingleProduct, } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import { auth, db, functions } from "../../config/firebase-config";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CartComponent = ({cookie}) => {
  const cart = useAppSelector((state) => state.cartReducer.cart);
  // console.log(cart,"cart--------------------");
  const router=useRouter()
  const dispatch = useDispatch();
  const [updatedCart, setUpdatedCart] = useState(cart);
  const [loading, setLoading] = useState(true);

  const { data: similarData } = useQuery({
    queryKey: ["product", "caricature-cartoon", "similar-product"],
    queryFn: () => fetchSimilarProductsForCart({ searchKeywords: ["Gentlemen's Collection", 'Nike']  })
  })

  const onCheckOutHandler=()=>{
    if(auth?.currentUser?.uid){
    router.push("/checkout")
    }else{
      toast.error("Please login first.")
    }
    }
  
  async function updateCart() {
    // console.log("hii");
    // console.log(updateCart.length);
    
    if (updatedCart.length !== 0) {
      const newCart = await updatedCartFromBackend(updatedCart);
// console.log(newCart,"newCart--------------");

      setUpdatedCart(newCart);
      dispatch(initializeCart(newCart));
    }

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      // console.log("inside if");
      
      updateCart();
    } else {
      // console.log("inside elss");
      setUpdatedCart(cart);
    }
  }, [cart]);

//   useEffect(() => {
//  console.log("updatedCart",updatedCart);
 
//   }, [cart]);

  if (!updatedCart || updatedCart?.length === 0) {
    return (
      <div className="flex flex-col px-body justify-center items-center gap-6 h-[70vh]">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href={"/"} className="bg-black text-white px-3 py-2">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col px-body  w-full md:mb-10 mb-5 md:pt-0 sm:pt-10 pt-5 md:mt-8 mt-4  ">
      <div className="flex flex-col sm:gap-10 gap-5  border-gray-300   w-full ">
        <div className=" md:w-[100%] w-[100%]">
          <div className='flex items-center gap-2 md:mb-8 mb-4'>
            <h1 className='font-semibold md:text-2xl text-xl px-2 '>MY CART </h1>
          </div>
          <div className=" flex flex-col gap-y-4">
          {
            updatedCart?.map((item: any, key: any) => (
              <div key={key}>
              <CartItemCard mykey={key} item={item} cookie={cookie} />
              </div>
            ))}
            </div>
        </div>
        <div className='flex  justify-center items-center w-full' onClick={()=>onCheckOutHandler()}><button className='bg-secondary text-white font-semibold sm:w-[40%] w-full text-center py-2 sm:text-base text-xs'>Checkout</button></div>

        {/* <div className=" md:w-[30%] sm:w-[80%] w-[90%] md:mx-0 mx-auto">
          <div className='flex items-center gap-2 sm:mb-8 mb-4'>
            <h1 className='font-semibold md:text-xl text-lg px-2'>ORDER SUMMARY </h1><h3 className='text-sm font-semibold text-secondary'>(1 Item)</h3>
          </div>
          <CouponCode />
        </div> */}
      </div>
     
      {/* <Link href={"/checkout"}>
          <div className=" my-16  flex  w-full justify-center items-center  h-[60px] rounded-br-[10px]  bg-primary text-white">
            <p className=" h-[25px] text-center text-white text-xl font-semibold leading-[25px] tracking-tight">Proceed to Checkout</p>
          </div>
        </Link> */}
      {/* </div> */}
    </div>
    <div className=" md:my-20 my-10">
            <SimilarProducts heading={"YOU MIGHT ALSO LIKE"} similarProductData={similarData} from="cart"/>
          </div>
    </>
  );
};



export default CartComponent;
