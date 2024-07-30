"use client";
import { useEffect, useState } from "react";

import { ProductTypes } from "@/types";
import { getProductFromProductId } from "@/actions/product";
import MultipleProductCarousel from "./multiple-product-carousel";
import { getTopFiveProductFromCategoryId } from "@/actions/category";

interface SimilarProductsProps {
  productId: string;
}

const SimilarProducts = ({ productId }: SimilarProductsProps) => {
  const [similarProducts, setSimilarProducts] = useState<ProductTypes[] | []>(
    []
  );
  useEffect(() => {
    (async function () {
      try {
        const product = await getProductFromProductId(productId.split("%")[0]);
        if (product?.category) {
          const similarProducts = await getTopFiveProductFromCategoryId(
            product.category.id
          );
          if (similarProducts?.length) setSimilarProducts(similarProducts);
        }
      } catch (error) {
        console.error("Error fetching product or similar products:", error);
      }
    })();
  }, [productId]);

  return (
    <div>
      {similarProducts.length && (
        <>
          <div className="text-2xl text-primary-txt md:text-4xl font-bold  my-8 px-6 lg:container lg:px-0">
            Similar Products
          </div>
          <MultipleProductCarousel products={similarProducts} />
        </>
      )}
    </div>
  );
};

export default SimilarProducts;
