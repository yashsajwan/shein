"use client";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, fetchStates } from "../../utils/databaseService";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { initialAddress } from "../../utils/utilities";

const AddressEditModal = ({ setIsAddressEdit, item, isNewAddress = false }) => {
  const queryClient = useQueryClient();
  // console.log(item,"item");
  const [isLoading, setIsLoading] = useState(false);
  const [makeDefault, setMakeDefault]: any = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useState(item);
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
  });
  const { data: states } = useQuery({
    queryKey: ["stateCodes"],
    queryFn: () => fetchStates(),
    keepPreviousData: true,
  });

  const onConfirmHandler = async () => {
    setIsLoading(true);
    const userId = userData?.id;
    const docId = item?.id;
    if (userId && (isNewAddress || docId)) {
      if (isNewAddress) {
        await addDoc(collection(db, `users/${userId}/addresses`), state);
      } else {
        const docRef = doc(db, `users/${userId}/addresses`, docId);
        await setDoc(docRef, state, { merge: true });
      }

      await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      await queryClient.refetchQueries({ queryKey: ["userAddresses"] });
      if (makeDefault) {
        await setDoc(
          doc(db, "users", userId),
          { defaultAddress: state },
          { merge: true }
        );
      }
      await queryClient.invalidateQueries({ queryKey: ["userData"] });

      toast.success("Address updated successfully.");

      setIsLoading(false);
      setIsAddressEdit(false);
    } else {
      setIsLoading(false);
      setIsAddressEdit(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0  flex justify-center items-center z-50">
      <div className="lg:w-[50%] md:w-[70%] w-[90%] h-auto bg-[white] rounded-xl ">
        <div className="sm:px-8 px-4 sm:py-8 py-4 flex flex-col sm:gap-5 gap-3">
          <div className="flex sm:flex-row flex-col items-center w-full gap-5">
            <div className="sm:w-[100%] w-[100%]  flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
               First Name*
              </label>
              <input
                type="text"
                value={isClient && state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center w-full gap-5">
            <div className="sm:w-[50%] w-[100%] flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
                Phone No*
              </label>
              <input
                type="text"
                value={isClient && state.phoneNo}
                onChange={(e) =>
                  setState({ ...state, phoneNo: e.target.value })
                }
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
            <div className="sm:w-[50%] w-[100%] flex flex-col gap-2">
              <label htmlFor="" className="text-[#555555] text-sm">
                Email Address*
              </label>
              <input
                type="text"
                value={isClient && state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center w-full gap-5">
            <div className="sm:w-[100%] w-[100%] flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
                Address*
              </label>
              <input
                type="text"
                value={isClient && state.address}
                onChange={(e) =>
                  setState({ ...state, address: e.target.value })
                }
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center w-full gap-5">
            <div className="sm:w-[50%] w-[100%] flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
                City*
              </label>
              <input
                type="text"
                value={isClient && state.city}
                onChange={(e) => setState({ ...state, city: e.target.value })}
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
            <div className="sm:w-[50%] w-[100%] flex flex-col gap-2">
              <label htmlFor="" className="text-[#555555] text-sm">
                Pincode*
              </label>
              <input
                type="text"
                value={isClient && state.pincode}
                onChange={(e) =>
                  setState({ ...state, pincode: e.target.value })
                }
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center w-full gap-5">
            {/* new start  */}
            <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 ">
              <div className=" flex sm:gap-2 gap-1 flex-col w-full    ">
                <p className="text-[#555555] font-medium text-sm">State *</p>
                <Listbox
                  // value={userAddress?.stateCode}
                  // onChange={(e: any) => {
                  //   setUserAddress((val: any) => {
                  //     return { ...val, stateCode: e?.code, state: e?.state };
                  //   });
                  // }}
                  value={state?.stateCode}
                  onChange={(e: any) => {
                    setState((val: any) => {
                      return { ...val, stateCode: e?.code, state: e?.state };
                    });
                  }}
                >
                  <div className="relative  ">
                    <Listbox.Button className="relative w-full cursor-default     pr-10  text-left shadow-inner focus:outline-none sm:text-sm    border-b border-b-[#838383] ">
                      <span className="block truncate text-sm">
                        {state?.state || "Select"}
                      </span>
                      {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                up icon
              </span> */}
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {states &&
                          states.map((state, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-5 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {state?.state}
                                  </span>
                                  {state?.code === state?.stateCode ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      check
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            {/* new  end  */}
            {/* old state code start  */}
            {/* <div className="sm:w-[50%] w-[100%] flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
                State*
              </label>
              <input
                type="text"
                value={isClient&&state.state}
                onChange={(e) => setState({ ...state, state: e.target.value })}
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div> */}
            {/* old state code end */}
            {/* <div className="sm:w-[50%] w-[100%] flex flex-col gap-2 ">
              <label htmlFor="" className="text-[#555555] text-sm">
                State Code*
              </label>
              <input
                type="text"
                value={isClient&&state.stateCode}
                onChange={(e) => setState({ ...state, stateCode: e.target.value })}
                className="border-b border-b-[#838383] w-full outline-0 text-sm"
              />
            </div> */}
            {/* <div className='w-[50%]'>
              <label htmlFor="" className='text-[#555555] text-sm'>State code*</label>
              <input type="text" value={isClient&&item.stateCode} 
              onChange={(e) => setState({ ...state, stateCode:e.target.value })}
               className='border-b border-b-[#838383] w-full outline-0'/>
              </div> */}
          </div>

          <div className="flex items-center">
            <span className="mr-2">
              <input
                type="checkbox"
                name=""
                value={makeDefault}
                onChange={(e) => {
                  setMakeDefault(e.target.checked);
                }}
                id=""
              />
            </span>
            <p>Make this default address</p>
          </div>

          <div className="flex items-center w-full gap-5 mt-4">
            <div
              onClick={() => onConfirmHandler()}
              className="w-[50%] flex justify-center items-center cursor-pointer bg-primary text-white py-2"
            >
              <button>{isLoading ? <Loader /> : "Confirm"}</button>
            </div>
            <div
              onClick={() => setIsAddressEdit(false)}
              className="w-[50%] flex justify-center items-center cursor-pointer bg-secondary text-white py-2"
            >
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
