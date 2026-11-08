import { getContributions } from "@/util/github-contributions";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Fixed, read-only query for this portfolio; never proxy arbitrary GitHub queries.
export async function GET() {
  const contributions = await getContributions();
  if (!contributions) {
    return Response.json({ error: "Calendar data unavailable" }, {
      status: 503, headers: { "Cache-Control": "no-store" },
    });
  }
  return Response.json({ contributions }, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
