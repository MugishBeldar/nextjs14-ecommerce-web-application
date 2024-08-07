"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/store";
import { getProductFromProductId } from "@/actions/product";

import { ProductTypes } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogTitle} from "@radix-ui/react-dialog";
import {Dialog,DialogContent,DialogDescription,DialogHeader} from "@/components/ui/dialog";
import { makeSecureUrl } from "@/lib/utils";

interface AddToCartModalProps {
  productId: string;
}
const AddToCartModal = ({ productId }: AddToCartModalProps) => {
  const [cartSingleProduct, setCartSingleProduct] = useState<ProductTypes>();
  const { openModal, setOpenModal } = useAppStore();
  const router = useRouter();

  useEffect(()=>{
    (async function(){
      const response = await getProductFromProductId(productId);
      if(response) {
        setCartSingleProduct(response)
      }
    })()
  },[productId])

  const handleProceedToCart = () => {
    router.push("/cart");
  };
  return (
      cartSingleProduct && <div className="w-full">
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-primary-dark border-none lg:w-[100%]">
          <DialogHeader>
            <DialogTitle className="text-primary-txt text-2xl font-bold">
              1 Item added to the cart!
            </DialogTitle>
            <DialogDescription className="w-full">
              <div className="md:flex md:justify-center md:items-center my-4 pb-4 border-b">
                <div className="flex justify-center items-center">
                  <Image
                    src={makeSecureUrl(cartSingleProduct?.thumbnail)}
                    alt="singleproduct"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="text-primary-txt text-lg md:text-base mx-4  ">
                  {cartSingleProduct?.productName}
                </div>
                <div className="">
                  <p className="text-center md:flex md:item-center text-lg text-primary-txt font-bold">
                    ${Math.round(
                      cartSingleProduct?.price -
                      (cartSingleProduct?.price * cartSingleProduct?.discount) / 100
                    ).toLocaleString("us")}
                  </p>
                  <p className="text-center text-sm md:flex md:items-center text-primary-gray line-through mx-2">
                    <span className="text-xl">$</span>
                    {cartSingleProduct?.price.toLocaleString("us")}
                  </p>
                </div>
              </div>
            </DialogDescription>
            <Button
              className="bg-primary-btn hover:bg-primary-btn text-primary-dark"
              onClick={handleProceedToCart}
            >
              Proceeed To Cart
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    )
}

export default AddToCartModal;
