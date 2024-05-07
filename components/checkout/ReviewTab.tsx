import Image from "next/image";
import React, { useState, useEffect } from "react";
import { constant } from "../../utils/constants";
import { paymentMethods } from "../../utils/utilities";
import FlatIcon from "../flatIcon/flatIcon";
import cashImg from "../../images/cod.png";
import cardImg from "../../images/credit-card (2) 1.svg";
const ReviewTab = ({
  addressToDeliver,
  selectedPaymentMethod,
  paymentSummary,
  placeOrder
}) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  useEffect(() => {
    setIsClient(true)
  }, [paymentSummary])
  // console.log(paymentSummary, "sunaary");
  // console.log(addressToDeliver, "address");
  // console.log(selectedPaymentMethod, "payment");

useEffect
  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full ">
      <h6 className="font-medium  xl:text-base md:text-base text-sm ">Please review your order details.</h6>
      <div className="w-full flex flex-col sm:gap-5 gap-3 ">
        <div className="flex  items-center justify-end xl:text-base sm:text-base text-sm text-secondary font-semibold  sm:mt-12 mt-4 "><h3 className="text-end">Order Number:</h3 ><h3 className="text-end">#47858740844</h3></div>
        <div className="border border-gray-400     flex flex-col gap-4">
          {isClient && paymentSummary &&
            isClient && paymentSummary?.products?.map((product, idx) => {
              // console.log(product,"product,");
              
              return (
                <div className="flex sm:flex-row flex-col items-center sm:items-start px-4 py-4 gap-8 " key={idx}>
                  <div className="h-fit w-fit  ">
                    <Image
                      src={
                        product?.img?.url?.includes("assets/img/")
                          ? constant.errImage
                          : product?.img?.url
                      }
                      alt=""
                      width={1000}
                      height={1000}
                      className="   "
                      style={{ aspectRatio: "auto", width: "120px", height: "134px" }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <h3 className="font-bold text-black lg:text-lg sm:text-lg text-base  mb-2">
                      {/* Asymmetrical Frayed Bustier */}
                      {product?.name}
                    </h3>
                    <div className="flex gap-2  text-[#555555] lg:text-sm text-xs font-semibold mb-1">Size : <span> {product?.description?.split("/")[0]}</span>   {product?.description?.includes("/")? <div><span>|</span> Color :  <span>{product?.description?.split("/")[1]}</span></div>:null}</div>
                    <h3 className="font-semibold text-black text-opacity-75 lg:text-sm text-xs   mb-6">Qty:
                      {" "}{product?.quantity}
                      {/* 1 */}
                    </h3>
                    <h3 className="font-bold  text-secondary lg:text-xl sm:text-xl text-base ">
                      {constant?.currency} {product?.price?.toFixed(2)}
                    </h3>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border border-gray-400     flex flex-col px-4 py-4 gap-4">
          <h4 className="font-bold text-black xl:text-lg text-lg  ">Billing Details</h4>
          <div className="flex flex-col gap-1 ">
            <p className="text-secondary text-base font-semibold">
              {addressToDeliver?.name}
              {/* Theresa Webb */}
            </p>
            <p className="text-secondary text-base font-semibold">
              {addressToDeliver?.address}
              {/* 2972 Westheimer Rd. Santa Ana, Illinois 85486 */}
            </p>
            <p className="text-secondary text-base font-semibold">
              {/* {addressToDeliver?.phoneNo} */}
              {/* (319) 555-0115 */}
              {addressToDeliver?.phoneNo}
            </p>
          </div>
          {/* <div className=" "><button className="bg-secondary text-white flex items-center gap-1 py-1 px-7 xl:text-base text-base font-semibold"><span><FlatIcon icon={"flaticon-plus-1 text-[10px] font-bold"} /></span><span>Add Address</span></button></div> */}
        </div>
        <div className="border border-gray-400   flex flex-col p-4 gap-4">
          <h4 className="font-bold text-black xl:text-lg text-lg">Payment Method</h4>
          <div className="flex flex-col gap-3">
            <div className="text-secondary xl:text-lg text-lg font-bold flex items-center gap-x-2 ">

              <div className=""><Image src={selectedPaymentMethod==="cod"? cashImg: cardImg} alt="" height={1000} width={1000} className="aspect-auto w-[50px]" /></div>

              {
                paymentMethods.filter(
                  (method: any) => method.value === selectedPaymentMethod
                )[0]?.name
              }
            </div>
            {/* <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Card Number</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">1232 * * * * * * * * 2762 (Visa)</h3>
            </div> */}
            {/* <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Card Holder</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">Arjun Rawat</h3>
            </div> */}
            {/* <div className="">
              <h3 className="font-semibold xl:text-sm text-sm mb-1">Expired</h3>
              <h3 className="text-[#999999] xl:text-text-sm text-sm font-semibold">May 2025</h3>
            </div> */}
          </div>
        </div>
      </div>
      {/* order btn start  */}
      {/* <div className="flex items-center justify-end mt-4 gap-2">
        <button
          className="px-10 border border-black hover:bg-white hover:text-black rounded-full py-2 bg-primary text-white"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div> */}
      {/* order btn end */}
    </div>
  );
};

export default ReviewTab;

