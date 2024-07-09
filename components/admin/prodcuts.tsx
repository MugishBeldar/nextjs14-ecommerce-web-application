"use client";
import { useEffect, useState } from "react";

import ProductsTable from "./products-table";
import { AddProductSideBar } from "./add-product-sidebar";

const Products = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);

  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="text-primary-txt w-full">
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
