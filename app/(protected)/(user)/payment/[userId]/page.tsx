'use client';

import axios from 'axios';
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from 'next/navigation';
import { Elements } from "@stripe/react-stripe-js";

import { CartTypes } from "@/types";
import { Order } from "@prisma/client";
import { Payment } from "@/components/user";
import { createOrder } from "@/actions/order";
import { getCartFromCartId } from "@/actions/cart";
import { getTotalPayableAmount } from "@/lib/utils";

interface PaymentPageProps {
  params: {
    userId: string;
  };
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage = ({ params }: PaymentPageProps) => {
  const [cartProducts, setCartProducts] = useState<CartTypes | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [orderDetails, setOrderDetails] = useState<Order>()
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');

  useEffect(() => {
    const fetchCart = async () => {
      if (cartId) {
        const response = await getCartFromCartId(cartId);
        if (response) {
          const order = await createOrder({ cart: response, userId: params.userId });
          setOrderDetails(order)
          setCartProducts(response);
        }
      }
    };

    fetchCart();
  }, [cartId, params.userId]);

  useEffect(() => {
    if (cartProducts?.products) {
      const amount = getTotalPayableAmount({ products: cartProducts.products }).replace(/,/g, '');
      const getClientSecret = async () => {
        const response = await axios.post('/api/create-payment-intent',
          { amount },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        if (response.status === 200) {
          setClientSecret(response.data.clientSecret);
        }
      };
      getClientSecret();
    }
  }, [cartProducts]);

  return (
    <div className="m-6 flex justify-center items-center ">
      <div className="w-full md:w-[800px]">
        {clientSecret && orderDetails && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <Payment clientSecret={clientSecret} amount={getTotalPayableAmount({ products: cartProducts?.products || [] })} orderDetails={orderDetails} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;