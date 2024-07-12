import { db } from "@/lib/db";

export const createOrderDB = async ({ userId, totalPrice, paymentStatus }: { userId: string, totalPrice: number, paymentStatus: string }) => {
  try {
    const order = await db.order.create({
      data: {
        userId,
        totalPrice,
        paymentStatus,
      },
    });
    return order;
  } catch (error) {
    console.log('Error creating order:--->', error);
  }
}

export const updateOrderPaymentStatusDB = async ({ id, paymentStatus }: { id: string, paymentStatus: string }) => {
  try {
    await db.order.update({
      where: { id },
      data: { paymentStatus },
    })
  } catch (error) {
    console.log('Error updating order status:--->', error);
  }
}

export const getOrderDetailsDB = async ({ orderId }: { orderId: string }) => { 
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
      },
    });
    return order;
  } catch (error) {
    console.log('Error getting order details:--->', error);
  }
}