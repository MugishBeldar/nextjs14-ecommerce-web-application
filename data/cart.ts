"use server";

import { db } from "@/lib/db";

export const findCartByUserIdDB = async (userId: string) => {
  try {
    const result = await db.cart.findUnique({
      where: {
        userId,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error while getting cart", error);
    throw error;
  }
};

export const createCartDB = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const result = await db.cart.create({
      data: {
        user: {
          connect: { id: userId },
        },
        products: {
          create: {
            product: {
              connect: { id: productId },
            },
            quantity,
          },
        },
      },
    });
    return;
  } catch (error) {
    console.log("Error while creating cart", error);
    throw error;
  }
};

export const findCartByCartIdDB = async({cartId}:{cartId:string}) => {
  try { 
    const cart = await db.cart.findUnique({
      where:{
        id: cartId
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })
    return cart;
  } catch (error) {
    console.log('Error while getting cart', error);
  }
}