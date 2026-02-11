import { Hono } from "hono";
import {
  getAgents,
  getAgentCapabilities,
} from "../controllers/agent.controller.js";

const agentRoutes = new Hono();

// ✅ List all agents
agentRoutes.get("/", getAgents);

// ✅ Get agent capabilities
agentRoutes.get("/:type/capabilities", getAgentCapabilities);

export default agentRoutes;