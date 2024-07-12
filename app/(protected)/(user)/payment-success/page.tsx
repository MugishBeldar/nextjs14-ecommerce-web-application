'use client';

import React from "react";
import { useRouter ,useSearchParams } from 'next/navigation'
const PaymentSuccessPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const paymentIntent = params.get('payment_intent');
  const paymentIntentClientSecret = params.get('payment_intent_client_secret');
  const redirectStatus = params.get('redirect_status');
  
  const handleClick = async () => {
    console.log('PaymentSuccessPage ~ paymentIntent:', paymentIntent)
    console.log('PaymentSuccessPage ~ redirectStatus:', redirectStatus)
    console.log('PaymentSuccessPage ~ paymentIntentClientSecret:', paymentIntentClientSecret)
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center text-primary-txt m-6">
      <div className="border rounded-lg p-10 shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your payment. Your transaction was completed successfully.</p>
        <div className="flex justify-center items-center">
        <p className="text-blue-500 cursor-pointer  hover:border-b border-b-blue-500" onClick={handleClick}>Go back to home page</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
