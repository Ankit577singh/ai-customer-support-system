import { routeMessage } from "../agents/router.agent.js";
import { orderAgent } from "../agents/order.agent.js";
import { billingAgent } from "../agents/billing.agent.js";
import { supportAgent } from "../agents/support.agent.js";

import { OrderRepo } from "../repositories/order.repo.js";
import { PaymentRepo } from "../repositories/payment.repo.js";
import { MessageRepo } from "../repositories/message.repo.js";
import { UserRepo } from "../repositories/user.repo.js";
import { ConversationRepo } from "../repositories/conversation.repo.js";

export async function handleChat(
  userId: string,
  conversationId: string,
  message: string
) {
  // ensure user exists
  await UserRepo.ensure(userId);

  // ensure conversation exists
  const conversation = await ConversationRepo.ensure(conversationId, userId);

  //  save user message
  await MessageRepo.create({
    conversationId,
    role: "user",
    content: message,
  });

  //  route to appropriate agent
  const intent = await routeMessage(message);

  let reply = "Sorry, I didn't understand.";

  //  ORDER AGENT
  if (intent.toLowerCase().includes("order")) {
    const orders = await OrderRepo.getUserOrders(userId);
    
    // Update activeOrderId to latest order
    if (orders.length > 0) {
      const latestOrder = orders[orders.length - 1];
      await ConversationRepo.updateActiveOrderId(conversationId, latestOrder.id);
    }
    
    reply = await orderAgent(message, orders);
  }

  // BILLING AGENT
  else if (intent.toLowerCase().includes("billing")) {
    // Get activeOrderId from conversation
    const conv = await ConversationRepo.findById(conversationId);
    if (conv?.activeOrderId) {
      const payment = await PaymentRepo.getPaymentByOrderId(conv.activeOrderId);
      reply = await billingAgent(message, payment);
    } else {
      reply = "Please check your order status first, then I can help with billing.";
    }
  }

  // SUPPORT AGENT
  else if (intent.toLowerCase().includes("support")) {
    reply = await supportAgent(message);
  }

  //  save agent reply
  await MessageRepo.create({
    conversationId,
    role: "agent",
    content: reply,
    agentType: intent,
  });

  return reply;
}