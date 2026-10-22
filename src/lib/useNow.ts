import { useSyncExternalStore } from "react";

// The ONLY file allowed to read the clock (cacheComponents forbids it elsewhere).
// One module-level store: the interval starts on first subscribe and clears on last unsubscribe.

let tick: number | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) {
    tick = Date.now();
    timer = setInterval(() => {
      tick = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
      tick = null;
    }
  };
}

function getSnapshot(): number {
  if (tick === null) tick = Date.now();
  return tick;
}

function getServerSnapshot(): null {
  return null;
}

/** null on the server and during hydration, then epoch ms ticking every second. */
export function useNow(): number | null {
  return useSyncExternalStore<number | null>(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** false on the server and during hydration, then true. */
export function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
