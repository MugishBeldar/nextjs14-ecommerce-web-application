
import React from "react";

import { PaymentSuccess } from "@/components/user";

interface PaymentSuccessPageProps {
  params: {
    orderId: string;
  };
}

const PaymentSuccessPage = ({ params }: PaymentSuccessPageProps) => {
  return (
    <div className="flex items-center justify-center text-primary-txt m-6">
      <PaymentSuccess orderId={params.orderId}/>
    </div>
  );
};

export default PaymentSuccessPage;
