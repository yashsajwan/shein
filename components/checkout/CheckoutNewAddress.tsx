// new 
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  addressFromPinCode,
  getUserAddresses,
  getUserData,
} from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";

function CheckoutNewAddress(props) {
  // console.log(props,"props");
  
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
    
    keepPreviousData: true,
  });
  const { data: userAddresses } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(null),
    
    keepPreviousData: true,
  });
  return (
    <div className="flex flex-col sm:gap-y-8 gap-y-4 sm:mt-12 mt-4  ">

     {/* <div className="flex flex-wrap w-full    justify-between mt-6 border border-[red] "> */}
      <div className="w-full  flex sm:flex-row flex-col gap-y-3 gap-x-5">
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]  ">
        <p className="  text-[#555555] font-medium text-sm  ">First Name*</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="name"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%] ">
        <p className="text-[#555555] font-medium text-sm">Last Name *</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="lastName"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      </div>
      <div className="w-full  flex sm:flex-row flex-col gap-y-3 gap-x-5">
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%] ">
        <p className="text-[#555555] font-medium text-sm">Email Address *</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="email"
          name="email"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]  ">
        <p className="text-[#555555] font-medium text-sm">Phone No.</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="phoneNo"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      </div>
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[100%]  ">
        <p className="text-[#555555] font-medium text-sm">Address*</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="address"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      <div className=" w-full flex sm:flex-row flex-col gap-y-3 gap-x-5 ">
      {/* <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]  ">
        <p className="text-[#555555] font-medium text-sm">Address Line 2*</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="address2"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>  */}
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]  ">
        <p className="text-[#555555] font-medium text-sm">City *</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="city"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div>
      <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]   ">
        <p className="text-[#555555] font-medium text-sm">State *</p>
        <Listbox
          value={props.userAddress?.stateCode}
          onChange={(e: any) => {
            props.setUserAddress((val: any) => {
              console.log(e,"e");
              
              return { ...val, stateCode: e?.code, state: e?.state };
            });
          }}
        >
          <div className="relative  ">
            <Listbox.Button className="relative w-full cursor-default  bg-white  pl-3 pr-10  text-left shadow-inner focus:outline-none sm:text-sm py-2 h-14  border border-[#838383] px-2">
              <span className="block truncate">
                {props.userAddress?.state || "Select"}
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
                {props.states &&
                  props.states.map((state, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
                          {state?.code === props.userAddress?.stateCode ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              {/* <CheckIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                      /> */}
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
      {/* city  */}
      {/* <div className="w-full  flex sm:flex-row flex-col gap-y-3 gap-x-5"> */}
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-y-3 gap-x-5">

      {/* <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[50%]  ">
        <p className="text-[#555555] font-medium text-sm">City *</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="city"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          id=""
        />
      </div> */}
      {/* city end  */}
      <div className=" flex sm:gap-2 gap-1 flex-col w-full   ">
        <p className="text-[#555555] font-medium text-sm">Pin Code *</p>
        <input
          className="py-3 h-14  border border-[#838383] px-2 outline-0"
          type="text"
          name="pincode"
          onChange={async (e) => {
            props.handleChange(e.target.name, e.target.value);

            if (e.target.value.length === 6) {
              const res = await addressFromPinCode(e.target.value);

              if (res) {
                const pickedState = props.states.filter(
                  (e) =>
                    `${e?.state}`.toLowerCase() ===
                    `${res["PostOffice"][0]["State"]}`.toLowerCase()
                );
                props.setUserAddress((val) => {
                  return {
                    ...val,
                    state: pickedState[0]["state"],
                    stateCode: pickedState[0]["code"],
                    city: res["PostOffice"][0]["District"],
                    country: res["PostOffice"][0]["Country"],
                  };
                });
              }
            }
          }}
          id=""
        />
      </div>
      </div>
      {/* county input start  */}
      {/* <div className=" flex sm:gap-2 gap-1 flex-col w-full md:w-[48%] my-5 ">
        <p className="text-[#555555] text-[15px] font-semibold">Country *</p>
        <Listbox
          value={props.userAddress?.country}
          onChange={(e: any) => {
            props.setUserAddress((val: any) => {
              return { ...val, country: e };
            });
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default  bg-white  pl-3 pr-10  text-left shadow-inner focus:outline-none sm:text-sm py-2 h-14  border border-[#838383] px-2">
              <span className="block truncate">
                {props.userAddress?.country || "Select Country"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                up icon
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <Listbox.Option
                  key={"INDIA"}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={"India"}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {"India"}
                      </span>
                      {props.userAddress?.country === "India" ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon
                         className="h-5 w-5"
                         aria-hidden="true"
                       />
                          check
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div> */}
{/* country input end  */}
{/* default address checkbox start  */}
      {/* <div className="w-full flex sm:gap-2 gap-1 items-center justify-between mt-4">
        <div className="flex gap-2">
          <input
            type="checkbox outline-0"
            name=""
            id=""
            value={props.makeDefaultAddress}
            onChange={(e) => {
              props.setMakeDefaultAddress(e.target.checked);
            }}
          />
          <span className="text-neutral-600 text-[15px] font-semibold">Make this default address</span>
        </div>
        
      </div> */}
{/* default address checkbox end  */}
{/* Select From My Addreses code start  */}
      {/* <div className="w-full flex gap-2 items-center justify-between mt-6 ">
      <div className="flex items-center gap-8 w-full">
          {(userAddresses?.length !== 0 || userData?.defaultAddress) && (
            <button
              className="w-[50%] py-3 h-14    hover:bg-white hover:text-black  bg-primary text-white "
              onClick={() => {
                props.setUserAddress(userData?.defaultAddress)
                props.setIsNewAddress(false);
              }}
            >
              Select From My Addreses
            </button>
          )} */}
          {/* <button
            className="w-[50%] py-3 h-14 rounded-br-[10px]   hover:bg-white hover:text-black  bg-primary text-white "
            onClick={props.handleAddressSubmit}
          >
            Continue
          </button> */}
        {/* </div>
        </div> */}
{/* Select From My Addreses code end  */}

    </div>
  );
}
export default CheckoutNewAddress;
