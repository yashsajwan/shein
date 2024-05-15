import React from "react";
import { Disclosure } from "@headlessui/react";
import FlatIcon from "../flatIcon/flatIcon";

const data = [
  {
    ques: `1 How do i use SSS Points ?`,
    ans: [
      `You can check how many SSS Points you have in your account once you login. Select My
    Account and click on ‘SSS Points’ from the list. You will be able to see Current Active
    Points, Total Purchases, Usage History and Expired Points.`,
      `To use SSS Points once you have added your products to cart and clicked on the cart icon
    to go to the checkout page, you will see your order details.`,
      `Below that will be an option to apply codes for discounts. Tick the 'Use SSS Points' box.
    Once you’re done, proceed to checkout, confirm your shipping address, and select the
    desired payment method to confirm your order by clicking ‘Place Order’.`,
      `A Maximum 20% of cart value can be paid using SSS Points`,
      `SSS Points cannot be clubbed with a discount code/offer.`,
      `Any SSS points used would not be reinstated in case you return a product/order.`,
      `SSS Points are not applicable on products on offer/sale.`,
      `SSS Points are subject to expiry. To check the expiry date, visit your account details. Once
    expired, the points will lapse automatically and cannot be credited back.`,
    ],
  },
  {
    ques: `2 What are the SSS Points ?`,
    ans: [
      `Loyalty Points is our membership program where you earn the points on each purchase on
    offline store and at the online website. The rate of earning these points is governed by our
    SHEINXY Girl Membership program policies. The value of 1 loyalty point is Rs 0.50`,
    ],
  },
  {
    ques: `3 What are the SSS Money ?`,
    ans: [
      `Credit points are your account wallet balance amount which is the actual amount of the
    product when returned and refund claimed in wallet or in case of cashbacks. The value of
    1 credit point is Rs. 1`,
    ],
  },
  {
    ques: `4 Do these points have an expiry?`,
    ans: [
      `While the credit points do not have any expiry, the loyalty points come with an expiry
    which you can check from the My account page by selecting ‘Loyalty Points’. In case your
    account is suspended or closed due to any reason, you’ll lose the credit and loyalty points
    attached to that account. Loyalty and credit points can not be transferred from one
    account to another.`,
    ],
  },
  {
    ques: `5 How can i use points or vouchers to make purchase?`,
    ans: [
      `While placing the order, on your checkout page you’ll find the option to “Apply coupons “.
    There you can select any given coupon. On the Payment page, you can select any of the
    given options from Credit Points, or Loyalty points. Loyalty and Credits are brand specific
    and are applicable to the same brand only.`,
    ],
  },
  {
    ques: `6 My voucher code is not working ? What should i do ?`,
    ans: [
      `While placing the order, on your checkout page you’ll find the option to “Apply coupons “.
    There you can select any given coupon. On the Payment page, you can select any of the
    given options from Credit Points, or Loyalty points. Loyalty and Credits are brand specific
    and are applicable to the same brand only.`,
    ],
  },
];

const Faq3 = () => {
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

export default Faq3;
