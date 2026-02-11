// prisma/seed.js

import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function main() {
  // Clear old data (safe for dev)
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  // Create dummy user
  const user = await prisma.user.create({
    data: {
      id: "user_1",
    },
  });

  // Create orders with payments
  await prisma.order.createMany({
    data: [
      {
        id: "order_101",
        userId: user.id,
        status: "SHIPPED",
      },
      {
        id: "order_102",
        userId: user.id,
        status: "DELIVERED",
      },
    ],
  });

  // Create payments
  await prisma.payment.createMany({
    data: [
      {
        id: "pay_101",
        orderId: "order_101",
        refundStatus: "NOT_REQUESTED",
      },
      {
        id: "pay_102",
        orderId: "order_102",
        refundStatus: "REFUND_COMPLETED",
      },
    ],
  });

  console.log("✅ Dummy data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
