import  prisma  from "../db.js";

export const MessageRepo = {
  create: (data: any) => prisma.message.create({ data }),
  findByConversation: (conversationId: string) =>
    prisma.message.findMany({ where: { conversationId } })
};
