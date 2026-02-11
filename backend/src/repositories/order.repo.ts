import prisma from "../db.js";

export const OrderRepo = {
  // Get all orders for a user (sorted by creation - latest last)
  getUserOrders: async (userId: string) => {
    return prisma.order.findMany({
      where: { userId },
      include: { payment: true },
      orderBy: { id: 'asc' } // order_101 first, order_102 second
    });
  },

  // Get latest order
  getLatestByUser: async (userId: string) => {
    return prisma.order.findFirst({
      where: { userId },
      include: { payment: true },
      orderBy: { id: 'desc' }
    });
  }
};