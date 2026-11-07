"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { REBUILD_EVENT } from "@/lib/rebuild-page";
import { releaseSwarmIntro } from "@/lib/swarm-intro";

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
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hasPlayed = useRef(false);
  const automaticRun = useRef(false);
  const buildComplete = useRef(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const restoreInert = useRef<boolean | null>(null);

  const restorePage = useCallback(() => {
    clearTimeout(finishTimer.current);
    finishTimer.current = undefined;
    automaticRun.current = false;
    buildComplete.current = false;
    if (restoreInert.current !== null) {
      document.body.inert = restoreInert.current;
      restoreInert.current = null;
      if (previousFocus.current?.isConnected) {
        previousFocus.current.focus({ preventScroll: true });
      }
      previousFocus.current = null;
    }
  }, []);

  const start = useCallback((automatic: boolean) => {
    const swarm = window.SwarmCursors;
    if (!swarm || swarm.isRunning()) {
      if (automatic) releaseSwarmIntro();
      return;
    }
    // Never interrupt a dialog or a visitor who requested reduced motion on load.
    if (automatic && (document.hidden || document.querySelector('[role="dialog"]') ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      releaseSwarmIntro();
      return;
    }

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    swarm.start();
    automaticRun.current = automatic;
    buildComplete.current = false;
    const overlay = document.querySelector<HTMLElement>("swarm-rebuild");
    // The swarm mounts an opaque canvas synchronously before this cover clears.
    releaseSwarmIntro();
    if (!overlay) return;
    restoreInert.current = document.body.inert;
    document.body.inert = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Rebuilding this page with cursors. Press Escape to exit.");
    overlay.shadowRoot?.querySelector<HTMLButtonElement>('[data-a="close"]')?.focus();
  }, []);

  useEffect(() => {
    if (!ready || hasPlayed.current || pathname !== "/" ||
      !document.documentElement.hasAttribute("data-swarm-intro")) return;
    timer.current = setTimeout(() => {
      hasPlayed.current = true;
      start(true);
    }, 0);
    return () => clearTimeout(timer.current);
  }, [ready, start, pathname]);

  useEffect(() => {
    const cancelFinish = () => {
      clearTimeout(finishTimer.current);
      finishTimer.current = undefined;
    };
    const canFinish = () => {
      const page = document.scrollingElement;
      return automaticRun.current && buildComplete.current &&
        window.SwarmCursors?.isRunning() && !document.hidden && page &&
        page.scrollTop + window.innerHeight >= page.scrollHeight - 24;
    };
    const finishWhenViewed = () => {
      if (!canFinish()) {
        cancelFinish();
        return;
      }
      if (finishTimer.current !== undefined) return;
      // Leave a moment to see the finished bottom section before revealing the live page.
      finishTimer.current = setTimeout(() => {
        finishTimer.current = undefined;
        if (canFinish()) window.SwarmCursors?.stop(true);
      }, 1500);
    };
    const onComplete = () => {
      buildComplete.current = true;
      finishWhenViewed();
    };
    const onStart = () => {
      // The engine's own Replay button is also an explicit, manual replay.
      cancelFinish();
      buildComplete.current = false;
      automaticRun.current = false;
    };
    window.addEventListener("swarm:start", onStart);
    window.addEventListener("swarm:complete", onComplete);
    window.addEventListener("scroll", finishWhenViewed, { passive: true });
    window.addEventListener("resize", finishWhenViewed);
    document.addEventListener("visibilitychange", finishWhenViewed);
    return () => {
      cancelFinish();
      window.removeEventListener("swarm:start", onStart);
      window.removeEventListener("swarm:complete", onComplete);
      window.removeEventListener("scroll", finishWhenViewed);
      window.removeEventListener("resize", finishWhenViewed);
      document.removeEventListener("visibilitychange", finishWhenViewed);
    };
  }, []);

  useEffect(() => {
    const replay = () => {
      hasPlayed.current = true;
      clearTimeout(timer.current);
      // Let the command dialog finish closing before taking the page snapshot.
      timer.current = setTimeout(() => start(false), 250);
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
    if (pathname !== "/") releaseSwarmIntro();
    return () => {
      clearTimeout(timer.current);
      clearTimeout(finishTimer.current);
      window.SwarmCursors?.stop(false);
      restorePage();
    };
  }, [pathname, restorePage]);

  return <Script src="/vendor/reveal-cursors/swarm-cursors.js" strategy="afterInteractive"
    data-trigger="none" data-hotkey="" onReady={() => setReady(true)} onError={releaseSwarmIntro} />;
}
