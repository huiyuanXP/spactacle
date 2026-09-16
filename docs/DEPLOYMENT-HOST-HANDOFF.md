# Week 2 production deployment — completed host handoff

## Current status: DEPLOYED — 2026-09-13 17:00 UTC

The host-authorized workflow is complete. Current service is ubuntu-owned process990931 at127.0.0.1:4173, running root-owned frozen `/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`. Existing tunnel and /todo remain. Full Week1 fallback is installed beside it. Final private consistent backup is `/var/backups/renovation-workbench/week2-20260913T160456Z/attempt2/owner-data.tar`; no database was restored over newer writes.

Original session and the populated owner project survived; local/public36 checks passed. The backup restored-copy comparison covered996 files; isolated migration retained all existing table rows and sequences. Initial inspection-permission and recovery-guard failures, corrected full Week1 recovery, and the successful separate retry are all recorded. These are actual host execution results, not the withdrawn earlier deployment draft or mocked checks.

Use `docs/DEPLOYMENT.md` for the current service, immutable release and rollback commands, and `docs/handoffs/CURRENT.md` for recovery context. Sanitized final receipt: `.runtime/deploy-receipts/week2-20260913T160456Z/result.json`. Source acceptance fingerprint remains3d3c20ae3c633641d362a44a0359e27fb60b64aaebe1341c62710192c3e450d4; dirty source, original workspace builds and Week1 evidence preserved. No Week3 scope or sandbox changes.

---

The following is the preserved pre-deployment handoff from the earlier MCP attempt. Its NOT DEPLOYED/systemd-unavailable statements are historical, superseded by the host result above.

# Week 2 production deployment — host operator handoff

## Current status: NOT DEPLOYED

The user explicitly requested deployment of the accepted Week 2 / Phase1 tickets 06–10. This authorizes a controlled workbench release, not changing the tunnel, expanding product scope, exposing credentials, or bypassing execution policy.

At the final direct check on 2026-09-13 15:58:54 UTC, production 127.0.0.1:4173 still returned renovation-workbench PID 676393 (Week 1). No production stop/restart, owner-database backup, database migration, live-asset replacement, or public cutover has been performed in this attempt.

Current AWS Machine execution is trusted + bwrap, with a private process/filesystem view. `systemctl show renovation-workbench.service` returned "System has not been booted with systemd as init system ... Failed to connect to bus". `/run/systemd/system` is not visible. Codex shell/browser capability does not provide host systemd control. A release-packaging tool call was also blocked before execution; no bundle was produced by it. No attempt was made to access an alternate host namespace or weaken the sandbox.

An operator-script draft was created and statically tested, then withdrawn after independent read-only review found incomplete rollback-data coverage, a live-snapshot race, backup-failure recovery risks, privileged writes under an unprivileged directory, and unenforced package integrity. A proposed correction was blocked before execution. There is NO approved `scripts/deploy-week2.py`; do not invoke that former draft or claim its 7 mocked guard checks prove a safe deployment. Static review evidence is private under `.runtime/week2-deploy-script-review/`.

## Release identity already checked

- Project: `/home/ubuntu/aws-hackthon/renovation-consultation`.
- HEAD: `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`. Week 2 product changes are intentionally uncommitted and must not be reset, cleaned or overwritten.
- Accepted source fingerprint: `3d3c20ae3c633641d362a44a0359e27fb60b64aaebe1341c62710192c3e450d4`.
- Accepted candidate: `.runtime/week2-release/web` and `.runtime/week2-release/engine`.
- Candidate web tree SHA256: `2bac357b3e1457df8f1df3b3041a9f10b9596034731c05d082d57fa248b0bb59`.
- Candidate engine tree SHA256: `b780ae137f0e7d682d2412934af901a15adf7bd3be45d24e21495da33816121e`.
- Current Week 1 web tree SHA256: `2a6b24ec5e209238c92cc8df7f665be882e5d2d213b1bc2ebb790b2af82585c1`.
- Current Week 1 engine tree SHA256: `66b6f1642e56a473325a35fcc98b70fb57bc5a5d103271c9f5373b83cf929698`.

Tree hashes follow the accepted receipt algorithm: sort all regular files recursively; append relative path bytes, a NUL byte and the binary SHA256 of each file to one SHA256 accumulator. These hashes were checked against the actual directories, not inferred from filenames.

Read `AGENTS.md`, `docs/WEEK2-VALIDATION.md`, `docs/DEPLOYMENT.md`, the latest CURRENT entry and `.runtime/codex-runs/week2-final-20260913T143835Z-8483a6/evidence/coordinator-review.json` before acting.

## Host-authorized deployment work still required

Use the host's approved service-control mechanism or obtain explicit operator approval there. Do not attempt to escape MCP isolation or change its security settings to reach systemd.

1. Revalidate source/build identities, actual service configuration and process identity, free disk space, ports and active consultation jobs. Establish a maintenance/drain window before stopping the known workbench service. Preserve the existing tunnel and /todo routes.
2. Freeze the accepted backend, frontend, engine and pinned runtime/dependencies into a separate release. The backend source on disk is already Week 2 while the old process is Week 1; merely restoring old frontend files or restarting the original dirty working directory is NOT a valid Week 1 rollback. Prepare a complete old-code/old-assets fallback from the checked Week 1 baseline without modifying the dirty working tree.
3. Keep privileged deployment control files and backups root-owned and out of application-writable paths. Restrict dynamic bindings to the original private model configuration, owner data, and current authoritative planning files. Verify copied file hashes and runtime symlink targets before activation.
4. Back up `.data` only with its single PGlite writer stopped. Preflight backup capacity and bound the operation duration; ensure recovery can still start the old frozen release if backup or activation fails. Derive the preservation baseline from the stopped database/isolated copy, not a racing live snapshot.
5. Validate packaged code and assets with isolated synthetic data. Browser tests remain on 4175 and `.runtime/browser-test-data`; never run them against owner data. Specifically exercise candidate-created data under the fallback version before claiming backward compatibility.
6. Activate only the known renovation-workbench.service at 4173 using the original owner data. Verify release-specific frontend assets, engine JavaScript/resources, new object/media API behavior, authentication/session continuity and preserved owner content. Verify the public home, health, /todo, /todo/api/board, assets and anonymous API refusal at prod.huiyuanxp.com.
7. Record actual success/failure and evidence. Code rollback must not blindly restore an old database over newer data. Do not call the release complete until process identity, version, local/public checks and data preservation have evidence. Do not start Week 3 or claim that floor-plan-image whole-home reconstruction was implemented by these Week 2 tickets.

Publish a sanitized execution receipt (no tokens, private project contents or credential files) into a new `.runtime/deploy-receipts/` directory in the workspace so the remote coordinator can inspect it. Keep actual backups private. On success update CURRENT, README and DEPLOYMENT with the active release, actual commands, verification, remaining limits and rollback instructions. Until then, production status remains Week 1.
