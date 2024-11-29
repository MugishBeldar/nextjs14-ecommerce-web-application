"use client";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
// import { DealOfTheDayTypes } from "@/types";
// import { StarRating } from "../rating-stars";
import {useParams, useRouter} from "next/navigation";
import {useAppStore} from "@/store";
import {ProductTypes} from "@/types";
import StarRating from "../rating-stars";
import {imageLoader} from "@/lib/image-loader";
import {makeSecureUrl} from "@/lib/utils";
import {getAvgRating} from "@/actions/product-review";
import {useEffect, useState} from "react";

interface MultipleProductCarouselPropes {
    products?: ProductTypes[] | [];
}

const MultipleProductCarousel = ({
                                     products,
                                 }: MultipleProductCarouselPropes) => {
    const [avgRatings, setAvgRatings] = useState<Record<string, number>>({});

    const router = useRouter();

    const handleClick = (productId: string) => {
        router.push(`/product/${productId}}`);
    };

    useEffect(() => {
        (async function () {
            if (products && products.length > 0) {
                const ratings: Record<string, number> = {};
                for (const product of products) {
                    const rating = await getAvgRating(product.id);
                    ratings[product.id] = rating || 0;
                }
                setAvgRatings(ratings);
            }
        })()
    }, [products]);

    return (
        <div className="w-full py-4 px-6 lg:container lg:px-0">
            <div className="">
                <Carousel>
                    <CarouselContent className="ml-2">
                        {products &&
                            products.map((product: ProductTypes, index: any) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/4  mx-3 "
                                >
                                    <div
                                        className="relative flex flex-col px-4 py-5 sm:p-6 border rounded-lg cursor-pointer">
                                        <div className="w-full flex-1 text-primary-txt">
                                            <div
                                                className="relative h-[200px] inline-flex justify-center mt-10 rounded-lg w-full">
                                                <Image
                                                    onClick={() => handleClick(product.id)}
                                                    loader={imageLoader}
                                                    alt={product.productName}
                                                    src={makeSecureUrl(product.thumbnail)}
                                                    loading="lazy"
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                            <div className="w-full text-sm sm:text-base  lg:text-xl">
                                                <p className=" font-semibold truncate ">
                                                    {product.productName}
                                                </p>
                                                <div className="flex my-2">
                                                    <p className="flex item-center ">
                                                        $
                                                        {Math.round(
                                                            product.price -
                                                            (product?.price * product?.discount) / 100
                                                        ).toLocaleString("us")}
                                                    </p>
                                                    <p className="text-sm flex items-center text-primary-gray line-through mx-2">
                                                        ${product?.price.toLocaleString("us")}
                                                    </p>
                                                    <div className="flex-1">
                                                        <div className="flex justify-end items-center">
                                                            <p className="inline  text-[13px] font-bold text-emerald-500 px-2 ">{product?.discount}%
                                                                Off</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className={'text-secondary-txt'}>
                                                    <StarRating rating={avgRatings[product.id] || 0}/>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>

                    <CarouselPrevious
                        externalArrow={true}
                        className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:left-[-50px] lg:top-1/2 lg:-translate-y-1/2 "
                    />
                    <CarouselNext
                        externalArrow={true}
                        className="hidden lg:bg-transparent lg:border-none lg:pl-[7px] lg:block lg:absolute lg:right-[-50px] lg:top-1/2 lg:-translate-y-1/2  "
                    />
                </Carousel>
            </div>
        </div>
    );
};

export default MultipleProductCarousel;
