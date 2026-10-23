import { cups, getCup } from "@/data/cups";
import { buildCalendar } from "@/lib/ics";

export function generateStaticParams() {
  return cups.map((c) => ({ n: String(c.number) }));
}

export async function GET(_request: Request, ctx: RouteContext<"/cups/[n]/invite.ics">) {
  const { n } = await ctx.params;
  const cup = getCup(n);
  if (!cup) return new Response("Not found", { status: 404 });
  return new Response(buildCalendar([cup], { name: "Fair Ping", feed: false }), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="fair-ping-cup-${cup.number}.ics"`,
    },
  });
}
