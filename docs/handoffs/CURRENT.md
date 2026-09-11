# Current — Week 1 accepted and deployed (2026-09-11)

Target: user's Week 1 continuation and public deployment, tickets 01–05 (repository Phase0). All five tickets are now done with actual acceptance evidence. The user's “Phase One” was interpreted in the explicit Week 1 handoff context; repository Phase1 still means Week 2. No Week 2 work started.

Live: https://prod.huiyuanxp.com is ROOMNOTE; /todo and /todo/api/board remain. Local 127.0.0.1:4173 is `renovation-workbench.service`, enabled and running as ubuntu. Existing tunnel untouched. Read `docs/DEPLOYMENT.md` for service management, backup and rollback. Login code remains private in `.data/owner-access-code`. Never run default 4174 preview alongside production against the same `.data`.

HEAD: 388e26a02294643681a947f964d3c319e8b5c478 unchanged. Existing implementation, intake-v1, plans, taskboard and tunnel were all untracked; preserved without reset/clean/commit. This session changed:
- vendor/openplan3d/src/lib/components/viewer3d/ThreeViewer.svelte and src/routes/embed/+page.svelte: real furniture mouse raycast, readable room camera, duplicate controls hidden, projected object diagnostics for mouse tests.
- apps/web/src/Workbench.tsx: offline closes SSE; online reconnects with last accepted event ID.
- scripts/run-workbench.sh: TIME_WAIT-compatible port check; still refuses real listeners.
- scripts/renovation-workbench.service: installed matching unit under /etc/systemd/system.
- tests/browser/01-engine.spec.ts, 02-05-workflow.spec.ts, new 03-04-live.spec.ts; scripts/test-intake-ui.mjs restricted to 4175.
- tickets 01–05, README/AGENTS, taskboard README, ENGINE, DEPLOYMENT, validation and handoffs; evidence and screenshots.

Verified: TypeScript; 15/15 logic/API tests; React and patched engine builds; 2/2 browser engine/workflow tests; final real-provider browser consultation/adoption/group-scope/cancel/reconnect test; 5 component browser checks; 10 isolated HTTP checks; 14 local/public HTTP checks; production restart with new PID, session persistence and current web asset. All browser runs used 4175 and synthetic `.runtime/browser-test-data`. Normal system Playwright Chromium dependencies resolved the earlier library blocker without a loader workaround.

Evidence: `docs/WEEK1-VALIDATION.md`, `docs/evidence/week1/browser-results.json`, `01-engine-results.json`, screenshots, `live-browser.json`, `live-browser.log`, `intake-component.log`, `production-http.json`, `production-restart.json`, earlier provider probe and independent-review walkthrough. Expanded three-field model attempt failed and is retained; final bounded test passed. Group dialog scope/dismissal was browser-tested, while actual all-or-nothing group application is covered by backend tests. First build/test overlap caused stale hashed assets; do not rebuild engine output underneath a running server.

Limits: no designer interviews or professional engineering verification; no real phone keyboard/GPU testing or machine reboot. Service boot enablement was checked. Production project listing was empty before/after restart; actual scene/form persistence tested only with synthetic browser data. Some non-browser HTTP clients received an edge 403; curl successfully verified public HTTP and login.

Next action: Week 1 is complete. For a newly authorized Week 2, read ticket 06 and its accepted 01/02 dependencies plus current spec. No unfinished in-flight ticket. Preserve `.scratch/openplan3d-consultation` as authoritative plans. Rollback: stop/disable known workbench service, verify free 4173, restore legacy taskboard if needed; retain owner data and tunnel. Private pre-cutover backup is `.runtime/production-backups/pre-cutover-data.tar.gz`; never restore over a live database or overwrite newer data blindly.
