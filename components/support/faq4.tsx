import React from "react";
import { Disclosure } from "@headlessui/react";
import FlatIcon from "../flatIcon/flatIcon";

const data = [
  {
    ques: "1 What all payments methods accepted ?",
    ans: [
      `The payment options we support are:`,
      `Credit Card`,
      `Debit Card`,
      `Net Banking`,
      `Paytm Wallet`,
      `UPI`,
      `Google Pay`,
      `Credit points/Bonus Points`,
      `We process all online payments through Paytm which provides secure, encrypted connections for all credit card, debit card and Net Banking transactions.`,
    ],
  },
  {
    ques: "2 What should I do if my payment fails?",
    ans: [
      `In case there is a failure in payment, please retry and keep the following things in mind`,
      `Please confirm if the information you’ve provided is correct i.e. account details, billing address, and password (for Net Banking); and that your internet connection wasn’t disrupted during the process.`,
      `If your account has been debited even after a payment failure, it is normally rolled back to your bank account within 10 business days. For any further clarification, you can email us at ordersupport@sheinindias.com.
    `,
    ],
  },
  {
    ques: "3 My account has been debited but order not confirmed ? What should i do ?",
    ans: [
      `We ensure that an Order ID is confirmed only once our bank receives the payment from your bank. Sometimes, due to unforeseen reasons, the amount might be debited from your side but wouldn't have been received by us yet. Please wait for 24 hours to check if the order has been confirmed or if the amount is credited back to you. If neither happens, please drop us a mail and we’ll help you further.`,
    ],
  },
];

const Faq4 = () => {
  return (
    <div className="ml-3">
      {data.map((faq) => (
        <>
          <div className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex border-b border-[#CCCCCC] py-4 items-center sm:text-base font-semibold text-xs justify-between w-full mx-3 ${
                      open ? "font-semibold" : ""
                    } `}
                  >
                    <span>{faq.ques}</span>
                    <FlatIcon icon={"flaticon-plus text-[#999999] text-xs"} />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" mt-3 pt-0 pb-2 text-base text-gray-500 w-full mx-3">
                    <ul className="list-disc ml-5">
                      {faq.ans.map((ele) => (
                        <li>{ele}</li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </>
      ))}
    </div>
  );
};

export default Faq4;
