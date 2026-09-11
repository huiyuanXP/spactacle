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
