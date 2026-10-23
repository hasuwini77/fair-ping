import { ButtonLink, TextLink } from "@/components/ui";
import { cupIcsPath } from "@/config/routes";
import type { Cup } from "@/data/cups";
import { googleCalendarUrl } from "@/lib/ics";

export function AddToCalendar({ cup }: { cup: Cup }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <ButtonLink href={cupIcsPath(cup.number)} variant="secondary">
        Add to calendar
      </ButtonLink>
      <TextLink href={googleCalendarUrl(cup)} className="inline-flex min-h-11 items-center">
        Google Calendar
      </TextLink>
    </div>
  );
}
