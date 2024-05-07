"use client"
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../config/firebase-config";
import Loader from "../loader/Loader";

const ContactUs = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  // on submit handler start 
  const onSubmitHandler = async () => {
    setIsLoading(true)
    console.log("hii");
    const info = {
      firstName: firstname.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNo: phone.trim(),
      message: message.trim()
    }
    // console.log(info,"info");

    await addDoc(collection(db, "contactUs"), info).then((result) => {
      // console.log("Document written with ID: ", result.id);
    })
    setFirstName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setMessage("")
    setIsLoading(false)
  }
  // on submit handler end

  return (
    <div className="px-body">
      <h1 className="text-secondary md:text-3xl text-xl font-bold text-center md:mt-7 mt-4 mb-4  ">
        CONTACT US
      </h1>
      <h4 className="text-primary text-center md:text-lg sm:text-base text-sm   md:mb-14 mb-5 ">
        Feel free to contact us for more information regarding any query.
      </h4>
      <div className="lg:w-[60%] w-[80%] mx-auto">
        <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
          <div className="md:w-[50%] w-full flex flex-col gap-3 ">
            <label className="text-[#555555] font-medium text-sm">
              First Name*
            </label>
            <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
              type="text"
              value={firstname} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="md:w-[50%] w-full flex flex-col gap-3 ">
            <label className="text-[#555555] font-medium text-sm">
              Last Name*
            </label>
            <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
              type="text"
              value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
          <div className="md:w-[50%] w-full flex flex-col gap-3 ">
            <label className="text-[#555555] font-medium text-sm">
              Email Address*
            </label>
            <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="md:w-[50%] w-full flex flex-col gap-3 ">
            <label className="text-[#555555] font-medium text-sm">
              Phone No.
            </label>
            <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
              type="text"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="w-full  flex flex-col gap-3 mb-10">
          <label htmlFor="" className="text-[#555555] font-medium text-sm">
            Message
          </label>
          <textarea
            name=""
            id=""
            className=" border-[1px] border-[#838383] w-full outline-0 px-3 py-2"
            rows={3}
            value={message} onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          onClick={() => onSubmitHandler()}
          className="bg-secondary text-white text-center md:mb-20 mb-10 py-3 rounded-md cursor-pointer">
          <button>{isLoading ? <Loader /> : "SUBMIT"}</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
