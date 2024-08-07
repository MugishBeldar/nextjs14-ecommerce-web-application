import { Suspense } from 'react'
import { Cart } from "@/components/user";

function CartFallback() {
  return <>Loading...</>
}

const CartPage = () => {
  return (
    <div className="  px-6 lg:container lg:px-0">
      <Suspense fallback={<CartFallback />}>
        <Cart />
      </Suspense>
    </div>
  );
};

export default CartPage;