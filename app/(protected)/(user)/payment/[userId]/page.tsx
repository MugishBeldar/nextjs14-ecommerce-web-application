'use client';
import { Payment } from "@/components/user";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { getCartFromCartId } from "@/actions/cart";
import { useSearchParams } from 'next/navigation';
import { CartTypes } from "@/types";
import axios from 'axios';
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
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = searchParams.get('cartId');
      if (cartId) {
        const response = await getCartFromCartId(cartId);
        if (response) {
          setCartProducts(response);
        }
      }
    };

    fetchCart();
  }, [searchParams]);

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
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Payment clientSecret={clientSecret} amount={getTotalPayableAmount({ products: cartProducts?.products || [] })} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
   // if (response.error) {
    //   setErrorMessage(submitError.message);
    //   setLoading(false);
    //   return;
    // }

    // flow 
    // here oreder created
    // orderid and secret goes to the child component there client secret added
    // default payment status pending
    // there also added payment status success or fail (on error);
