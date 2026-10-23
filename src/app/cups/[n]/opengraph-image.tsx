import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cups, getCup } from "@/data/cups";
import { formatCetTime, formatCupDate } from "@/lib/time";

export const alt = "Fair Ping duel cup on EU realms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const barlow = await readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-SemiBold.ttf"));

const INK = "#0b0f14";
const PANEL = "#121821";
const LINE = "#1e2833";
const PAPER = "#f4f1ea";
const MUTED = "#8a96a3";
const ACCENT = "#3ddc97";

// Same geometry as src/components/Blades.tsx.
const CENTERS = [16, 32, 48];

export function generateStaticParams() {
  return cups.map((c) => ({ n: String(c.number) }));
}

export default async function Image({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const cup = getCup(n);
  const number = cup?.number ?? n;
  const when = cup ? `${formatCupDate(cup.startsAt)} · ${formatCetTime(cup.startsAt)}` : "";
  const facts = cup ? `Level ${cup.level} · Free entry · €${cup.prizeEur}` : "Free entry";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          fontFamily: "Barlow Condensed",
          padding: 72,
          borderBottom: `12px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width={96} height={96} viewBox="6 6 52 52" fill={ACCENT}>
            {CENTERS.map((cx) => (
              <g key={cx}>
                <path d={`M${cx - 3} 42 L${cx - 3} 15 L${cx} 9 L${cx + 3} 15 L${cx + 3} 42 Z`} />
                <rect x={cx - 6.5} y={42} width={13} height={4} rx={1} />
                <rect x={cx - 2} y={46} width={4} height={9} rx={1} />
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: 6, color: ACCENT }}>
            DUEL CUP · EU REALMS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 168, lineHeight: 0.92, letterSpacing: -2 }}>
            {`FAIR PING CUP #${number}`}
          </div>
          <div style={{ display: "flex", fontSize: 56, color: PAPER }}>{when}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: PANEL,
            border: `2px solid ${LINE}`,
            borderRadius: 12,
            padding: "24px 32px",
            fontSize: 44,
          }}
        >
          <div style={{ display: "flex" }}>{facts}</div>
          <div style={{ display: "flex", color: MUTED }}>fairping.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Barlow Condensed", data: barlow, style: "normal", weight: 600 }],
    },
  );
}
