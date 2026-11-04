import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getDailyQuote } from "@/data/daily-quotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  if (!secret || !authorization) {
    return new Response("Unauthorized", { status: 401 });
  }

  const expected = Buffer.from(`Bearer ${secret}`);
  const supplied = Buffer.from(authorization);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Invalidating the homepage regenerates its server-rendered quote on the next visit.
  // Selection is date-based, so retries never advance through extra quotes.
  revalidatePath("/");
  return Response.json({ revalidated: true, date: getDailyQuote().date });
}
