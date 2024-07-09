"use client";
import { useEffect, useState } from "react";

import { useAppStore } from "@/store";
import { CompareModal } from "./modal";
import { ProductTypes } from "@/types";
import CompareDrawer from "./compare-drawer";
import FilterProducts from "./filter-products";
import { capitalizeEachWord } from "@/lib/utils";
import { getProductsFromTag } from "@/actions/product";
import ProductSpecification from "./product-specification";

interface SearchProductsProps {
  searchField: string;
}
const SearchProducts = ({ searchField }: SearchProductsProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [searchedProducts, setsearchedProducts] = useState<ProductTypes[] | []>([]);

  const { filterProduct  } = useAppStore();

  useEffect(() => {
    (async function(){
      const response = await getProductsFromTag({searchField});
      if(response?.length) {
        setsearchedProducts(response);
      }
    })();
  }, [searchField]);

  return (
    <div className="w-full px-6 lg:container lg:px-0 text-primary-white">
      {/* heading */}
      <div className="w-full h-16 flex items-center">
        <p className="text-2xl font-bold">
          Result for {`"${capitalizeEachWord(searchField)}"`}{" "}
          <span className="text-base text-slate-300 font-medium">{`(${searchedProducts.length})`}</span>
        </p>
      </div>
      {/* specification */}
      <div className="flex w-full justify-between">
        <div className="flex">
          <ProductSpecification
            category={true}
            searchedProducts={searchedProducts}
          />
          <ProductSpecification
            price={true}
            searchedProducts={searchedProducts}
          />
          <ProductSpecification
            brand={true}
            searchedProducts={searchedProducts}
          />
        </div>
        <div>
          <ProductSpecification
            sortBy={true}
            searchedProducts={searchedProducts}
          />
        </div>
      </div>
      {/* Filter products  */}
      <div>
        {filterProduct.length ? (
          <FilterProducts
            products={filterProduct}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        ) : (
          <FilterProducts
            products={searchedProducts}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        )}
      </div>
      {/* compare drawer */}
      <CompareDrawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
      <CompareModal />
    </div>
  );
};

export default SearchProducts;
