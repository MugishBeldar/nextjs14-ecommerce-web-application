'use server';

import { createCartDB, findCartByCartIdDB, findCartByUserIdDB  } from "@/data/cart";
import { createProdcutCartDB, findProductInCartDB, updateProductCartDB } from "@/data/cart-products";
import { db } from "@/lib/db";

export async function addToCart(id: string, productId: string, quantity: number) {
  try {
    if (id) {
      const existingCart = await findCartByUserIdDB(id);
      if (!existingCart) {
        await createCartDB(id, productId, quantity);
      } else {
        const existingProductInCart = await findProductInCartDB(existingCart.id, productId)
        if (existingProductInCart) {
          await updateProductCartDB(existingProductInCart.id, quantity)
        } else {
          await createProdcutCartDB(existingCart.id, productId, quantity);
        }
      }
    }
    return { success: "Product added successfully" }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return { error: 'Something went wrong' }
  }
}

export const getCart = async (userId: string) => {
  try {
    if (userId) {
      const existingCart = await findCartByUserIdDB(userId);
      if (existingCart) {
        return existingCart;
      }
    }
    return null;
  } catch (error) {
    console.log("Error while getting cart", error);
  }
};

export async function removeProductFromCart(userId: string, productId: string) {
  try {
    const userCart = await db.cart.findUnique({
      where: {
        userId
      },
      include: {
        products: true,
      },
    });
    if (userId) {
      if (!userCart) {
        throw new Error("User cart not found");
      }
      const cartProductToDelete = userCart.products.find(
        (product) => product.productId === productId
      );
      if (!cartProductToDelete) {
        throw new Error("Product not found in cart");
      }
      await db.cartProduct.delete({
        where: {
          id: cartProductToDelete.id,
        },
      });
    }
    return {success: 'Product successfully removed'}
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
}

export const getCartFromCartId = async (cartId: string) => {
  try {
    if (cartId) {
      const cart = await findCartByCartIdDB({cartId});
      if (cart) {
        return cart;
      }
    }
    return null;
  } catch (error) {
    console.log("Error while getting cart", error);
  }
};