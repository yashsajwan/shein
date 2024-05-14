import React from "react";
import Link from "next/link";
import Image from "next/image";

const DUMMY_DATA = [
  {
    title: "SHEIN STYLE STORE - Hauz Khas Village",
    address:
      "29,Hauz Khas Village, Opposite of The Record Room Bar, New Delhi - 110016",
    img: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
    tag: "New Delhi",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Banglore",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Mumbai",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Pune",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Guwahati",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Ahemdabad",
  },
  {
    title: "",
    address: "",
    img: "",
    tag: "Chandigarh",
  },
];

const StoreLocatorPage = async () => {
  return (
    <div className="px-body my-5">
      {DUMMY_DATA.map((card) => (
        <div className=" m-5 mb-10 ">
          <div>
            {card.img === "" ? (
              <>
                <div className="relative flex justify-center items-center font-bold text-3xl p-5 h-[20rem] rounded-xl border-[3px] border-black">
                  <div className="absolute left-0 bg-[#eb079d] text-white p-2 text-md md:text-xl font-normal">
                    {card.tag}
                  </div>
                  Coming Soon
                </div>
              </>
            ) : (
              <>
                <div className="relative flex justify-center items-center font-bold p-2 h-[20rem] rounded-xl border-[3px] border-black">
                  <div className="absolute left-0 bg-[#eb079d] text-white p-2 text-md md:text-xl font-normal">
                    {card.tag}
                  </div>
                  <Image
                    src={card.img}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
          <div className="text-md md:text-xl my-2 font-bold">
            {card.title == "" ? "" : card.title}
          </div>
          <div className="text-gray-400 my-2">{card.address}</div>
          <div className="my-3 rounded-xl text-center w-full border-[3px] border-black bg-[#eb079d] text-white text-xl p-3">
            <Link href={"/"}> Navigate</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreLocatorPage;
