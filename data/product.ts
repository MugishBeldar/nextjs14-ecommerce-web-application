"use server";

import { db } from "@/lib/db";

export const createProductDB = async ({
  productName,
  description,
  categoryId,
  price,
  tags,
  images,
  discount,
  quantity,
}: {
  productName: string;
  description: string;
  categoryId: string;
  price: number;
  tags: string[];
  images: string[];
  discount: number;
  quantity: number;
}) => {
  const data = await db.products.create({
    data: {
      productName,
      description,
      categoryId,
      price,
      tags,
      images,
      discount,
      quantity,
    },
  });
};



export const getProductDB = async () => {
  return await db.products.findMany({
    include: {
      category: true,
      carts: true,
      wishlist: true,
    },
  });
};


export const getProductFromIdDB = async (id: string) => {
  return await db.products.findFirst({
    where: {
      id,
    },
    include:{
      category: true,
      carts: true,
      wishlist: true,
    }
  });
};


export const updateProductDB = async (
  id: string,
  productName: string,
  categoryId: string,
  description: string,
  images: string[],
  tags: string[],
  price: number,
  discount: number,
  quantity: number
) => {
  await db.products.update({
    where: {
      id,
    },
    data: {
      productName,
      categoryId,
      description,
      tags,
      images,
      price,
      discount,
      quantity,
    },
  });
};


export const deleteProdcutDB = async (id: string) => {
  try {
    return await db.products.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};