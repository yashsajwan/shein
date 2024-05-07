import React, { useState } from "react";
import { paymentMethods, tabs } from "../../utils/utilities";
import FlatIcon from "../flatIcon/flatIcon";
import cashImg from "../../images/cod.png";
import cardImg from "../../images/credit-card (2) 1.svg";
import phoneImg from "../../images/payment-method (1) 1.svg";
import Image from "next/image";
const PaymentMethodTab = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setSelectedTab,
  setCompletedSteps,
  showCod,
}) => {
  // console.log(showCod,"pppppppppp")
  const [selectionIndex, setSelectionIndex] = useState(-1);

  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full ">
      <h6 className="font-medium  xl:text-base md:text-base text-sm ">
        Choose your preferred Payment Method
      </h6>
      <div className="flex flex-col gap-3 sm:mt-12 mt-4">
        {/* {paymentMethods.map((method, idx) => {
          // console.log(method.value)
          return (
            <div
              onClick={() => {
                setSelectionIndex(idx);
                setSelectedPaymentMethod(method.value);
                // setSelectedTab(tabs[2]);
                // setCompletedSteps((val: any) => {
                //   if (!val?.includes(tabs[2])) {
                //     let arr = val;
                //     arr.push(tabs[2]);
                //     console.log(arr,"from payment method tab");
                    
                //     return arr;
                //   }
                // });
              }}
              className="flex justify-between items-center sm:px-8 px-5 py-2 bg-white  border  border-[#838383]  cursor-pointer "
              key={idx}
            >
              <div className="flex sm:gap-8 gap-4 items-center">
                <div className=""><Image src={  
                  method?.value === "cod"
                        ? cashImg
                        : cardImg
                        } 
                        alt="" height={1000} width={1000} className="aspect-auto w-[50px]"/></div>
                <p className="text-black md:text-base text-sm font-semibold">{method.name}</p>
              </div>
              <div className="flex gap-4">
              {selectionIndex === idx && <p>✔️</p>} 
              <div><FlatIcon icon={"flaticon-arrow-down text-lg"} /></div>
              </div>
            </div>
          );
        })} */}

        {paymentMethods.map((method, idx) => {
          if (!(method.value === "cod" && showCod === false)) {
            return (
              <div
                onClick={() => {
                  setSelectionIndex(idx);
                  setSelectedPaymentMethod(method.value);
                }}
                className="flex justify-between items-center sm:px-8 px-5 py-2 bg-white  border  border-[#838383]  cursor-pointer "
                key={idx}
              >
                <div className="flex sm:gap-8 gap-4 items-center">
                  <div>
                    <Image
                      src={method?.value === "cod" ? cashImg : cardImg}
                      alt=""
                      height={1000}
                      width={1000}
                      className="aspect-auto w-[50px]"
                    />
                  </div>
                  <p className="text-black md:text-base text-sm font-semibold">
                    {method.name}
                  </p>
                </div>
                <div className="flex gap-4">
                  {selectionIndex === idx && <p>✔️</p>}
                  <div>
                    <FlatIcon icon={"flaticon-arrow-down text-lg"} />
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="flex justify-between items-center sm:px-8 px-5 py-2 bg-white  border  border-[#838383]   "
                key={idx}
              >
                <p className="text-black md:text-base text-sm font-semibold">
                  Cash On Delivery Not Applicable On These Coupons.
                </p>
              </div>
            );
          }
        })}
        {/* <div
            
              className="flex justify-between items-center sm:px-8 px-5 py-2 bg-white  border  border-[#838383]  cursor-pointer "
            
            >
              <div className="flex sm:gap-8 gap-4 items-center">
                <div className=""><Image src={phoneImg} alt="" height={1000} width={1000} className="aspect-auto w-[50px]"/></div>
                <p className="text-black md:text-base text-sm font-semibold">Phone Pay</p>
              </div>
              <div className="flex gap-4">
          
              <div><FlatIcon icon={"flaticon-arrow-down text-lg"} /></div>
              </div>
            </div> */}
      </div>
    </div>
  );
};

export default PaymentMethodTab;
