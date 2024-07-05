"use client";
import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { imageLoader } from "@/lib/image-loader";
import { useAppStore } from "@/store";

interface SingleProductCarouselProps {
  externalArrow: boolean;
  images: string[] | undefined;
}
export function SingleProductCarousel({
  images,
  externalArrow,
}: SingleProductCarouselProps) {
  const { setProductCarouselImage } = useAppStore();
  const handleClick = (image: string) => {
    setProductCarouselImage(image);
  };
  return (
    <Carousel
      opts={{
        align: "start",
        
      }}
      orientation="vertical"
      className="w-full max-w-xs h-[300px]"
    >
      <CarouselContent className="mt-1 ">
        {/* {Array.from({ length: 5 }).map((_, index) => ( */}
        {images &&
          images.map((image, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/3">
              {/* <div className="p-1">
              <span className="text-3xl font-semibold">{index + 1}</span>
            </div> */}
              <div className="relative w-20 h-20 p-1">
                <Image
                  onClick={() => {
                    handleClick(image);
                  }}
                  loader={imageLoader}
                  className="h-full w-full"
                  // height={10}
                  // width={10}
                  alt="sub-image"
                  src={image}
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious
        externalArrow={externalArrow}
        className="bg-transparent"
      />
      <CarouselNext externalArrow={externalArrow} className="bg-transparent" />
    </Carousel>
  );
}

export default SingleProductCarousel;