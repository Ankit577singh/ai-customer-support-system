import { Context } from "hono";
import { handleChat } from "../services/chat.service.js";
import prisma from "../db.js";

//  Send message (existing)
export async function sendMessage(c: Context) {
  const { userId, conversationId, message } = await c.req.json();
  const reply = await handleChat(userId, conversationId, message);
  return c.json({ reply });
}

// Get all conversations for a user
export async function getConversations(c: Context) {
  const userId = c.req.query("userId") || "user_1";
  
  const conversations = await prisma.conversation.findMany({
    where: { userId },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1, // Last message only
      },
    },
    orderBy: { id: "desc" },
  });

  return c.json({ conversations });
}

// Get single conversation with full history
export async function getConversationById(c: Context) {
  const conversationId = c.req.param("id");

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!conversation) {
    return c.json({ error: "Conversation not found" }, 404);
  }

  return c.json({ conversation });
}

// Delete conversation
export async function deleteConversation(c: Context) {
  const conversationId = c.req.param("id");

  // Delete messages first (cascade)
  await prisma.message.deleteMany({
    where: { conversationId },
  });

  // Delete conversation
  await prisma.conversation.delete({
    where: { id: conversationId },
  });

  return c.json({ message: "Conversation deleted successfully" });
}