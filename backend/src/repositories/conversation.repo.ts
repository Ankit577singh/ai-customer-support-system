import prisma from "../db.js";

export const ConversationRepo = {
  async ensure(conversationId: string, userId: string) {
    return prisma.conversation.upsert({
      where: { id: conversationId },
      update: {},
      create: {
        id: conversationId,
        userId,
      },
    });
  },

  async findById(conversationId: string) {
    return prisma.conversation.findUnique({
      where: { id: conversationId },
    });
  },

  async updateActiveOrderId(conversationId: string, orderId: string) {
    return prisma.conversation.update({
      where: { id: conversationId },
      data: { activeOrderId: orderId }
    });
  }
};