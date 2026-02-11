import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import "dotenv/config";
import chatRoutes from "./routes/chat.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = new Hono();
const port = Number(process.env.PORT) || 3000;

// CORS
app.use(cors({
  origin: "*",
}));


//  Error handler
app.use("*", errorHandler);

// Health check
app.get("/", (c) => {
  return c.json({ status: "ok", message: "🚀 Server is running" });
});

app.get("/health", (c) => {
  return c.json({ status: "healthy", timestamp: new Date().toISOString() });
});

//  Routes
app.route("/api/chat", chatRoutes);
app.route("/api/agents", agentRoutes);

console.log(" Hono server initialized");

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Server running on http://localhost:${port}`);