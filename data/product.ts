"use server";

import { db } from "@/lib/db";

export const createProductDB = async ({
  productName,
  keyFeatures,
  categoryId,
  price,
  tags,
  images,
  discount,
  quantity,
  thumbnail
}: {
  productName: string;
  keyFeatures: string[];
  categoryId: string;
  price: number;
  tags: string[];
  images: string[];
  discount: number;
  quantity: number;
  thumbnail:string;
}) => {
  const data = await db.products.create({
    data: {
      productName,
      keyFeatures,
      categoryId,
      price,
      tags,
      images,
      discount,
      quantity,
      thumbnail
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
    include: {
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
  keyFeatures: string[],
  images: string[],
  tags: string[],
  price: number,
  discount: number,
  quantity: number,
  productThumbnail: string,
) => {
  await db.products.update({
    where: {
      id,
    },
    data: {
      productName,
      categoryId,
      keyFeatures,
      tags,
      images,
      price,
      discount,
      quantity,
      thumbnail: productThumbnail
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


export async function getAllTagsDB() {
  const tags = await db.products.findMany({
    select: {
      tags: true,
    },
  });
  const uniqueTags = Array.from(
    new Set(tags.flatMap((product) => product.tags))
  );

  return uniqueTags;
}


export async function getProductFromTagDB({ searchField }: { searchField: string }) {
  try {
    const products = await db.products.findMany({
      where: {
        tags: {
          hasEvery: [searchField]
        }
      }
    })
    return products;
  } catch (error) {
    console.log('Error while getting product from tag:---->', error);
  }
}


export async function getProductsFromCategoryIdDB({categoryId}:{categoryId: string}) { 
  try {
    const products = await db.products.findMany({
      where: {
        categoryId
      }
    })
    return products;
  } catch (error) {
    console.log('Error while getting products from category:---->', error);
  }
}