# Current — Agent / intake v2 deployed and verified

Updated2026-09-15. Authorized03/04/05/09 extension plus narrow07 correction is complete and deployed. Those tickets are done; this does not mark whole-house geometry, wall/WASD, Ticket14 or other Week3 work complete.

Live: https://prod.huiyuanxp.com and `/todo`; release `/opt/renovation-workbench/releases/intake-v2-20260915T083433Z/app`. Application PID1298869 at verification, systemd `renovation-workbench.service`, ubuntu,4173. Coding-tools-mcp retains PID831281, no reset/restart; existing tunnel, credentials and owner data remain.

Verified:48/48 unit/API, typecheck, build; full browser12/14 followed by focused2/2, all14 distinct scenarios covered including unsaved modal/conflict. Preserve initial bridge timeout and multiple-alert selector failure; no single clean14/14 full rerun is claimed. Frozen startup and83-project synthetic old/new compatibility passed; production stopped-writer full backup, owner-copy new/old/new compatibility and42 local/public verification groups passed. Original session,1owner project and1existing attachment preserved. Only code was switched; no database restored.

Read `docs/handoffs/AGENT-INTAKE-V2.md` for exact evidence/failures/boundaries, `docs/AGENT-INTAKE-V2.md` for usage, `docs/DEPLOYMENT.md` for frozen paths and code-only rollback to complete Week2 release. Sanitized receipt: `.runtime/deploy-receipts/intake-v2-20260915T083433Z/result.json`; attempt/source/logs `.runtime/deploy-intake-v2-20260915T083433Z/`; browser evidence same run name and `-recheck` under `.runtime/codex-runs/`.

HEAD remains `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`; existing dirty work protected, no reset/clean/commit. Only product-repository code edit during release is the09-microphone test's permission-specific alert locator; release uses the already implemented v2 runtime code. Do not rebuild the active frozen directory. Future work requires a new scoped task/release; tests use4175 and `.runtime/browser-test-data`, never the owner database. No further deployment step is pending for this release.
