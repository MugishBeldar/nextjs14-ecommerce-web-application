"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {useEffect, useState} from "react";
import {getCategories} from "@/actions/category";
import {CategoryTypes} from "@/types";
import {useRouter} from "next/navigation";

const CategoryCarousel = () => {
    const [categories, setCategories] = useState<CategoryTypes[]>([]);

    const router = useRouter();
    useEffect(() => {
        (async function () {
            const response = await getCategories();
            if (response?.length) {
                setCategories(response);
            }
        })();
    }, [])

    const handleCategory = (categoryId: string) => {
        router.push(`/category/${encodeURIComponent(categoryId)}`);
    }

    return (
        categories && <div className="w-full px-6 lg:container lg:px-0 my-4 ">
          <Carousel
            className="w-full"
            opts={{
                slidesToScroll: "auto",
            }}
          >
            <CarouselContent className="w-full flex gap-4 ">
                {categories.map(({categoryName, id}) => (
                    <CarouselItem
                        onClick={() => handleCategory(id)}
                        key={id}
                        className="py-3 rounded-md bg-secondary-dark flex justify-center items-center basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 text-center"
                    >
                        <div className="text-primary-txt text-xl line-clamp-1">{categoryName}</div>
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
    );
};

export default CategoryCarousel;
