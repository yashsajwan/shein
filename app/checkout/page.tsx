import React from "react";
import CheckoutPage from "../../components/checkout/CheckoutPage";
import { cookies } from "next/dist/client/components/headers";

const CartPage = async ({ searchParams }) => {
  const cookie = cookies().get("uid");
  return <CheckoutPage cookie={cookie} searchParams={searchParams} />;
};

export default CartPage;
