import { Context } from "hono";

export async function errorHandler(c: Context, next: () => Promise<void>) {
  try {
    await next();
  } catch (error: any) {
    console.error("❌ Error:", error);

    return c.json(
      {
        error: true,
        message: error.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      500
    );
  }
}