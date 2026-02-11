import  prisma  from "../db.js";

export const UserRepo = {
  async ensure(userId: string) {
    return prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });
  },

  async findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },
};
