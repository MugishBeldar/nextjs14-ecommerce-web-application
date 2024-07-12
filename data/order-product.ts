import { db } from "@/lib/db";

export const createOrderProductDB = async ({ orderId, productId, quantity }: { orderId: string, productId: string, quantity: number }) => {
  try {
    const orderProduct = await db.orderProduct.create({
      data: {
        orderId,
        productId,
        quantity
      }
    })
    return orderProduct;
  } catch (error) {
    console.log('Error creating order product:--->', error)
  }
}