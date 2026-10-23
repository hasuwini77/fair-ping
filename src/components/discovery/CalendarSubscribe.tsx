import { ButtonLink, TextLink } from "@/components/ui";
import { ROUTES } from "@/config/routes";
import { site } from "@/config/site";

const WEBCAL_URL = `webcal://${new URL(site.url).host}${ROUTES.calendar}`;

export function CalendarSubscribe() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <ButtonLink href={WEBCAL_URL} variant="secondary">
        Subscribe to all cups
      </ButtonLink>
      <TextLink href={ROUTES.calendar} className="inline-flex min-h-11 items-center text-sm">
        Download .ics
      </TextLink>
    </div>
  );
}
