'use server';
import { db } from "@/lib/db";

interface CreateProductReviewDBProps {
  userId: string;
  productId: string;
  reviewDescription: string;
  rating: string;
}

interface GetProductReviewDBProps {
  productId: string;
  take: number;
  skip: number;
  page: number;
}

export const createProductReviewDB = async ({ userId, productId, reviewDescription, rating }: CreateProductReviewDBProps) => {
  try {
    await db.productReviews.create({
      data: {
        description: reviewDescription,
        rating: Number(rating),
        userId,
        productId,
      },
    });
  } catch (error) {
    console.log('createProductReviewDB ~ error:', error);
    throw error;
  }
};

export const getProductReviewDB = async ({ productId, take, skip, page }: GetProductReviewDBProps) => {
  try {
    const reviews = await db.productReviews.findMany({
      skip,
      take,
      where: {
        productId: productId.split('%')[0],
      },
      include: {
        user:{
          select :{
            id: true,
            name: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const totalReviews = await db.productReviews.count({
      where: {
        productId: productId.split('%')[0],
      },
    })
    const totalPages = Math.floor(totalReviews/take);
    return {
      reviews,
      currentPage: reviews.length?page:0,
      totalPages,
      totalReviews,
    }
  } catch (error) {
    console.log('getProductReviewDB ~ error:', error)
    throw error
  }
}
