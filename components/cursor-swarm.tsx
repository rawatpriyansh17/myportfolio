"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { REBUILD_EVENT } from "@/lib/rebuild-page";

declare global {
  interface Window {
    SwarmCursors?: {
      start: () => void;
      stop: (reveal?: boolean) => void;
      isRunning: () => boolean;
    };
  }
}

export function CursorSwarm() {
  const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingReplay = useRef(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const restoreInert = useRef<boolean | null>(null);

  const restorePage = useCallback(() => {
    if (restoreInert.current !== null) {
      document.body.inert = restoreInert.current;
      restoreInert.current = null;
      if (previousFocus.current?.isConnected) {
        previousFocus.current.focus({ preventScroll: true });
      }
      previousFocus.current = null;
    }
  }, []);

  const start = useCallback(() => {
    const swarm = window.SwarmCursors;
    if (!swarm) {
      pendingReplay.current = true;
      return;
    }
    pendingReplay.current = false;
    if (swarm.isRunning()) return;

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    swarm.start();
    const overlay = document.querySelector<HTMLElement>("swarm-rebuild");
    if (!overlay) return;
    restoreInert.current = document.body.inert;
    document.body.inert = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Rebuilding this page with cursors. Press Escape to exit.");
    overlay.shadowRoot?.querySelector<HTMLButtonElement>('[data-a="close"]')?.focus();
  }, []);

  useEffect(() => {
    const replay = () => {
      clearTimeout(timer.current);
      // Let the command dialog finish closing before taking the page snapshot.
      timer.current = setTimeout(start, 250);
    };
    const onExit = () => {
      // A fading overlay can emit its exit after a new route starts a replay.
      if (!window.SwarmCursors?.isRunning()) restorePage();
    };
    window.addEventListener(REBUILD_EVENT, replay);
    window.addEventListener("swarm:exit", onExit);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener(REBUILD_EVENT, replay);
      window.removeEventListener("swarm:exit", onExit);
    };
  }, [start, restorePage]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      pendingReplay.current = false;
      window.SwarmCursors?.stop(false);
      restorePage();
    };
  }, [pathname, restorePage]);

  return <Script src="/vendor/reveal-cursors/swarm-cursors.js" strategy="afterInteractive"
    data-trigger="none" data-hotkey="" onReady={() => { if (pendingReplay.current) start(); }} />;
}
