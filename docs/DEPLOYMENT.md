# Active deployment — Canvas Chat popup, 2026-09-16 UTC

Active freeze `/opt/renovation-workbench/releases/chat-popup-20260916/app`, service `renovation-workbench`, existing port 4173/tunnel. Healthy at 17:04:04 UTC after stopped-writer backup; app PID 1553811. Only `/new-ui` entry selects new assets `index-Cjkhipff.js` / `index-tqovyLpN.css`; original `/` retains `index-BjMYqaR6.js` / `index-DKw538SU.css`. API source and original index are byte-identical to the previous release; frozen frontend includes upstream Tool UI dependencies.

Acceptance and failure records: `handoffs/CHAT-POPUP-20260916.md`. Controller receipt `/opt/renovation-workbench/control/chat-popup-20260916/receipt.json`. Consistent private backup `/var/backups/renovation-workbench/chat-popup-20260916/owner-data.tar`, SHA-256 `9f23a8966a90700592b168c89a419d3020aea152f97aa41a535a5945fcf90fc8`. Existing owner content preserved; coding-tools-mcp remains PID 831281.

Rollback after verifying service identity and allowing active jobs to finish: stop workbench, verify writer/listener stopped, copy `/opt/renovation-workbench/control/chat-popup-20260916/previous-release.conf` to `/etc/systemd/system/renovation-workbench.service.d/20-release.conf`, daemon-reload and start. This returns to new-ui-polish code with current data; do not restore an older data archive over newer live data.

## Previous deployment — New UI visual follow-up, 2026-09-16 UTC

Active freeze: `/opt/renovation-workbench/releases/new-ui-polish-20260916/app`, service `renovation-workbench`, port 4173 and existing tunnel. Published at 16:28:37 UTC after a stopped-writer backup (stop 16:28:28). App PID at switch: 1545778; coding-tools-mcp remains 831281.

Only `/new-ui`, `/new-ui/` and their query deep links select `APP_NEW_UI_DIST=.../apps/web/new-ui-dist`. This entry uses `index-EDKrB5Vf.js` / `index-IxAY2h_o.css`. `APP_WEB_DIST=.../apps/web/dist` retains the original Ticket 13 index and all old hashed assets, plus the new hashed assets. `/` therefore remains `index-BjMYqaR6.js` / `index-DKw538SU.css`. Without `APP_NEW_UI_DIST`, the previous shared-entry behavior remains.

Runtime copied from the active Ticket 13 freeze, with only the narrow entry-selection server change, accepted UI source and hashed assets added. No dependency, engine or business/data logic update. Frozen-release desktop and phone browser checks passed, and a routing/API-protection test and TypeScript check passed. Receipt and screenshots: `docs/handoffs/PAPER-UI-POLISH-20260916.md`.

Rollback: after confirming this service identity and allowing active tasks to finish, stop `renovation-workbench`, verify its writer/4173 listener has stopped, copy `/opt/renovation-workbench/control/new-ui-polish-20260916/previous-release.conf` to `/etc/systemd/system/renovation-workbench.service.d/20-release.conf`, daemon-reload and start the service. This restores Ticket 13 code using current data. Root-private backup `/var/backups/renovation-workbench/new-ui-polish-20260916/owner-data.tar`, SHA-256 `c3e6ebf1e98621b09c1acbee124e27c1b3b12dc74e27691fa1218edb42f5899c`, is not an automatic database rollback.

## Previous deployment — Ticket 13, 2026-09-16 UTC

Public **https://prod.huiyuanxp.com** runs `/opt/renovation-workbench/releases/ticket13-20260916T160000Z/app` through the existing 127.0.0.1:4173 service and tunnel. The service was stopped at 16:08:36 UTC, the live `.data` directory was consistently archived, and the new runtime became healthy at 16:08:42 UTC.

- Active release: `/opt/renovation-workbench/releases/ticket13-20260916T160000Z/app`; public bundle `index-BjMYqaR6.js` contains `设计师看板`.
- Immediate code fallback configuration: `/opt/renovation-workbench/control/ticket13-20260916T160000Z/previous-release.conf`.
- Consistent data archive: `/var/backups/renovation-workbench/ticket13-20260916T160000Z/owner-data.tar`, SHA-256 `4947db1e332b7e7b1e4cf768dc70dc56dffb9d9d59db9eea96463833b20a08b5`.
- Rollback keeps current data: stop the service, copy the saved previous-release configuration to the active drop-in, run daemon-reload, then start the service. Never unpack an older owner-data archive over newer live data.

## Previous active deployment — Paper UI, 2026-09-16

Public **https://prod.huiyuanxp.com/new-ui** (also `/new-ui/` and project query deep links), local127.0.0.1:4173/new-ui. Original `/` shares the refactored chat; `/todo` and the existing tunnel remain. No extra public port. Older release sections below are historical.

- Active frozen runtime: `/opt/renovation-workbench/releases/paper-ui-20260916T150735Z/app`. Do not rebuild/edit it.
- Immediate complete fallback: `/opt/renovation-workbench/releases/intake-v2-20260915T083433Z/app`.
- Service `renovation-workbench.service`, Userubuntu, enabled; MainPID1521166/applicationPID1521186 at verification. Active drop-in `/etc/systemd/system/renovation-workbench.service.d/20-release.conf`.
- Root-owned controller/manifest `/opt/renovation-workbench/control/paper-ui-20260916T150735Z`. In this directory `week1-override.conf` means saved intake-v2 fallback and `week2-override.conf` means new Paper UI; actual paths are authoritative. Controller stage label `activating_intake_v2` is inherited; release_id/WorkingDirectory identify Paper UI.
- Owner data remains `/home/ubuntu/aws-hackthon/renovation-consultation/.data`, one writer; existing.env/.scratch links retained. Node24.21.0 and dependencies frozen, old hashed web files retained. New assets index-C48VyUHk.js/index-TJMEpMvL.css. Coding-tools-mcp831281 unchanged.

Source is the accepted final77-file Paper UI archive, not newer workspace collaboration changes. Full identity, fresh51/51 tests,7 distinct browser passes and retained failures: `docs/handoffs/PAPER-UI-20260916.md`.8-project synthetic model metadata compatibility and stopped-owner-copy new/old/new checks passed.54 local/public groups plus real public-browser authenticated deep link/reload/theme/mobile/original-route checks passed without owner mutations.1owner project and2existing attachments preserved.

Writer stopped15:30:52UTC, healthy15:31:19, HTTP verification complete15:31:41. Recovery timer stopped after completion. Actual bounded command (execution record, not reusable updater):

```bash
sudo -n timeout --signal=TERM 480s python3 /opt/renovation-workbench/control/paper-ui-20260916T150735Z/activate.py
```

Private consistent archive `/var/backups/renovation-workbench/paper-ui-20260916T150735Z/attempt1/owner-data.tar` (45363200bytes), SHA256 `42f00167e5bc1836cb8cad8a594982267f8c8f084e797b66b78436a07ca2ee7b`.1001file hashes matched restored copy and unchanged stopped source. Baseline1project,2attachments,79commands,128events,9sessions. Raw snapshots, verification cookie and digests remain root-private. Sanitized `.runtime/deploy-receipts/paper-ui-20260916T150735Z/result.json`.

## Code-only rollback to intake-v2

Verify current service identity and allow owner jobs to finish. The recovery function accepts only Paper UI/intake-v2 cwd, stops and verifies the writer/cgroup/listener, installs the saved complete intake-v2 override and starts with **current data**:

```bash
sudo python3 - <<'PYCODE'
import importlib.util
path = '/opt/renovation-workbench/control/paper-ui-20260916T150735Z/recover.py'
spec = importlib.util.spec_from_file_location('paper_release_recovery', path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.recover()
PYCODE
curl -fsS --retry 10 --retry-connrefused --retry-delay 1 http://127.0.0.1:4173/healthz
```

Verify fallback cwd/resources, public health and authenticated content; update CURRENT. Old code lacks Paper UI/model-picker capabilities. Initialization roundtrip does not certify every old-version edit of new metadata. Explicit recover() is required for manual rollback because the watchdog entrypoint exits after deployment completion. No database was restored; never unpack an old backup over current/running data. Separately assess newer writes before any database restoration.

---

## Historical intake-v2 / Week2 / Week1 records — active paths above supersede them

# Active deployment — Agent / intake v2, 2026-09-15

https://prod.huiyuanxp.com now serves `intake-v2-20260915T083433Z`. `/todo` remains on the same existing tunnel to127.0.0.1:4173. The prior Week2 section below is historical; use the paths here for the active release.

## Service and verified package

- Frozen release: `/opt/renovation-workbench/releases/intake-v2-20260915T083433Z/app`; complete backend/contracts/native source, web, engine, Node24.21.0, root and engine dependency trees. Do not edit/rebuild this directory.
- Full fallback: `/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`.
- Service: `renovation-workbench.service`, Userubuntu, enabled; application PID1298869 and MainPID1298853 at verification. Active drop-in `/etc/systemd/system/renovation-workbench.service.d/20-release.conf`.
- Root-owned control/manifest: `/opt/renovation-workbench/control/intake-v2-20260915T083433Z`. Historical filenames `week1-override.conf` and `week2-override.conf` in this new control directory refer respectively to saved **Week2 fallback** and **new intake v2** overrides; their actual WorkingDirectory values are authoritative.
- Owner data remains `/home/ubuntu/aws-hackthon/renovation-consultation/.data`, one writer only. Only private.env and authoritative.scratch are linked; runtime code/dependencies are frozen. Old hashed web resources remain for open pages; refresh the page to load the new entry.
- Existing service security, tunnel and credentials unchanged. Coding-tools-mcp PID831281 before/after, no reset/restart.

48/48 unit/API, typecheck and web build passed.14 distinct browser scenarios have passing receipts from12/14 full plus2/2 focused recheck; failures retained. Frozen service/API/resource smoke and83-project synthetic old/new compatibility passed. See `docs/handoffs/AGENT-INTAKE-V2.md` for exact failures and limits.

Writer stopped08:53:04 UTC, candidate healthy08:53:23,42 local/public verification groups complete08:53:40. Exact new assets and reused engine resources, authenticated pre-stop session, unchanged existing owner fields, actual attachment bytes,60-question and both delivery audiences, private-route protections and16-ticket board verified. No owner test projects/model calls. Recovery timer stopped on completion.

Sanitized receipt: `.runtime/deploy-receipts/intake-v2-20260915T083433Z/result.json`. Actual bounded deployment invocation (fixed-identity execution record, **not a reusable updater**):

```bash
sudo -n timeout --signal=TERM 480s python3 /opt/renovation-workbench/control/intake-v2-20260915T083433Z/activate.py
```

## Consistent private backup

Archive `/var/backups/renovation-workbench/intake-v2-20260915T083433Z/attempt1/owner-data.tar`, root-private, 44564480bytes. SHA256 `6a70d07769c491c07df29876a96af5142b5c34613c7cf85f8259efbc7d3ede7d`. All1001 files matched restored copy and unchanged stopped source. Baseline1project,1attachment,73commands,122events,8sessions. Isolated owner-copy new→old→new initialization preserved all existing rows/sequences. Never open the live PGlite directory from a second process. Private baseline JSON, cookie and digest key remain root-private beside the archive.

## Code-only rollback to Week2

First verify service identity and allow active owner jobs to finish. The installed recovery function accepts only this v2 or the exact Week2 fallback cwd, stops this service, verifies its cgroup/listener are gone and restores the saved complete Week2 override. It keeps **current owner data**, including newer writes:

```bash
sudo python3 - <<'PYCODE'
import importlib.util
path = '/opt/renovation-workbench/control/intake-v2-20260915T083433Z/recover.py'
spec = importlib.util.spec_from_file_location('intake_release_recovery', path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.recover()
PYCODE
curl -fsS --retry 10 --retry-connrefused --retry-delay 1 http://127.0.0.1:4173/healthz
```

Then verify the Week2 cwd/assets, public health and existing authenticated content; update CURRENT. Week2 lacks v2-specific UI/API; initialization preservation tests do not certify every possible old-version edit of a new v2 record. The watchdog entrypoint exits after deployment completion; explicit `recover()` is the manual code rollback.

No database restoration was performed. If separately required, stop/verify the writer, preserve all current data, assess newer writes, and verify/extract the archive separately. Never unpack an old archive over a running or newer database.

---

## Historical Week2/Week1 release records — superseded operational entry above

# Workbench deployment — current Week2 release, 2026-09-13

Week2 / Phase1 tickets06–10 are deployed at https://prod.huiyuanxp.com. `/todo` and `/todo/api/board` remain on the same existing tunnel to127.0.0.1:4173. No Week3 work, tunnel change or sandbox change occurred.

## Active service and release

- Service: `renovation-workbench.service`, enabled, `User=ubuntu`. Application PID990931; systemd MainPID990915 at release verification. PIDs change on later restarts.
- Frozen release: `/opt/renovation-workbench/releases/week2-20260913T160456Z/week2`.
- Full Week1 fallback: sibling `week1`, including the old backend/contracts/native source, web+engine, Node24.21.0 and both dependency trees. It is not a restart of the dirty checkout.
- Active override: `/etc/systemd/system/renovation-workbench.service.d/20-release.conf`. Root-owned prepared overrides/controllers/manifests: `/opt/renovation-workbench/control/week2-20260913T160456Z/`.
- Existing service security remains: NoNewPrivileges, PrivateTmp, UMask0077. Root is used for deployment controls and protected backups, not the application process.
- Owner data remains `/home/ubuntu/aws-hackthon/renovation-consultation/.data` via APP_DATA_DIR. Only one PGlite writer is allowed. The original private `.env` and authoritative `.scratch/openplan3d-consultation` are explicitly linked; runtime code and dependencies have no mutable workspace links.

```bash
systemctl show renovation-workbench.service --property=ActiveState,MainPID,User,WorkingDirectory,ExecStart
curl -fsS http://127.0.0.1:4173/healthz
curl -fsS https://prod.huiyuanxp.com/healthz
```

Do not rebuild or edit the running frozen release. Future changes require a separate verified release. Workspace `.runtime/week2-release/{web,engine}` holds the accepted build source; the live service no longer runs the dirty working directory. Tests remain on4175 and `.runtime/browser-test-data`; never launch the4174 default against live.data. Old hashed web files were retained for open pages; engine views may need reload after a version change.

## Actual release verification

Final writer-stop to healthy-process interval:17:00:25–17:00:38 UTC; verification complete17:00:43. Thirty-six recorded local/public checks passed: current index and exact web/engine JS/model/texture bytes, health/process identity, home, /todo and16-ticket board, anonymous401, private-file404, new object/media strict400, existing object metadata, pre-stop session and owner project preservation. Service startup was also tested asubuntu with each installed release on4175,12/12 old and14/14 new checks.

The original pre-stop HTTPS session remained valid locally and publicly. All preexisting fields in1 populated owner project were compared to the stopped baseline. No owner test projects or model calls were made. Existing owner attachments numbered0, so production media byte preservation was not fabricated: synthetic disk-backed Week1→Week2→Week1→Week2 tests cover object editing, accepted references, uploaded media, session persistence and old scene-save roundtrip instead. This is not every possible old-version edit of a new reference object.

First attempt: full archive creation/restore comparison succeeded, but ubuntu could not traverse inspection directories created0700 under a private umask. Its recovery guard also rejected the empty cgroup of an inactive service. Explicit0711 traversal and inactive-cgroup handling were corrected, full frozen Week1 restored atPID986475, and the original public session verified before retry. First failure/recovery evidence is preserved; it was not relabeled successful deployment.

Sanitized final receipt: `.runtime/deploy-receipts/week2-20260913T160456Z/result.json`, with source/build identities, package/install verification, control hashes, first-attempt record and synthetic evidence links. Actual final one-shot command was:

```bash
sudo -n timeout --signal=TERM 480s python3 /opt/renovation-workbench/control/week2-20260913T160456Z/activate-attempt2.py
```

This controller is an execution record with fixed identity/precondition guards, not a reusable update command. Recovery timers were stopped after completion. Do not invoke the withdrawn historical `scripts/deploy-week2.py`.

## Consistent private backup

Final archive: `/var/backups/renovation-workbench/week2-20260913T160456Z/attempt2/owner-data.tar`, root-private,42,956,800 bytes. SHA256:

`ee7005c6c49806ca6b1695bedd01a4487a810b0d0afe56cd577be9f44bca2b60`

The service writer/cgroup/listener were stopped before archiving the entire.data directory. All996 file hashes matched the extracted copy and the unchanged stopped source. Baseline counts:1 project,58 commands,99 events,6 sessions. Candidate initialization on the isolated copy preserved all existing rows and sequence values; allowed changes were the new empty attachments table and missing reference_plans/object_messages/brief_version defaults. The inspection process ran asubuntu and never opened the live database. Root-private baseline JSON, verification cookie and keyed-digest secret remain under the backup directory; do not publish them. The first archive is retained at the parent release backup directory.

## Full code rollback while preserving current data

Before rollback, identify the known service and allow current tasks to finish. The installed root-owned recovery function checks User/WorkingDirectory/cgroup identity, stops only this service, checks its writer and port are gone, installs the complete Week1 override, reloads systemd and starts the full old release:

```bash
sudo python3 - <<'PYCODE'
import importlib.util
path = '/opt/renovation-workbench/control/week2-20260913T160456Z/recover-attempt2.py'
spec = importlib.util.spec_from_file_location('release_recovery', path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.recover()
PYCODE
curl -fsS --retry 10 --retry-connrefused --retry-delay 1 http://127.0.0.1:4173/healthz
```

The public tunnel and original.data remain in place. Verify the old release cwd/resources and existing session/content afterwards and update CURRENT. Week1 lacks the Week2-only UI/API features. The watchdog-style script entrypoint intentionally does nothing after a completed deployment; the explicit function invocation above is the manual rollback action.

**Code rollback does not restore an old database.** If database restoration is separately necessary, first stop and verify the writer, preserve the entire current/failed data directory, assess newer writes and verify/extract the archive to a separate location. Never unpack an old archive over a running or newer database. No blind database-restore command is provided or was executed.

---

## Historical Week1 deployment record (superseded operational paths)

The following preserves original evidence and historical instructions. For current updates/recovery, use the frozen-release procedures above, not the dirty-checkout or board-only fallback below.

# Workbench deployment — 2026-09-11

Public application: https://prod.huiyuanxp.com ; public board: https://prod.huiyuanxp.com/todo . Both use the existing tunnel to 127.0.0.1:4173. Tunnel configuration and credentials were not changed.

## Service

`renovation-workbench.service` is installed in `/etc/systemd/system/`, enabled for boot and running as ubuntu. Source: `scripts/renovation-workbench.service`. Uses the pinned local Node via `scripts/run-workbench.sh`; data remains private in `.data`, with one PGlite process. The owner access code remains `.data/owner-access-code`; do not publish it.

- Status: `systemctl status renovation-workbench`
- Logs: `journalctl -u renovation-workbench`
- Restart: `sudo systemctl restart renovation-workbench`
- Local health: `curl http://127.0.0.1:4173/healthz`

Browser testing is restricted to 4175 and `.runtime/browser-test-data`. Do not launch a second instance against `.data`. The 4174 preview command uses `.data` by default and must not run alongside production; use isolated data and an explicitly verified free port for non-browser service probes.

## Deployment and recovery evidence

Old listener was independently verified immediately before termination: PID 552582, ubuntu, `/usr/bin/python3 taskboard/server.py`, project root cwd, matching health response and listening socket. Only that process was stopped. System Chromium dependencies were installed normally with Playwright install-deps; no custom graphics library loader was used.

Initial startup encountered TIME_WAIT falsely reported as an occupied listener. The preflight socket now uses SO_REUSEADDR, matching Node's semantics; an attempted second 4173 startup still correctly exits 2. Subsequent systemd restart passed with a new process and retained authentication session. The production project listing was empty and remained empty: this is not a claim that an existing populated owner project was restored. Native scene and field persistence were verified with isolated synthetic browser projects.

`docs/evidence/week1/production-http.json`: local and public home, health, board, 16-ticket API, anonymous project denial and private-file denial (14 checks).
`production-restart.json`: successful process replacement, session persistence, unchanged project listing, current web asset and enabled service. Boot enablement verified; machine reboot was not performed.

Public login via HTTPS also returned 200 using the private code without printing it. Some non-browser HTTP clients received an edge 403; curl verified the public routes. Browser interaction evidence is from isolated 4175, not owner production data.

## Updating assets

Build before starting a test/production process against the new engine bundle. Do not rebuild the Svelte output while a server has its old handler loaded: hashed assets can disappear. Build React into a separate output (`npm run build:web -- --outDir ../../.runtime/release-web`), then perform a controlled service stop, copy assets, and start. Keep previous hashed React assets while rolling out for existing pages. Engine rebuilds require a maintenance window or a separate complete release directory.

## Rollback

Private pre-cutover data backup: `.runtime/production-backups/pre-cutover-data.tar.gz`, mode 600. Frontend before reconnect correction: `.runtime/production-backups/web-before-reconnect`. Never restore the database over a live process or overwrite newer owner data without reviewing it.

To restore the old public board only: stop and disable `renovation-workbench`, verify 4173 is free, then run `python3 taskboard/server.py` from project root under appropriate supervision. It retains `/todo` and `/todo/api/board`; the existing tunnel needs no change. Keep `.data` untouched. To undo an application fix, revert only the recorded changed code, rebuild with services stopped or into a separate release, and restart; the entire repository remains untracked and must not be reset/cleaned.
