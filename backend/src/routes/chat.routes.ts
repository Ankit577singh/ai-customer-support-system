import { Hono } from "hono";
import {
  sendMessage,
  getConversations,
  getConversationById,
  deleteConversation,
} from "../controllers/chat.controller.js";

const router = new Hono();

// ✅ Send message
router.post("/messages", sendMessage);

// ✅ Get all conversations
router.get("/conversations", getConversations);

// ✅ Get single conversation with history
router.get("/conversations/:id", getConversationById);

// ✅ Delete conversation
router.delete("/conversations/:id", deleteConversation);

export default router;