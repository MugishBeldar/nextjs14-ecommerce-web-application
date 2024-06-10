"use client";
import { useEffect } from "react";

import ProductsTable from "./products-table";
import { AddProductSideBar } from "./add-product-sidebar";

const Products = () => {

  useEffect(() => {
    async function fetchCategories() {
    }
    fetchCategories();
  }, []);

  return (
    <div className="text-primary-text w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <div className="flex-1">Products</div>
        <AddProductSideBar />
      </div>
      <div className="">
        <ProductsTable products={true} />
      </div>
    </div>
  );
};

export default Products;
