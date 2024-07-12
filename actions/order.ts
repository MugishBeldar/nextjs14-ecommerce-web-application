'use server';

import { findCartByUserIdDB } from "@/data/cart";
import { deleteUserCartProductDB } from "@/data/cart-products";
import { createOrderDB, getOrderDetailsDB, updateOrderPaymentStatusDB } from "@/data/order";
import { createOrderProductDB } from "@/data/order-product";
import { getTotalPayableAmount } from "@/lib/utils";
import { CartTypes } from "@/types";

export const createOrder = async ({ cart, userId }: { cart: CartTypes, userId: string }) => {
  try {
    if (cart.products?.length) {
      const totalPrice = getTotalPayableAmount({ products: cart.products }).replace(/,/g, '')
      const order = await createOrderDB({
        userId,
        totalPrice: +totalPrice,
        paymentStatus: 'Pending'
      })
      if (order) {
        for (let product of cart.products) {
          await createOrderProductDB({
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity
          })
        }
      }
      return order;
    }
  } catch (err: unknown) {
    console.log('createOrder ~ err:', err)
  }
};


export const updateOrderPaymentStatus = async ({ orderId }: { orderId: string }) => {
  try {
    await updateOrderPaymentStatusDB({ id: orderId, paymentStatus: 'Success' });
    const order = await getOrderDetailsDB({ orderId });
    if (order) {
      const cart = await findCartByUserIdDB(order.userId);
      if (cart) await deleteUserCartProductDB({ cartId: cart?.id })
    }
  } catch (error) {
    console.log('Error updating order payment status:--->', error);
  }
}