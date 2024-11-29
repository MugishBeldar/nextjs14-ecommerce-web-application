/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ReviewSchema} from "@/schemas";
import {FormError} from "./form/form-error";
import {FormSuccess} from "./form/form-success";
import {useAuthUser} from "@/hooks/useAuthUser";
import {
    createProductReview, getAvgRating,
    getProductReview,
} from "@/actions/product-review";
import {capitalizeEachWord, cn} from "@/lib/utils";
import StarRating from "@/components/user/rating-stars";
import {FaRegStar, FaStar} from "react-icons/fa";
import RatingStars from "@/components/user/rating-stars";

interface ProductReviewsProps {
    productId: string;
}

const ProductReview = ({productId}: ProductReviewsProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [writeReview, setWriteReview] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [reviews, setReviews] = useState<any[]>([]);
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [avgRating, setAvgRating] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const user = useAuthUser();
    const [page, setPage] = useState<number>(1);

    const loadMoreReviews = async (pageNumber: number) => {
        try {
            const take = 5;
            const skip = (pageNumber - 1) * take;
            const response = await getProductReview(productId, take, skip, pageNumber);
            const newReviews = response.reviews;
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setTotalReviews(response.totalReviews);
            setHasMore(response.totalReviews > reviews.length + newReviews.length);
        } catch (error) {
            console.error("Error loading reviews:", error);
            setHasMore(false);
        }
    };

    const findAverageRating = async () => {
        try {
            const avgRating = await getAvgRating(productId);
            setAvgRating(avgRating);
        } catch (e) {
            console.log('Error while fetching average rating', e);
        }
    }

    useEffect(() => {
        setPage(1);
        setReviews([]);
        (async function () {
            await loadMoreReviews(page);
            await findAverageRating();
        })();
    }, [productId]);

    const form = useForm({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            reviewDescription: "",
            rating: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (data: z.infer<typeof ReviewSchema>) => {
        try {
            if (user?.user) {
                const {error, success} = await createProductReview(
                    data,
                    user.user.id,
                    productId
                );

                if (success) {
                    setSuccess("Review submitted successfully!");
                    setTimeout(() => {
                        setSuccess(undefined);
                    }, 2000)
                    setReviews([success.data.review, ...reviews]);
                    form.reset();
                } else {
                    setError("Failed to submit review. Please try again.");
                }
            } else {
                setError('Please login to submit review.')
                form.reset();
            }
        } catch (err) {
            setError("Failed to submit review. Please try again.");
        }
    };

    const handleClick = () => {
        setWriteReview((prev) => !prev);
    };

    return (
        <>
            <div className=" px-6 lg:container lg:px-0 text-primary-txt">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                    <div className="text-2xl md:text-4xl font-bold">Product Reviews</div>
                    <div className="flex flex-col mt-2 md:flex-row items-center gap-2 md:gap-5">
                        <div className="flex items-center gap-1">Reviews: <div
                            className={'px-2 rounded bg-secondary-black text-secondary-txt'}>{totalReviews}</div></div>
                        <div className="flex items-center gap-1">
                            Average Rating: <span
                            className={'flex justify-center items-center gap-1 bg-secondary-black text-secondary-txt px-2 rounded'}><div>{(avgRating * 1.0).toFixed(1)}</div> <FaStar/></span>
                        </div>
                    </div>
                </div>

                {reviews.length > 0 ? (
                    <div className="rounded-md bg-secondary-dark py-1 my-3">
                        {reviews.map((review, index) => (
                            <div key={review.id} className={'flex flex-col gap-1'}>
                                <div className="px-4 mt-6">
                                    <div className="flex gap-3 items-center text-sm">
                                        <Avatar>
                                            {review.user?.image ? (
                                                <AvatarImage src={review.user.image}/>
                                            ) : (
                                                <AvatarFallback>
                                                    {review.user?.name
                                                        ? review.user.name
                                                            .split(' ')
                                                            .map((word: string) => word[0])
                                                            .join('')
                                                            .toUpperCase()
                                                        : 'NA'}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>

                                        <div className={'flex flex-col gap-1'}>
                                            <div className="ml-1">
                                                {capitalizeEachWord(review.user.name)}
                                            </div>
                                            <div className="flex justify-center items-center gap-1 text-xs">
                                                <div className={'text-secondary-txt flex justify-center items-center'}>
                                                    <RatingStars size={14} rating={review.rating}/>
                                                </div>
                                                {(review.rating * 1.0).toFixed(1)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-5 text-sm">
                                    <div
                                        className={cn(isExpanded ? 'break-words overflow-hidden text-ellipsis' : 'line-clamp-1')}
                                    >
                                        {review.description}
                                    </div>
                                    {review.description.length > 150 && (
                                        <span
                                            onClick={() => setIsExpanded(prevState => !prevState)}
                                            className="cursor-pointer mt-2 text-custom-font hover:underline text-xs"
                                        >
                                            {isExpanded ? 'Read Less' : 'Read More'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="text-custom-font text-center py-3">
                            {hasMore ? (
                                <div
                                    className="hover:underline cursor-pointer"
                                    onClick={async () => {
                                        setPage((prevPage) => prevPage + 1);
                                        await loadMoreReviews(page + 1);
                                    }}
                                >
                                    Load More
                                </div>
                            ) : (
                                <p>All Reviews Are Fetched!</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md py-4 my-3 text-custom-font text-center">
                        <p>No reviews available for this product.</p>
                    </div>
                )}
                <div
                    className="cursor-pointer px-2 py-4 rounded-lg bg-primary-btn w-36"
                    onClick={handleClick}
                >
                    <p className="text-primary-dark font-medium flex justify-center items-center">Write a Review</p>
                </div>
                {writeReview && (
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex w-full justify-between">
                                    <div className="w-[70%]">
                                        <FormField
                                            control={form.control}
                                            name="reviewDescription"
                                            render={({field}) => (
                                                <FormItem className="my-5">
                                                    <FormControl>
                                                        <Input
                                                            disabled={isLoading}
                                                            className="bg-transparent outline-none border-gray-500"
                                                            placeholder="Write a review!"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col w-[30%] justify-between mx-2">
                                        <FormField
                                            control={form.control}
                                            name="rating"
                                            render={({field}) => (
                                                <FormItem className="my-5">
                                                    <FormControl>
                                                        <Input
                                                            step="0.1"
                                                            min="1"
                                                            max="5"
                                                            disabled={isLoading}
                                                            className="bg-transparent outline-none border-gray-500"
                                                            placeholder="Rating (1-5)"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-primary-btn hover:bg-primary-btn text-black mt-5"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                <FormError message={error}/>
                                <FormSuccess message={success}/>
                            </form>
                        </Form>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductReview;
