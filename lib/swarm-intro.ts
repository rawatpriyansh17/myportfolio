// Runs while the initial HTML is parsed, before the homepage can paint.
// A timed escape hatch also covers a failed or blocked application bundle.
export const swarmIntroBootstrap = `(() => {
  if (location.pathname !== "/" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  root.setAttribute("data-swarm-intro", "pending");
  let timeout;
  const armTimeout = () => {
    clearTimeout(timeout);
    // The animation script loads after hydration, which can outlast window.load.
    if (!document.hidden) timeout = setTimeout(release, 20000);
  };
  const release = () => {
    root.removeAttribute("data-swarm-intro");
    clearTimeout(timeout);
    window.removeEventListener("portfolio:swarm-intro-ready", release);
    window.removeEventListener("keydown", escape);
    document.removeEventListener("visibilitychange", armTimeout);
  };
  const escape = (event) => { if (event.key === "Escape") release(); };
  armTimeout();
  document.addEventListener("visibilitychange", armTimeout);
  window.addEventListener("portfolio:swarm-intro-ready", release);
  window.addEventListener("keydown", escape);
})();`;

export function releaseSwarmIntro() {
  window.dispatchEvent(new Event("portfolio:swarm-intro-ready"));
}
