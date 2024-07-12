'use client';

import React from 'react'
import { useRouter } from 'next/navigation'

import { updateOrderPaymentStatus } from '@/actions/order';

interface PaymentSuccessProps {
  orderId: string;
}

const PaymentSuccess = ({ orderId }: PaymentSuccessProps) => {
  const router = useRouter();

  const handleClick = async () => {
    await updateOrderPaymentStatus({ orderId });
    router.push('/');
  }

  return (
    <div className="border rounded-lg p-10 shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-6">Thank you for your payment. Your transaction was completed successfully.</p>
      <div className="flex justify-center items-center">
        <p className="text-secondary-txt cursor-pointer  hover:border-b border-b-secondary-txt" onClick={handleClick}>Go back to home page</p>
      </div>
    </div>
  )
}

export default PaymentSuccess;