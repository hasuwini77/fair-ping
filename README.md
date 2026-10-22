# Fair Ping

Free 1v1 duel cups for WoW Forever on EU realms. Landing page for [fairping.vercel.app](https://fairping.vercel.app).

Next.js 16 + Tailwind 4. Links and copy live in `src/config/site.ts`.

```bash
pnpm install
pnpm dev
```


## Editing cups, results and the ledger

Everything on the cup pages comes from two plain data files. Edit them, bump the timestamp, push.

**`src/data/cups.ts`**

- One entry per cup. `startsAt` is an ISO string with the offset, for example `2026-11-22T19:00:00+01:00`.
- `realm`, `caster`, `bracketUrl` and `vodUrl` are optional. Leave them out and the page says "to be announced" or falls back to the Challengermode page.
- Add `results` after the cup to mark it done. Each entry is `{ place, player, wowClass? }`. `place` is one of:
  - `1` first
  - `2` second
  - `3` shared 3rd–4th (two players)
  - `5` shared 5th–8th (four players)
- A cup with results is done whatever the clock says. Without results, a cup is live for 4 hours from `startsAt`, then done.
- Bump `CUPS_UPDATED_AT` on every edit. It feeds the calendar stamp, the sitemap and the RSS feed.
- `cups` must never be empty. An empty `generateStaticParams` is a build error under cacheComponents, so keep past cups listed.

**`src/data/ledger.ts`**

- Add one `LedgerEntry` per payment: `{ id, date: "YYYY-MM-DD", kind: "prize" | "sponsor" | "other-income", cup?, party, amountEur, note? }`.
- Prizes count as money out. Sponsor and other income count as money in, and feed the license cap meters.
- Cap meters convert euros to dollars with `USD_PER_EUR`. Update it together with `FX_AS_OF` when the rate moves, and bump `LEDGER_UPDATED_AT` on every edit.

Not endorsed by Blizzard Entertainment.
