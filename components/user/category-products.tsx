"use client";
import { useEffect, useState } from "react";

import { useAppStore } from "@/store";
import { CompareModal } from "./modal";
import { ProductTypes } from "@/types";
import CompareDrawer from "./compare-drawer";
import FilterProducts from "./filter-products";
import { capitalizeEachWord } from "@/lib/utils";
import { getCategoryById } from "@/actions/category";
import ProductSpecification from "./product-specification";
import { getProductsFromCategoryId } from "@/actions/product";

interface CategoryProductsProps {
  categoryId: string;
}
const CategoryProducts = ({ categoryId }: CategoryProductsProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [categoryProducts, setCategoryProducts] = useState<ProductTypes[] | []>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  const { filterProduct } = useAppStore();

  useEffect(() => {
    (async function () {
      setCategoryProducts([])
      const category = await getCategoryById(categoryId);
      if (category) {
        setCategoryName(category.categoryName);
      }
      const response = await getProductsFromCategoryId({ categoryId });
      if (response?.length) {
        setCategoryProducts(response);
      }
    })();
  }, [categoryId]);

  return (
    <div className="w-full px-6 lg:container lg:px-0 text-primary-white">
      {/* heading */}
      <div className="w-full h-16 flex items-center">
        <p className="text-2xl font-bold">
          Result for {`"${capitalizeEachWord(categoryName)}"`}{" "}
          <span className="text-base text-slate-300 font-medium">{`(${categoryProducts.length})`}</span>
        </p>
      </div>
      {/* specification */}
      {
        categoryProducts.length > 0 &&
        <div className="flex w-full justify-between">
          <div className="flex">
            <ProductSpecification
              price={true}
              searchedProducts={categoryProducts}
            />
            <ProductSpecification
              brand={true}
              searchedProducts={categoryProducts}
            />
          </div>
          <div>
            <ProductSpecification
              sortBy={true}
              searchedProducts={categoryProducts}
            />
          </div>
        </div>
      }
      {/* Filter products  */}
      <div>
        {categoryProducts.length > 0 ?
          filterProduct.length ? (
            <FilterProducts
              products={filterProduct}
              setIsOpenDrawer={setIsOpenDrawer}
            />
          ) : (
            <FilterProducts
              products={categoryProducts}
              setIsOpenDrawer={setIsOpenDrawer}
            />
          ) : ''
        }
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

export default CategoryProducts;
