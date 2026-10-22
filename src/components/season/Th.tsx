import type { ReactNode } from "react";

/** Table head cell: one line, literal font-normal, text-sm comes from the thead. */
export function Th({ children, className = "", align = "left" }: { children: ReactNode; className?: string; align?: "left" | "right" }) {
  return <th scope="col" className={`py-3 px-2 font-normal ${align === "right" ? "text-right" : "text-left"} ${className}`}>{children}</th>;
}
