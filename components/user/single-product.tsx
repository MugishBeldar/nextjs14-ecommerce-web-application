"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

import {useAppStore} from "@/store";
import {ProductTypes} from "@/types";
import {FaStar} from "react-icons/fa";
import {AddToCartModal} from "./modal";
import {addToCart} from "@/actions/cart";
import {useAuthUser} from "@/hooks/useAuthUser";
import {SingleProductCarousel} from "./carousel";
import {getProductFromProductId} from "@/actions/product";

import {Button} from "../ui/button";
import {makeSecureUrl} from "@/lib/utils";

interface SingleProductProps {
    productId: string;
}

const SingleProduct = ({productId}: SingleProductProps) => {
    // const [isMounted, setIsMounted] = useState<boolean>(false);
    const {productCarouselImage, setOpenModal} = useAppStore();
    const [product, setProduct] = useState<ProductTypes>();
    const user = useAuthUser();
    useEffect(() => {
        (async function () {
            const product = await getProductFromProductId(productId.split("%")[0]);
            if (product) {
                setProduct(product);
            }
        })()
    }, [productId]);

    const handleAddToCart = async (product: ProductTypes, productId: string) => {
        if (user && user.user.email && productId) {
            let quantity = 1;
            setOpenModal(true);
            const response = await addToCart(user.user.id, productId, quantity);
        } else {
            // router.push("/auth");
            // toast.error("Please sign in to proceed.");
        }
    };

    return (
        product && <div className="md:flex w-full px-6 lg:container lg:px-0 pt-8 text-primary-txt">
          <div className="relative w-full mt-5 md:w-1/2 md:mr-5">
            <div className="flex justify-around ">
              <div className="hidden  md:visible md:flex cursor-pointer ">
                <SingleProductCarousel
                  images={product.images}
                  externalArrow={true}
                />
              </div>
              <div className="relative w-[300px] h-[400px] flex justify-center items-center">
                <Image
                  src={productCarouselImage?.length ? makeSecureUrl(productCarouselImage) : makeSecureUrl(product.thumbnail)}
                  alt="singleproduct"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-sm sm:text-base md:text-xl">{product?.productName}</h1>
            <p className="flex w-10 justify-center items-center my-2 rounded-md bg-primary-btn font-bold ">
              <p className="text-sm sm:text-base md:text-base text-primary-dark font-medium mt-[2px] ml-1">
                  {/* {product?.rate} */}
                  {5}
              </p>
              <p className="text-primary-dark font-medium mx-1">
                <FaStar size={14}/>
              </p>
            </p>
            <div className="my-4">
              <div className="flex items-center">
                <div className=" flex item-center">
                  <div>
                    <p className="text-sm sm:text-base md:text-base">
                      ${Math.round(
                        product?.price -
                        (product?.price * product?.discount) / 100
                    ).toLocaleString("us")}
                    </p>
                    <p className="text-xs text-primary-gray">(inc. all Taxes)</p>
                  </div>
                </div>
                <div className="border-l border-primary-gray mx-4 h-12"></div>
                <div className="text-base sm:text-xl md:text-xl flex items-center text-primary-gray line-through">
                  <span>MRP. $</span>
                    {product?.price.toLocaleString("us")}
                </div>
              </div>
              <div className="flex justify-between items-center my-4">
                <Button
                  className=" text-primary-dark font-medium bg-primary-btn px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-btn">
                  Buy Now
                </Button>
                <Button
                  onClick={() => {
                      if (product) {
                          handleAddToCart(product, product.id);
                      }
                  }}
                  className=" border border-white px-4 py-2 rounded-lg cursor-pointer bg-transparent"
                >
                  Add to Cart
                </Button>
              </div>
              <AddToCartModal productId={product.id}/>
            </div>
            <div className="rounded-lg my-4 border border-primary-gray">
              <p className="text-xl font-bold ml-4 mt-2">Key Features</p>
                {product?.keyFeatures.map((feature, index) => (
                    <li className="p-2 mx-2 text-sm sm:text-base md:text-base" key={index}>
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </li>
                ))}
            </div>
          </div>
        </div>

    )
};

export default SingleProduct;
