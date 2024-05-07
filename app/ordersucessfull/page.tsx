import React from 'react'
import Link from 'next/link'
const OrdersPage = async() => {
  return (
    <div className="flex flex-col px-body justify-center items-center gap-6 h-[70vh]">
    <h2 className="text-xl font-semibold">Your order has been placed.</h2>
    <Link href={"/"} className="bg-primary text-white px-3 py-2">
     Continue Shopping
    </Link>
  </div>
  )
}

export default OrdersPage