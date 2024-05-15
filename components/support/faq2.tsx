import React from "react";
import { Disclosure } from "@headlessui/react";
import FlatIcon from "../flatIcon/flatIcon";

const data = [
  {
    ques: `1 What is your Exchange policy?`,
    ans: [
      `You can apply for an exchange for your order within 7 days after an order has been
    delivered. We have a reverse pick up facility for most pin codes (chargeable )*`,
      `Exchanges can only be done for the same products in a different size. It cannot be
    exchanged for another design in the same product category or against any other product
    across our website/app.`,
      `If you wish to exchange products from a combo pack, the whole pack will have to be sent
    back to us. Partial returns aren’t accepted. If there is a manufacturing issue, or if you have
    any other query regarding this, you can contact us on the number (+91-7292020403) or
    email us on ordersupport@sheinindias.com.`,
      `Gift wrapping charges are non-refundable and we will not be able to gift wrap any
    exchanges requested.`,
      `To maintain strict hygiene standards of our products, we do not accept exchanges on

    several product categories, including but not limited to masks, boxers, shorts, sweat-
    activated t-shirts and socks. The Souled Store may, at its discretion and without prior
    
    notice, change the products or categories to which this policy would apply.`,
    ],
    text: [
      `Exchange is only allowed if there is a size issue. You can opt to take the next size you need .
    If the particular size is not available on the website, we will provide you with the gift
    voucher.`,
      `-If you have received any defective product, please inform it to us within 48 hours after the
    delivery. Once our quality team checks the same, we will send you the new product.`,
    ],
  },
  {
    ques: `2 In case I return the products, will the COD/Shipping/Gifting charges be credited
    back?`,
    ans: [
      `No. These are charges applicable each time an order is placed and are non-refundable.`,
    ],
  },
  {
    ques: `3 My product has been picked up but I have not got my refund yet.`,
    ans: [
      `If it has been 24-48 hours since the order has been picked by our courier partner and if the
    refund isn't reflecting as SSS money, please email us at Ordersupport@sheinindias.com
    and we will sort it out for you.`,
    ],
  },
  {
    ques: `4 How do I create a exchange request?`,
    ans: [
      `To initiate an exchange please go to My Account. Once your order is delivered you'll find a
    exchange button next to your order. Click the button and follow the steps to initiate a
    return.`,
      `Please note: - You can initiate your exchange request only 24 hours after your order is
    delivered.`,
    ],
  },
  {
    ques: `5 I have created a exchange request. When will the product be picked up?`,
    ans: [
      `Once we receive this request, someone from the courier partner's team will arrive at the
    address for a pickup within 3 business days. Please ensure the product(s) and the tags are
    intact on the product(s) for it to be accepted by the courier company.`,
    ],
  },
  {
    ques: `6 When will I get my exchanged product delivered?`,
    ans: [
      `Your exchange product will be shipped from our warehouse after the returned product
    has been picked from your end. Orders in India, once shipped, are typically delivered in 3-7
    business days in metros, and 10-15 business days for the rest of India. Delivery time may
    vary depending upon the shipping address and other factors (public holidays, extreme
    weather conditions, etc.).`,
    ],
  },
  {
    ques: `7 Where should I self-ship the returns?`,
    ans: [
      `In case your pincode is non-serviceable for a reverse pick up, you’ll have courier the
    product(s) to the following address: \n\n SHEIN STYLE STORE INC \n 19,Hauz Khas Village Near to Pink cafe Restaurant \nHauz Khas Village, New Delhi - 110016.`,
      `Please ensure the items are packed securely to prevent any loss or damage during transit.
    All items must be in unused condition with all original tags attached and packaging intact.
    Within 48 hours of receiving the product(s), the complete amount + 100 (in lieu of courier
    charges) will be refunded to your SHEIN STYLE STORE account as SSS Money.`,
    ],
    text: [
      `PLEASE NOTE: We request that you do not use The Professional Couriers for self return as
    they are not reliable and the package will not be accepted at the warehouse. Please make sure
    your courier costs do not exceed the amount stipulated above. We recommend using ‘Speed
    Post’ as your courier service. Speed Post is a Government of India owned entity and has the
    most widely distributed postal network in India.`,
    ],
  },
  {
    ques: `8 How do I track the status of my replacement order?`,
    ans: [
      `You can track your order once it has been dispatched from our warehouse. An email, SMS, and
    Whatsapp notification will be sent with a link. You can also track it from your account on the
    website by Selecting ‘Orders’ from the top right corner and then clicking on 'Track Order' for
    the respective Order ID.`,
    ],
  },
  {
    ques: `9 How and when would I get a refund for a exchanged order?`,
    ans: [
      `We do not have a money refund policy. We allow only size exchange for the products
    purchased. In case the next size you want is not in stock, we will provide you credit voucher
    worth the price of the product (excluding COD charge & GST)`,
    ],
  },
  {
    ques: `10 How do I raise a second exchange for my exchanged order?`,
    ans: [
      `We do not have a second exchange policy. However, if you still want to initiate the exchange,
    an amount of 250 INR will be charged for the second exchange.`,
    ],
  },
  {
    ques: `11 How to exchange combo items?`,
    ans: [
      `Important: If you have purchased a combo order from our website, please note that we do not
    offer exchanges for single products in the combo order. In order to process an exchange, both
    products in the combo order should be exchanged together. We ask that you carefully review
    the items within your combo order before finalizing your purchase.`,
    ],
  },
  {
    ques: `12 What do i do if i received damaged or defected product ?`,
    ans: [
      `If you received a damaged or defective item, you can initiate a return through "My Orders"
    section. Exchange will not be initiated for damaged item with 24 Hour of delivery.`,
    ],
  },
  {
    ques: `13 What is 7 days no question asked policy ?`,
    ans: [
      `We have a flexible 7 days no questions asked returns policy which is absolutely customer
    friendly. If you do not find the product(s) satisfying, you can return it as long as the following
    conditions are met:`,
      `Product is unused, unwashed and in original condition. You are welcome to try on a
    product but please take adequate measure to preserve its condition`,
      `The price tags, brand tags, shoe-box and all original packaging must be present`,
      `The product must be returned within 7 days`,
    ],
  },
];

const Faq2 = () => {
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
                    <ul className="list-disc ml-5 font-semibold mt-5">
                      {faq.text?.map((ele) => (
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

export default Faq2;
