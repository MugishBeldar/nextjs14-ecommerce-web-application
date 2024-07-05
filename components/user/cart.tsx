"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CartTypes } from "@/types";
import StarRating from "./rating-stars";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getCart, removeProductFromCart } from "@/actions/cart";

import { Button } from "../ui/button";

const Cart = () => {
  const [cart, setCart] = useState<CartTypes>();
  const user = useAuthUser();
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const isLargeScreen = screenWidth >= 768; 

  useEffect(() => {
    async function getUserCart() {
      if (user && user.user.id) {
        const response = await getCart(user.user.id);
        if (response) {
          setCart(response);
        }
      }
    }
    getUserCart();
  }, [user]);

  const handleRemove = async (productId: string) => {
    if (user && user.user.id) {
      const response = await removeProductFromCart(user.user.id, productId);
      const result = await getCart(user.user.id);
      if (result) {
        setCart(result);
      }
      // toast.success("Item removed from cart.");
    }
  };

  return (
    <div className="w-full lg:container px-6 lg:px-0">
      {cart?.products?.length !== 0 && (
        <div className="py-6 w-full">
          <p className="font-bold text-[20px]">YOUR CART</p>
        </div>
      )}

      {!cart?.products?.length ? (
        <div className="w-full h-[500px] flex flex-col items-center justify-center">
          <Image
            src="/cart_empty.png"
            alt="Cart Empty"
            width={400}
            height={400}
          />
          <p className="text-xl font-bold">Cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cart.products && cart.products.map((product, index) => (
              <div key={index} className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="w-[170px] h-[170px] md:col-span-1">
                    <Image
                      src={product.product.images[0]}
                      alt={product.product.productName}
                      width={300}
                      height={350}
                    />
                  </div>
                  <div className="md:col-span-4 md:pl-10">
                    <p className="font-medium text-base line-clamp-2 md:text-xl">
                      {product.product.productName}
                    </p>
                    <p className="text-primary-gray my-2">
                      <StarRating rating={3} />
                    </p>
                    <div className="block md:hidden">
                      <div className="flex flex-col md:items-end md:border-b border-black">
                        <p className="font-bold">
                          <span>$</span>
                          {Math.round(product.product.price - (product.product?.price * product.product?.discount) / 100).toLocaleString("us")}
                        </p>
                        <p className="text-sm mt-[-5px]">(Inc. all taxes)</p>
                      </div>
                      <div className="flex gap-1 my-2">
                        <p className="line-through text-sm">
                          <span>MRP $</span>
                          {product.product?.price.toLocaleString("us")}
                        </p>
                        <p className="text-13 text-primary-gray">{`(Save $${((product.product?.price * product.product?.discount) / 100).toLocaleString("us")})`}</p>
                      </div>
                    </div>
                    <Button className="bg-transparent hover:bg-transparent border border-black px-10 text-primary-dark font-bold" onClick={() => handleRemove(product.product.id)}>
                      Remove
                    </Button>
                  </div>
                  <div className="hidden md:block md:col-span-1 md:mx-2">
                    <div className="flex flex-col md:items-end">
                      <p className="md:text-2xl font-bold">
                        <span>$</span>
                        {Math.round(product.product.price - (product.product?.price * product.product?.discount) / 100).toLocaleString("us")}
                      </p>
                      <p className="md:text-sm mb-2">(Inc. all taxes)</p>
                    </div>
                    <div className="w-28 border-primary-dark ml-2 float-right border-b-[1px]"></div>
                    <div>
                      <p className="md:text-xl md:text-end mt-2 line-through">
                        <span>MRP $</span>
                        {product.product?.price.toLocaleString("us")}
                      </p>
                      <p className="md:text-end text-14 text-primary-gray">{`(Save $${((product.product?.price * product.product?.discount) / 100).toLocaleString("us")})`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={isLargeScreen ? "md:col-span-1" : "w-full col-span-2 p-2 bg-white"}>
            <div className="text-xl font-bold">
              <p>Order Summary ({cart.products && cart.products.length} items)</p>
            </div>
            <div className="grid grid-cols-2 w-full">
              <div>
                <p className="mt-4">Original Price</p>
                <p className="my-4">Saving</p>
                <p className="my-4">Total</p>
              </div>
              <div className="text-end">
                <p className="mt-4">
                  ${cart.products && cart.products.reduce((total, product) => total + product.product.price, 0).toLocaleString("us")}
                </p>
                <p className="my-4">
                  -${cart.products && cart.products.reduce((total, product) => total + ((product.product?.price * product.product?.discount) / 100), 0).toLocaleString("en-IN")}
                </p>
                <p className="my-3">
                  ${cart.products && cart.products.reduce((total, product) => total + Math.round(product.product.price - (product.product?.price * product.product?.discount) / 100), 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <Button className="w-full bg-primary-btn text-lg font-medium hover:bg-primary-btn text-primary-dark py-2">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
