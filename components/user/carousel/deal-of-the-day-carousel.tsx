"use client";

import { useEffect, useState } from "react";
import MultipleProductCarousel from "./multiple-product-carousel";

import { dealOfTheDay } from "@/data/products";
import { getLastTopFiveProductsByCreatedAt } from "@/actions/product";
import { ProductTypes } from "@/types";

const DealOfTheDayCarousel = () => {
  const [dealOfthDay, setDealOfthDay] = useState<ProductTypes[] | []>([]);
  useEffect(()=>{
    (async function() {
      const response = await getLastTopFiveProductsByCreatedAt();
      if(response?.length) {
        setDealOfthDay(response);
      }
  })();
  },[])
  return (
    <div className="text-primary-txt">
      <div className="text-4xl font-medium my-8 px-6 lg:container lg:px-0">Deal of the Day</div>
      {dealOfTheDay && <MultipleProductCarousel products={dealOfthDay}  />}
    </div>
  );
};

export default DealOfTheDayCarousel;
