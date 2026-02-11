import { Context } from "hono";

// ✅ List all available agents
export async function getAgents(c: Context) {
  const agents = [
    {
      type: "support",
      name: "Support Agent",
      description: "Handles general support inquiries, FAQs, troubleshooting",
      status: "active",
    },
    {
      type: "order",
      name: "Order Agent",
      description: "Handles order status, tracking, modifications, cancellations",
      status: "active",
    },
    {
      type: "billing",
      name: "Billing Agent",
      description: "Handles payment issues, refunds, invoices, subscription queries",
      status: "active",
    },
  ];

  return c.json({ agents });
}

// ✅ Get specific agent capabilities
export async function getAgentCapabilities(c: Context) {
  const agentType = c.req.param("type");

  const capabilities: Record<string, any> = {
    support: {
      type: "support",
      name: "Support Agent",
      tools: ["query_conversation_history", "search_faq"],
      capabilities: [
        "Answer general questions",
        "Provide troubleshooting steps",
        "Search knowledge base",
        "Escalate complex issues",
      ],
    },
    order: {
      type: "order",
      name: "Order Agent",
      tools: ["fetch_order_details", "check_delivery_status"],
      capabilities: [
        "Check order status",
        "Track delivery",
        "Modify orders",
        "Cancel orders",
        "Provide shipping estimates",
      ],
    },
    billing: {
      type: "billing",
      name: "Billing Agent",
      tools: ["get_invoice_details", "check_refund_status"],
      capabilities: [
        "Process refund requests",
        "Check payment status",
        "Provide invoice details",
        "Handle subscription queries",
        "Update payment methods",
      ],
    },
  };

  const agent = capabilities[agentType];

  if (!agent) {
    return c.json({ error: "Agent not found" }, 404);
  }

  return c.json({ agent });
}