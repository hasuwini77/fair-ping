"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "fallback";

const BASE =
  "inline-flex min-h-11 min-w-24 items-center justify-center rounded-md border px-5 text-sm font-medium transition-[border-color,color,scale] active:scale-[0.96]";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [announce, setAnnounce] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setAnnounce(`${label} copied`);
      timer.current = setTimeout(() => {
        setStatus("idle");
        setAnnounce("");
      }, 2000);
    } catch {
      const source = button.current?.closest("[data-copy-block]")?.querySelector("[data-copy-source]");
      if (source) window.getSelection()?.selectAllChildren(source);
      setStatus("fallback");
      setAnnounce("Could not copy. The text is selected.");
    }
  }

  const tone = status === "copied" ? "border-accent text-accent" : "border-line hover:border-muted";
  const visible = status === "copied" ? "Copied" : status === "fallback" ? "Select and copy" : "Copy";

  return (
    <>
      <button ref={button} type="button" data-copy-button onClick={copy} className={`${BASE} ${tone}`}>
        {visible}
        <span className="sr-only"> {label}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {announce}
      </span>
    </>
  );
}
