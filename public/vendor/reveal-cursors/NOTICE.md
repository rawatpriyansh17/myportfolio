# Cursor swarm local preview

Source: https://github.com/harshit403-pixel/reveal-cursors
Revision: c26db4f065148c9a2770a4caecc46bba89b525f0

The source repository states that licensing is pending: the animation engine adapts
Joel Califa's Swarm, which has no license. No license grant is included in this
copy. Resolve permission with the upstream authors before public distribution.
See CREDITS.md for the original attribution.

Local integration changes: accessible exit button text and keyboard focus ring;
responsive playback controls; full-color intro image; stop and remove the overlay if initialization fails.
The overlay has an opaque background from mount to avoid exposing the live page during startup.
Initial playback preserves the loading cover's rounded image without replaying its entrance transition.
The engine emits swarm:complete after all build tasks finish; initial playback exits
only after completion while the visitor is at the bottom of the page.
The React controller handles initial playback,
replay, reduced-motion preferences, focus restoration and route-change cleanup.
