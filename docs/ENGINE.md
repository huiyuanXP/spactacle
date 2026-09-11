# OpenPlan3D integration

## Source and ownership

Upstream: https://github.com/laanlabs/openPlan3D
Pinned commit: `511ff08f57526784c0bf3bc48466bfea04204bbc`.
The original MIT license and copyright notice remain in `vendor/openplan3d/LICENSE`.
Runtime version and archive checksum are recorded in `vendor/UPSTREAM.json`.
This is a self-hosted fork, not a published OpenPlan3D SDK. The bridge methods below are **our additions**, not upstream API claims.

## Fork surface

- SvelteKit base path `/engine` and production model asset paths are adjusted to the same prefix.
- `/engine/embed?project=<id>` mounts actual upstream `ThreeViewer` / `FloorPlanCanvas` components and native stores; no substitute drawing engine.
- The native viewer exposes project-local camera/focus methods, and the external shell hides duplicate upstream controls.
- Firebase analytics initialization is disabled. The Fastify gateway serves only the embed route and static engine assets. Upstream AI rendering routes are not exposed; AI image generation is not part of this build.
- Embedded example furniture uses upstream MIT procedural model code. Third-party GLB provenance was not fully audited, so GLB-based furniture loading is not used by this demo. Do not claim the entire upstream asset collection has been cleared for commercial reuse.
- Native JSON is retained in PostgreSQL without replacing stable IDs. Native scene units are **centimeters**; side-panel target dimensions are **meters** and do not mutate scene geometry.

## Bridge protocol

Every message is `{channel:'roomnote',protocol:1,project_id,request_id,method,payload}`. Responses include project version and request ID.
Both sides validate exact same origin, expected window source, project ID, protocol and request ID. Mutation methods validate supported properties and expected version. Reused request IDs with different fingerprints are rejected; recent identical requests are replayed. Unsupported commands fail explicitly.

Commands: `load`, `snapshot`, `select`, `update`, `focus`, `mode`, `camera`, `keyboard`, `inspect`, `version`.
Notifications: `ready`, `selection`, `dirty`, `result`, `error`.
`update` edits a preview, not backend truth. Only authenticated `/scene/save` commits it. `version` acknowledges a business revision without reloading and discarding an unsaved scene.
The outer shell compares canonical JSON, not key ordering, when checking whether the server scene changed.

## Validation boundary

The patched production bundle and the actual Chromium/WebGL suite pass. Evidence: `docs/evidence/week1/browser-results.json`, `01-engine-results.json`, and desktop/tablet/mobile screenshots. The suite clicks the projected sofa geometry with an actual mouse event, verifies outer sofa-main selection, changes/restores color and stable ID, and exercises orbit/zoom/focus/2D/walk and version errors. Embedded recursive furniture raycasting and a steeper focus camera were fixed during acceptance; embedded duplicate controls are hidden.

Chromium uses normal system dependencies installed through Playwright; no denied library-search workaround was used. Tests run only on 4175 with synthetic data. See `docs/DEPLOYMENT.md` for the verified public deployment and its distinct production HTTP checks.
