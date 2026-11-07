// Runs while the initial HTML is parsed, before the homepage can paint.
// A timed escape hatch also covers a failed or blocked application bundle.
export const swarmIntroBootstrap = `(() => {
  if (location.pathname !== "/" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  root.setAttribute("data-swarm-intro", "pending");
  const release = () => {
    root.removeAttribute("data-swarm-intro");
    clearTimeout(timeout);
    window.removeEventListener("portfolio:swarm-intro-ready", release);
    window.removeEventListener("keydown", escape);
  };
  const escape = (event) => { if (event.key === "Escape") release(); };
  const timeout = setTimeout(release, 6000);
  window.addEventListener("portfolio:swarm-intro-ready", release);
  window.addEventListener("keydown", escape);
})();`;

export function releaseSwarmIntro() {
  window.dispatchEvent(new Event("portfolio:swarm-intro-ready"));
}
