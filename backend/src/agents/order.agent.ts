import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function orderAgent(
  context: string,
  orders: Array<{
    id: string;
    status: string;
  }>
) {
  
  const orderInfo = orders.length > 0
    ? orders.map(o => `Order ID: ${o.id}\nStatus: ${o.status}`).join('\n\n')
    : `No orders found for this user.`;

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    system: `
You are an Order Agent.

Rules:
- Only answer questions related to orders.
- Use the provided order data.
- If multiple orders exist, mention the latest one by default.
- If no order data is available, politely inform the user.
- Do NOT invent order details.
    `,
    prompt: `
User Query:
${context}

Order Data:
${orderInfo}

Answer in simple language.
    `,
  });

  console.log("Order Info:", orderInfo);
  console.log(result.text);
  return result.text;
}