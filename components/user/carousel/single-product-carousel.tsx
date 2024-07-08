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
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[410px]">
        {images &&
          images.map((image, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
                <div className="relative w-40 h-40 p-1">
               <Image
                  onClick={() => {
                    handleClick(image);
                  }}
                  loader={imageLoader}
                  alt="sub-image"
                  src={image}
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious externalArrow={externalArrow} className="bg-transparent"/>
      <CarouselNext externalArrow={externalArrow} className="bg-transparent" />
    </Carousel>
  );
}

export default SingleProductCarousel;
