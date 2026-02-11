import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function billingAgent(
  
  context: string,
  payment: {
    id: string;
    orderId: string;
    refundStatus: string;
  } | null
) {

  const paymentInfo = payment
    ? `Payment ID: ${payment.id}\nOrder ID: ${payment.orderId}\nRefund Status: ${payment.refundStatus}`
    : `No payment information found.`;

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    system: `
You are a Billing Agent.

Rules:
- Only answer billing and payment related queries.
- Use the provided payment data.
- If no payment data is available, politely inform the user.
- Do NOT invent payment details.
    `,
    prompt: `
User Query:
${context}

Payment Data:
${paymentInfo}

Answer in simple language.
    `,
  });

  console.log("Payment Info:", paymentInfo);
  return result.text;
}