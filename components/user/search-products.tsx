"use client";
import { useEffect, useState } from "react";
// import { dealOfTheDay } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";
import { getProductsFromTag } from "@/actions/product";
import ProductSpecification from "./product-specification";
import FilterProducts from "./filter-products";
import CompareDrawer from "./compare-drawer";
import { CompareModal } from "./modal";
// import { ProductSpecification } from "../product-specification";
// import FilterProducts from "../filter-products/filter-products";
// import { CompareDrawer } from "../compare-drawer";
// import CompareModal from "../compare-drawer/compare-product-modal";
// import { usePathname } from "next/navigation";
interface SearchProductsProps {
  searchField: string;
}
const SearchProducts = ({ searchField }: SearchProductsProps) => {
  console.log('SearchProducts ~ searchField:', searchField);
  const [searchedProducts, setsearchedProducts] = useState<ProductTypes[] | []>([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  // const pathname = usePathname()
  // const { searchTerm, filterProduct } = useAppStore();
  const { filterProduct  } = useAppStore();

  useEffect(() => {
    // const items = dealOfTheDay.filter((item: ProductTypes) => {
    //   return item.title
    //     .split(" ")
    //     .join("")
    //     .toLowerCase()
    //     .trim()
    //     .includes(searchField.toLowerCase().trim());
    // });
    // if (items.length) setsearchedProducts(items);
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
          Result for {`"${searchField}"`}{" "}
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
