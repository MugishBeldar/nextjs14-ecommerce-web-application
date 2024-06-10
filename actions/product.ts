'use server';

import { createProductDB, deleteProdcutDB, getProductDB, getProductFromIdDB, updateProductDB } from "@/data/product";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const createProduct = async (
  value: z.infer<typeof ProductSchema>,
  imagesUrl: string[],
  categoryId: string,
  tags: string[]
) => {
  const validation = ProductSchema.safeParse(value);

  if (!validation.success) {
    return { error: "Invalid Fields!" };
  }
  const { productName, description, price, discount, qty } =
    validation.data;
  const priceInNum = +price;
  const discountInNum = discount ? +discount : 0;
  const tagsInArr = tags;
  const qtyInNum = +qty;

  try {
    await createProductDB({
      productName,
      description,
      categoryId,
      price: priceInNum,
      tags: tagsInArr,
      images: imagesUrl,
      discount: discountInNum,
      quantity: qtyInNum,
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
  description: string,
  tag: string[] | [],
  price: number,
  images:string[],
  discount: number,
  quantity: number
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
      description,
      images,
      tagsInArr,
      priceInNum,
      discountInNum,
      qtyInNum
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


export const deleteProduct = async (id:string) => {
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