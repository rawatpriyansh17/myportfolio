export const REBUILD_EVENT = "portfolio:rebuild";

export function rebuildPage() {
  window.dispatchEvent(new Event(REBUILD_EVENT));
}
