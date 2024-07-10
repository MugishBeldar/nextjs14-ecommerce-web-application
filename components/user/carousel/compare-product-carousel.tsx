"use client";
import { useAppStore } from "@/store";
// import { MultipleProductCarousel } from ".";
import Image from "next/image";
import { X } from "lucide-react";
import { ProductTypes } from "@/types";
import StarRating from "../rating-stars";
import { useRouter } from "next/navigation";

const CompareProductCarousel = () => {
  const router = useRouter();
  const { compareProduct, setCompareProduct } = useAppStore();
  const handleRemove = (product: ProductTypes) => {
    const newProduct = compareProduct.filter((p) => p.id !== product.id);
    setCompareProduct(newProduct);
  };
  return (
    <div className="px-6 text-primary-white lg:container lg:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3 mt-8">
      {compareProduct &&
        compareProduct.map((product, index) => {
          return (
            <div key={index}>
              <div className="bg-black/25 rounded-xl">
                <div className="pb-1">
                  <div className="flex justify-end mt-4 mr-4">
                    <X onClick={() => handleRemove(product)} size={30} />
                  </div>
                  <div className="flex justify-center items-center cursor-pointer" onClick={() => router.push(`/product/${product.id}}`)}>
                    <Image
                      src={product.thumbnail}
                      alt="singleproduct"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="mx-4 my-8 cursor-pointer" onClick={() => router.push(`/product/${product.id}}`)}>
                    <p className="text-xl font-medium  line-clamp-3">
                      {product.productName}
                    </p>
                    <div className="flex items-center">
                      <p className="text-xl font-medium my-4">
                        ${Math.round(
                          product?.price -
                          (product?.price * product?.discount) / 100
                        ).toLocaleString("us")}
                      </p>
                      <p className="text-sm font-medium my-4 line-through text-primary-gray">
                        ${Number(product.price).toLocaleString("us")}
                      </p>
                      <p className="mx-4">
                        {(product.discount).toFixed(2)} %off
                      </p>
                    </div>
                    <p className="text-primary-gray">
                      <StarRating rating={4} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-l border-primary-txt p-4">
                <p className="text-xl font-bold my-2">Key Features</p>
                <div className="ml-4">
                  <ul className="list-disc">
                    {product?.keyFeatures?.map((feat, index) => (
                      <li className="pb-2" key={index} >{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CompareProductCarousel;
