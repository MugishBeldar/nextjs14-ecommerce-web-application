'use server';

import { createProductDB, deleteProdcutDB, getAllTagsDB, getProductDB, getProductFromIdDB, getProductFromTagDB, updateProductDB } from "@/data/product";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const createProduct = async (
  value: z.infer<typeof ProductSchema>,
  imagesUrl: string[],
  categoryId: string,
  tags: string[],
  keyFeatures: string[],
  productThumbnail: string,
) => {
  const validation = ProductSchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const { productName, price, discount, qty } =
    validation.data;
  const priceInNum = +price;
  const discountInNum = discount ? +discount : 0;
  const tagsInArr = tags;
  const qtyInNum = +qty;

  try {
    await createProductDB({
      productName,
      keyFeatures,
      categoryId,
      price: priceInNum,
      tags: tagsInArr,
      images: imagesUrl,
      discount: discountInNum,
      quantity: qtyInNum,
      thumbnail: productThumbnail,
    });

    return { success: "Product successfully created" };
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


export const getProducts = async () => {
  try {
    const products = await getProductDB();
    return products;
  } catch (error) {
    console.log("Error while getting product by limit", error);
  }
};


export const updateProduct = async (
  id: string,
  productName: string,
  categoryId: string,
  keyFeatures: string[],
  tag: string[] | [],
  price: number,
  images: string[],
  discount: number,
  quantity: number,
  productThumbnail:string
) => {
  try {
    const product = await getProductFromIdDB(id);
    const tagsInArr = tag;
    const priceInNum = +price;
    const discountInNum = discount ? +discount : 0;
    const qtyInNum = +quantity;
    if (!product) return { error: "product not found" };
    await updateProductDB(
      id,
      productName,
      categoryId,
      keyFeatures,
      images,
      tagsInArr,
      priceInNum,
      discountInNum,
      qtyInNum,
      productThumbnail
    );
    return { success: "Product successfully updated" };
  } catch (err: unknown) {
    return {
      error: "Failed to update product",
    };
  }
};



export const getProductFromProductId = async (id: string) => {
  try {
    const product = await getProductFromIdDB(id);
    return product;
  } catch (error) {
    console.log("Error while getting product", error);
  }
};


export const deleteProduct = async (id: string) => {
  try {
    const product = await getProductFromIdDB(id);
    if (!product) return { error: "product not found" };
    await deleteProdcutDB(id);
    return { success: "Product successfully deleted" };
  } catch (err: unknown) {
    return {
      error: "Failed to delete Product",
    };
  }
}


export const getAllTags = async () => {
  try {
    const tags = await getAllTagsDB();
    return tags;
  } catch (error) {
    console.log("Error while getting all tags", error);
  }
};

// const posts = await prisma.post.findMany({
//   where: {
//     tags: {
//       hasEvery: ['databases', 'typescript'],
//     },
//   },
// })

export const getProductsFromTag = async ({ searchField }: { searchField: string }) => {
  console.log('getProductsFromTag ~ searchField:', searchField);
  try {
    const products = await getProductFromTagDB({ searchField});
    console.log('products:---->', products);
    return products;
  } catch (error) {
    console.log("Error while getting products from tag", error)
  }
}