import { cups } from "@/data/cups";
import { buildCalendar } from "@/lib/ics";

export function GET() {
  return new Response(buildCalendar(cups, { name: "Fair Ping", feed: true }), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="fair-ping.ics"',
    },
  });
}
