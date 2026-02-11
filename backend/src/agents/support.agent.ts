import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function supportAgent(context: string) {
  const result = await generateText({
    model: google("gemini-2.5-flash"), // free & fast
    system: `
You are a Support Agent.
Only answer support-related queries.
`,
    prompt: context,
  });

  return result.text;
}
