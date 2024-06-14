"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CheckoutNewAddress from "./CheckoutNewAddress";
import {
  getUserAddresses,
  getUserData,
  updateDefaultAddress,
} from "../../utils/databaseService";
import { initialAddress } from "../../utils/utilities";
import React, { useState, useEffect } from "react";
import Modal from "../Modal/modal";
import { CircularProgress } from "@mui/material";
import CartComponent from "../cart/CartComponent";

function ShippingTab(props) {
  const queryClient = useQueryClient();
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);

  // console.log(props.userData,"from shipping");

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),

    keepPreviousData: true,
  });
  // console.log(userData,"user");

  const { data: userAddresses } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(null),

    keepPreviousData: true,
  });
  const [isClient, setIsClient] = useState(false);

  const [selectAddressModal, setSelectAddressModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col md:mt-2 mt-4 w-full  ">
      <h6 className="font-medium  xl:text-base md:text-base text-sm  ">
        Enter your Shipping Details
      </h6>
      {isClient &&
      props.userData?.defaultAddress &&
      isClient &&
      !props.isNewAddress ? (
        <div className="flex flex-col gap-4 ">
          <div className=" border border-primary mt-4 flex justify-between  px-4 py-4  shadow-md">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-lg font-medium">Shipping Address</p>
              <div className="flex flex-col gap-2">
                <p className="font-medium">
                  Name:{" "}
                  <span className="text-gray-500">
                    {isClient && props.userData?.defaultAddress?.name}{" "}
                    {isClient && props.userData?.defaultAddress?.lastName}
                  </span>
                </p>
                <p className="font-medium">
                  Address:{" "}
                  <span className="text-gray-500">
                    {isClient && props.userData?.defaultAddress?.address}
                  </span>
                </p>
                <p className="font-medium">
                  Phone:{" "}
                  <span className="text-gray-500">
                    {isClient && props.userData?.defaultAddress?.phoneNo}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <button
                onClick={() => {
                  setSelectAddressModal(true);
                }}
                className=" bg-primary  hover:shadow-inner hover:shadow-gray-300 text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer  border border-primary"
              >
                Change Address
              </button>
              <button
                className=" bg-primary hover:shadow-inner hover:shadow-gray-3 text-white py-2 px-2 hover:bg-white hover:text-black cursor-pointer  border border-primary"
                onClick={() => {
                  props.setUserAddress(initialAddress);
                  props.setIsNewAddress(true);
                }}
              >
                Add New Address
              </button>
            </div>
          </div>

          <Modal isOpen={selectAddressModal} setOpen={setSelectAddressModal}>
            <Modal isOpen={isAddressUpdating} setOpen={setIsAddressUpdating}>
              <div className="flex flex-col gap-2 justify-center items-center">
                <CircularProgress className="!text-white"></CircularProgress>
              </div>
            </Modal>
            <div className="bg-white w-[95vw] md:w-[70vw] lg:w-[40vw]  max-h-[90vh] lg:max-h-[80vh] p-4 rounded-br-xl relative overflow-auto">
              <h3 className="text-lg lg:text-xl font-semibold">
                Select Address
              </h3>

              <div className="flex flex-col gap-4 mt-3 ">
                {userAddresses && userAddresses.length > 0 ? (
                  <div className="">
                    {userAddresses?.map((address: any) => {
                      return (
                        <div
                          key={address?.id}
                          className="flex py-2 px-2 justify-between items-center border border-gray-200 rounded-md my-3"
                        >
                          <div className="flex flex-col gap-2">
                            <p className="font-medium">
                              Name:{" "}
                              <span className="text-gray-500">
                                {address?.name}
                              </span>
                            </p>
                            <p className="font-medium">
                              Address:{" "}
                              <span className="text-gray-500">
                                {address?.address}
                              </span>
                            </p>
                            <p className="font-medium">
                              Phone:{" "}
                              <span className="text-gray-500">
                                {address?.phoneNo}
                              </span>
                            </p>
                            <p className="font-medium">
                              State:{" "}
                              <span className="text-gray-500">
                                {address?.state}
                              </span>
                            </p>
                          </div>
                          <div>
                            <button
                              className="px-4 py-2 bg-primary rounded-md text-white"
                              onClick={async () => {
                                setIsAddressUpdating(true);
                                props.setUserAddress(address);
                                await updateDefaultAddress(address);
                                await queryClient.invalidateQueries({
                                  queryKey: ["userData"],
                                });
                                setIsAddressUpdating(false);
                                setSelectAddressModal(false);
                              }}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <CheckoutNewAddress
          states={props.states}
          userAddress={props.userAddress}
          setUserAddress={props.setUserAddress}
          handleAddressSubmit={props.handleAddressSubmit}
          makeDefaultAddress={props.makeDefaultAddress}
          setMakeDefaultAddress={props.setMakeDefaultAddress}
          handleChange={props.handleChange}
          setIsNewAddress={props.setIsNewAddress}
        />
      )}

      {/* <CheckoutNewAddress
          states={props.states}
          userAddress={props.userAddress}
          setUserAddress={props.setUserAddress}
          handleAddressSubmit={props.handleAddressSubmit}
          makeDefaultAddress={props.makeDefaultAddress}
          setMakeDefaultAddress={props.setMakeDefaultAddress}
          handleChange={props.handleChange}
          setIsNewAddress={props.setIsNewAddress}
        /> */}

      <CartComponent getPaymentSummary={props.getPaymentSummary} type="secondary" cookie={props.cookie} />
    </div>
  );
}

export default ShippingTab;
