'use server';

import { z } from "zod";

import { ReviewSchema } from "@/schemas";
import { createProductReviewDB, getProductReviewDB } from "@/data/product-review";

export const createProductReview = async (value: z.infer<typeof ReviewSchema>, userId: string, productId: string,) => {
  const validation = ReviewSchema.safeParse(value);
  if (!validation.success) return { error: "Invalid Fields!" };
  const { reviewDescription, rating } = validation.data;
  try {
    await createProductReviewDB({ userId, productId: productId.split('%')[0], reviewDescription, rating });
    return { success: "Product review successfully added" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        error: "Failed to verify user.",
      };
    }
  }
};

export const getProductReview = async (productId:string, take:number, skip:number, page:number) => {
  const productReviews = await getProductReviewDB({productId, take, skip, page});
  return productReviews
}