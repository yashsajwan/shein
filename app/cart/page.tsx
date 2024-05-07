import React from "react";
import CartComponent from "../../components/cart/CartComponent";
import { cookies } from "next/dist/client/components/headers";

const CartPage = async () => {
  const cookie = cookies().get("uid");
  return <CartComponent cookie={cookie} />;
};

export default CartPage;
