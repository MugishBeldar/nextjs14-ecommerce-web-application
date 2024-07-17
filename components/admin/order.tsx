"use client";

import { useEffect, useState } from "react";

import OrdersTable from "./orders-table";

const Orders = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="text-primary-txt w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <div className="flex-1">Orders</div>
      </div>
      <div className="">
        <OrdersTable Orders={true} />
      </div>
    </div>
  );
};

export default Orders;
