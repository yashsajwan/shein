import React from "react";
import Image from "next/image";
import banner from "../../images/points.png";

const BonusPoints = async () => {
  return (
    <>
      <Image src={banner} alt="" className="w-full h-auto object-cover" />
      <div className="bg-[#fea4f9] text-[#eb079d]">
        <div className="mx-body bg-white rounded-2xl py-5 px-10">
          <p className="p-2">
            <strong className=" text-3xl" >1.What's the points?</strong>
          </p>
          <p className="p-2">
            Points are a kind of virtual currency on the SHEIN STYLE STORE
            website/app. You can choose to use and deduct part of the payment
            amount when placing an order.
          </p>
          <p className="p-2">
            <strong className="  text-3xl">2.How to use the points?</strong>
          </p>
          <p className="p-2">
            <p className="p-2">1.Every 100 points = 50 INR</p>
            <p className="p-2">
              2.You can use the points to deduct up to 20% of the total amount
              of products when you place your order (only the total price of
              products is supported, excluding shipping, insurance).
            </p>
            <p className="p-2">
              3. Points are valid from 7 days to 3 months, if your points
              expired before being used, they will be deleted from your account.
            </p>
          </p>
          <p className="p-2">
            <strong className="  text-3xl">How to earn the points ?</strong>
          </p>
          <p className="p-2">
            <p className="p-2">
              <strong className=" text-xl">Register with SHEIN STYLE STORE</strong>
            </p>
            <p className="p-2">New User complete the registration will receive 100 points.</p>
          </p>

          <p className="p-2">
            <p className="p-2">
              <strong className=" text-xl">Verify your email</strong>
            </p>
            <p className="p-2">
              You may verify your email on your profile page to receive 100
              points.
            </p>
          </p>

          <p className="p-2">
            <p className="p-2">
              <strong className=" text-xl">Buy and earn</strong>
            </p>
            <p className="p-2">You’ll earn 1 point for every Rs. spent on your purchase.</p>
            <p className="p-2">
              1.Points will be credited to your account once you confirm
              delivery of your order.
            </p>
            <p className="p-2">2.Log into your SHEIN STYLE STORE account</p>
            <p className="p-2">3.Click on "My Orders"</p>
            <p className="p-2">
              4.Select orders you have received and click on "Confirm order "
            </p>
          </p>

          <p className="p-2">
            <strong className=" text-xl">
              Follow us on social media (Instagram , Facebook , YouTube ,
              Snapchat , Printrest)
            </strong>
          </p>
          <p className="p-2">
            You may follow us on Social media you will receive the 1000 points
          </p>

          <p className="p-2">
            <strong className=" text-xl">Refer a Friend</strong>
          </p>
          <p className="p-2">
            1. If customers want to earn mentioned Points Reward, the referred
            person must be a new customer.
          </p>
          <p className="p-2">
            2. Complete registration on https://www.sheinindias.com by referral
            link ,referring customers will earn 500 points, and your friend will
            get 500 points.
          </p>
          <p className="p-2">
            3. Complete registration in APP with the referral invitation code,
            referring customers will earn 500 points, and your friend will get
            1000 points.
          </p>
          <p className="p-2">
            <strong className=" text-xl">About returning SHEINXY GIRL points</strong>
          </p>
          <p className="p-2">
            1. If an unpaid order is cancelled, the points applied to the
            original order will be immediately returned to your points account.
          </p>
          <p className="p-2">
            2. If you request a return/a full refund for a product, the points
            for returned item will reverted to your account along with your
            refund. If it's a partial return, points will be returned based on a
            percentage of the product's price.
          </p>
          <p className="p-2">
            3. The validity period of the points is calculated from the date
            when the points are first obtained, and will not be re-timed due to
            the points being returned.
          </p>
        </div>
      </div>
    </>
  );
};

export default BonusPoints;
