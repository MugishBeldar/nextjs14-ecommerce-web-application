'use client';

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";

import { Button } from "../ui/button";
import { makeSecureUrl } from "@/lib/utils";

interface FilterProductsProps {
  products: ProductTypes[];
  setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const FilterProducts = ({ products, setIsOpenDrawer }: FilterProductsProps) => {
  const [selectedForCompare, setSelectedForCompare] = useState<ProductTypes[]>(
    []
  );
  const { compareProduct, setCompareProduct, compareLimitExceeded, setCompareLimitExceeded } = useAppStore();
  const router = useRouter();

  const handleCompareChange = (product: ProductTypes) => {
    setSelectedForCompare((prevSelected) => {
      // Check if the product is already selected
      const isProductSelected = prevSelected.includes(product);

      // If the product is already selected, remove it
      if (isProductSelected) {
        return prevSelected.filter((item) => item !== product);
      }

      // If the product is not selected and we haven't reached the limit, add the product
      if (prevSelected.length < 4) {
        return [...prevSelected, product];
      }

      // If we reach the limit, set compare limit exceeded flag
      if (prevSelected.length === 4) {
        setCompareLimitExceeded(true);
      }

      // Return previous selection if we reached the limit and can't add more products
      return prevSelected;
    });
  };

  useEffect(() => {
    setSelectedForCompare(compareProduct);
  }, [compareProduct]);

  useEffect(()=>{
    setCompareProduct([])
  },[setCompareProduct])

  const handleCompare = () => {
    setCompareProduct(selectedForCompare);
    setIsOpenDrawer((prev) => !prev);
  };

  return (
    <div className="w-full text-primary-white grid md:grid-cols-2 lg:grid-cols-3 gap-16 px-6 lg:px-0 lg:container mt-20">
      {products.length > 0 &&
        products.map((product, index) => (
          <div
            key={index}
            className="border-b-2 pb-3 border-primary-gray cursor-pointer w-full"
          >
            <div className="w-full md:block">
              <div className="relative md:w-full bg-gray-400/20 flex flex-col items-center rounded-xl">
                {/* Compare checkbox in the top-right corner */}
                <div className="absolute bottom-2 left-2 lg:hidden">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/20">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-txt border rounded-md"
                      onChange={() => handleCompareChange(product)}
                      checked={selectedForCompare.includes(product)}
                    />
                    <p onClick={() => handleCompareChange(product)}>Compare</p>
                  </div>
                </div>
                <div className="absolute hidden top-2 right-2 lg:block">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/20">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-txt border rounded-md accent-blue-500"
                      onChange={() => handleCompareChange(product)}
                      checked={selectedForCompare.includes(product)}
                    />
                    <p onClick={() => handleCompareChange(product)}>Compare</p>
                  </div>
                </div>

                <Image
                  src={makeSecureUrl(product.thumbnail)}
                  alt="Product Image"
                  width={270}
                  height={270}
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              </div>
              <div>
                <p className="mt-10 mb-5 font-bold text-lg  line-clamp-2">{product.productName}</p>
                <div className="flex items-center text-lg text-primary-btn ">
                  {/* <p className=" font-bold mr-1">{product.rate}</p> */}
                  <p className=" font-bold mr-1">{4.4}</p>
                  <div className="mr-3 ">
                    <FaStar />
                  </div>
                  {/* <p>{`(${product.totalRating})`}</p> */}
                  <p>{`(${10})`}</p>
                </div>
                <div className="flex items-center my-4">
                  <p className="text-2xl font-bold">
                    {" "}
                    <span className="text-2xl">$</span>
                    {/* {Number(product.discountedPrice).toLocaleString("us")} */}
                    {Math.round(
                    product?.price -
                    (product?.price * product?.discount) / 100
                  ).toLocaleString("us")}
                  </p>
                  <p className="line-through  text-primary-gray">
                    <p className="mx-3">
                      {/* <IndianRupee className="inline" size={17} /> */}
                      ${product?.price.toLocaleString("us")}
                    </p>
                  </p>
                  <p className="text-sm mr-3 text-primary-gray">{`(Save $${((product.price * product.discount) / 100).toLocaleString("us")})`}</p>
                  <p className="text-[12px] border px-1 rounded-md font-bold">
                    {(product.discount).toFixed(2)} %off
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Compare button at bottom-right */}
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={handleCompare}
          className="bg-black px-10 mb-4 py-2 rounded-2xl hover:bg-black border border-white font-bold "
          disabled={selectedForCompare.length < 2}
        >
          Compare ({selectedForCompare.length})
        </Button>
      </div>
    </div>
  );
};

export default FilterProducts;
