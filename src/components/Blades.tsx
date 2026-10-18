// Three identical sword blades: signal bars that are all the same height.
const CENTERS = [16, 32, 48];

export function Blades({ className }: { className?: string }) {
  return (
    <svg viewBox="6 6 52 52" className={className} aria-hidden="true" fill="currentColor">
      {CENTERS.map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 3} 42 L${cx - 3} 15 L${cx} 9 L${cx + 3} 15 L${cx + 3} 42 Z`} />
          <rect x={cx - 6.5} y={42} width={13} height={4} rx={1} />
          <rect x={cx - 2} y={46} width={4} height={9} rx={1} />
        </g>
      ))}
    </svg>
  );
}
