import React from "react";
import { Disclosure } from "@headlessui/react";
import FlatIcon from "../flatIcon/flatIcon";

const data = [
  {
    ques: "1 How do i know my orders is confirmed ?",
    ans: [
      `Once you successfully place your order, you will receive a confirmation email &
    SMS/WhatsApp with details of your order and your order ID.`,
      `You’ll receive another email & SMS/ WhatsApp once your order is shipped out. All you
    have to do then is, sit back, relax, and wait for your awesome product(s) to arrive!`,
    ],
  },
  {
    ques: "2 How i can check the status of my order?",
    ans: [
      `‘My Orders' page would provide you with complete information of your order
    including the order status, payment status and tracking details.`,
    ],
  },
  {
    ques: "3 Do you deliver in my location?",
    ans: [
      `‘The delivery in your pincode and estimate time of delivery can be checked on our order
      page by entering the pincode in ‘Check Delivery Details’ section. We are continually
      expanding our capabilities to deliver across all the pincodes in the country.`,
    ],
  },
  {
    ques: "4 Can i add item after placing the order ?",
    ans: [
      `Unfortunately, once the order is placed, you won’t be able to add more items to it. You can
      place a new order for the items you missed out on adding.`,
    ],
  },
  {
    ques: "5 How long will it take for my order to reach me?",
    ans: [
      `Orders in India, once shipped, are typically delivered in 2-3 business days in metros, and 7-
    10 business days for the rest of India. Delivery time may vary depending upon the
    shipping address and other factors (public holidays, extreme weather conditions, etc.).`,
    ],
  },
  {
    ques: "6 How do I cancel my order?",
    ans: [
      `Tap on “My Orders” section under the main menu of your App/Website and then select the
    order you want to cancel. The 'Cancel' option will only be available before your order is
    shipped. If you are facing an issue, please email us at ordersupport@sheinindias.com and
    we will sort it for you.`,
    ],
  },
  {
    ques: "7 Can i modify the address /Phone number for the delivery ?",
    ans: [
      `Sorry, that is not possible at the moment as the system would have already passed the
      mobile number and address to our warehouse to pack and ship your product. That said,
      we never say never! You can always cancel the order before it has been packed and can
      place a new order. Don't worry, there are no cancellation charges.`,
    ],
  },
  {
    ques: "8 Where can I view my past orders?",
    ans: [
      `You can view all your orders under MY ACCOUNT section of your SHEIN STYLE STORE
    account. Please note if you guest checkout while placing the order, login with the same
    phone number/email you used while placing the order.`,
    ],
  },
  {
    ques: "9 What is the cancellation policy at SHEIN STYLE STORE ?",
    ans: [
      `Please note you can only cancel your order till it hasn’t been dispatched by us. Refund for
    Debit card/Credit Card, UPI and Net banking orders will be processed within 7-15 banking
    days.`,
      `Refunds for orders paid through SHEIN STYLE STORE wallet will be refunded within 24-72
    Business hours of cancellation.`,
    ],
  },
  {
    ques: "10 How i can track my order?",
    ans: [
      `You can track your order once it has been dispatched from our warehouse. An email, SMS,
    and Whatsapp notification will be sent with a link. You can also track it from your account
    on the website by Selecting ‘Orders’ from the top right corner and then clicking on 'Track
    Order' for the respective Order ID.`,
    ],
  },
  {
    ques: "11 What is the estimated delivery time ?",
    ans: [
      `The delivery time varies from cities to cities. Typically it take 2 – 3 days for all metros &
    Tier 1 cities. Tier 2 & 3 cities may take 7 to 15 days. Some cities in north east India & J&K etc
    may take 15 to 20 days. You could enter your pin code at the product view page to know
    the exact estimate time of delivery.`,
    ],
  },

  {
    ques: "12 What are the shipping charges i have to pay ?",
    ans: [
      `We offer free shipping within India on all products purchased on its website for all prepaid
    orders - (You have to pay shipping charges Rs 99 only on COD orders )`,
    ],
  },
  {
    ques: "13 What are the shipping charges i have to pay ?",
    ans: [
      `We understand that you can’t wait at your delivery address all the time, and that is exactly
    why we will try to 3 attempt delivering your order . So, if you have missed the delivery
    please do not worry, we will try to make an attempt again. We’ll also drop you a call, in
    case you miss the delivery to understand your delivery requirements.`,
    ],
  },
  {
    ques: "14 Do you deliver internationally ?",
    ans: [
      `Yes, we do deliver internationally. We offer shipping to many countries around the world.
    Shipping rates and delivery times may vary depending on the destination. Please note that
    international orders may be subject to customs duties and taxes imposed by the
    recipient's country. If you have any specific questions about international shipping or
    need assistance with placing an international order, please feel free to contact our
    customer service team for further assistance.`,
    ],
  },

  {
    ques: `15 I got an email/ sms /what’s app saying product has been delivered ,but i
    haven’t received any delivery. What should i do ?`,
    ans: [
      `Sometimes, the delivery partner hands over the order to the neigh-bour or the entry
    security guard of your society in case you’re not available. Please check if the delivery is
    made to them. In case it is not, please drop us a mail and we’ll investigate the issue with
    our logistics partner.`,
    ],
  },

  {
    ques: `16 I want to place an order but I don’t want any price tag or invoice attached
    as it is a gift for someone. Is it possible?`,
    ans: [
      `We have to leave the tags intact in case the person you’re gifting faces any issues and
    would like to return the product. We will blacken the prices on the invoice. Please reach
    out to us as soon as your order is placed. If you want to add a note to the gift, please email
    the note to us at ordersupport@sheinindias.com and immediately call us on our number
    so that we can add it before the order is shipped. Please note that the character limit for
    the note is 250 characters.`,
    ],
  },

  {
    ques: "17 How can I get my order delivered faster?",
    ans: [
      `Sorry, currently we do not have any service available to expedite the order delivery. In
    future, if we start offering such a service and your area pincode is serviceable, you will
    receive a communication from our end.`,
    ],
  },

  {
    ques: "18 Why can’t I see the Cash On Delivery (COD) option?",
    ans: [
      `If the Cash On Delivery (COD) option is not showing, it’s because this facility is unavailable
    for your postal code. You can either pay by Debit Card, Credit Card, or Net Banking, or you
    can get the products delivered to an alternate address (where COD is available).`,
    ],
  },
  {
    ques: "19 Is there any additional charge for Cash On Delivery (COD) orders?",
    ans: [
      `Yes, we charge a flat fee of ₹99 for Cash On Delivery (COD) orders.`,
    ],
  },
  {
    ques: "20 Are there any additional shipping charges?",
    ans: [
      `SHEIN STYLE STORE provides FREE shipping for all orders above ₹2999 in India. A
    shipping charge of ₹99 is payable only on orders below ₹999. Minimum order value should
    be ₹299 (excluding GST).`,
    ],
  },
  {
    ques: `21 What if my order is undelivered?`,
    ans: [
      `For prepaid orders, if our courier partners are unable to deliver the product and they send
    it back to us, we will initiate a refund as SSS Money to your The SHEIN STYLE STORE which
    will reflect within 48-72 business hours of initiation.`,
    ],
  },
];

const Faq1 = () => {
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

export default Faq1;
