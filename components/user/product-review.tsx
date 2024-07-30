/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewSchema } from "@/schemas";
import { FormError } from "./form/form-error";
import { FormSuccess } from "./form/form-success";
import { useAuthUser } from "@/hooks/useAuthUser";
import {
  createProductReview,
  getProductReview,
} from "@/actions/product-review";
import { capitalizeEachWord } from "@/lib/utils";

interface ProductReviewsProps {
  productId: string;
}

const ProductReview = ({ productId }: ProductReviewsProps) => {
  const [writeReview, setWriteReview] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
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

  useEffect(() => {
    setPage(1);
    setReviews([]);
    loadMoreReviews(1);
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
        const { error, success } = await createProductReview(
          data,
          user.user.id,
          productId
        );
        if (success) {
          setSuccess("Review submitted successfully!");
          loadMoreReviews(1); // Refresh reviews after submitting
        } else {
          setError("Failed to submit review. Please try again.");
        }
      }
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleClick = () => {
    setWriteReview((prev) => !prev);
  };

  return (
    <div className="px-6 lg:container lg:px-0 text-primary-txt">
      <p className="text-2xl md:text-4xl font-bold">Product Reviews</p>
      {reviews.length > 0 ? (
        <div className="rounded-md bg-secondary-dark py-1 my-3">
          {reviews.map((review, index) => (
            <div key={index} className="px-4 my-6">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={review.user?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xl font-medium">
                    {capitalizeEachWord(review.user.name)}
                  </p>
                  <p className="mt-2 font-light ">{review.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-custom-font text-center py-3">
            {hasMore ? (
              <p
                className="hover:underline cursor-pointer"
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                  loadMoreReviews(page + 1);
                }}
              >
                Load More...
              </p>
            ) : (
              <p>All Reviews Are Fetched!</p>
            )}
          </div>
        </div>
      ) : (
      <div className="rounded-md bg-secondary-dark py-4 my-3 text-custom-font text-center">
        <p>No reviews available for this product.</p>
      </div>
      )}
      <div
        className="cursor-pointer px-2 py-4 rounded-lg bg-primary-btn w-36 mb-4"
        onClick={handleClick}
      >
        <p className="text-primary-dark font-medium">Write a Review</p>
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
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-transparent outline-none border-gray-500"
                            placeholder="Write a review!"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-[30%] justify-between mx-2">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
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
                        <FormMessage />
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
              <FormError message={error} />
              <FormSuccess message={success} />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
