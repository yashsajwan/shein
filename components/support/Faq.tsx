"use client";
import React from "react";
import { useState } from "react";
import Faq1 from "./faq1";
import Faq2 from "./faq2";
import Faq3 from "./faq3";
import Faq4 from "./faq4";

const Faq = () => {
  const [tab, setTab] = useState("1");
  return (
    <div className="px-body lg:my-5">
      <div className="flex flex-col md:grid md:grid-cols-4">
        <div className="flex flex-col">
          <button
            onClick={() => setTab("1")}
            className={`${
              tab == "1" && "bg-[#eb4897]"
            } border-2 border-black p-3 my-3 rounded-xl`}
          >
            ORDER AND TRACKING
          </button>
          <button
            onClick={() => setTab("2")}
            className={`${
              tab == "2" && "bg-[#eb4897]"
            } border-2 border-black p-3 my-3 rounded-xl`}
          >
            EXCHANGE AND RETURN
          </button>
          <button
            onClick={() => setTab("3")}
            className={`${
              tab == "3" && "bg-[#eb4897]"
            } border-2 border-black p-3 my-3 rounded-xl`}
          >
            SSS POINTS AND VOUCHER
          </button>
          <button
            onClick={() => setTab("4")}
            className={`${
              tab == "4" && "bg-[#eb4897]"
            } border-2 border-black p-3 my-3 rounded-xl`}
          >
            PAYMENTS RELATED
          </button>
        </div>
        <div className=" md:grid md:col-span-3">
          {tab == "1" && (
            <>
              <Faq1 />
            </>
          )}
          {tab == "2" && (
            <>
              <Faq2 />
            </>
          )}
          {tab == "3" && (
            <>
              <Faq3 />
            </>
          )}
          {tab == "4" && (
            <>
              <Faq4 />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
