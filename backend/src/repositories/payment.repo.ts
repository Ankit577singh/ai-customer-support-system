import prisma from "../db.js";

export const PaymentRepo = {
  getPaymentByOrderId: async (orderId: string) => {
    return prisma.payment.findUnique({
      where: { orderId }
    });
  }
};