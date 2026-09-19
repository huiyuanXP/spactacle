# Repository checkpoint — 2026-09-19

User requested committing and pushing the current project to `origin/master`. Scope: existing Paper UI/chat popup, designer collaboration, tests and documentation changes (Tickets 03/04/07/09/13); baseline HEAD `b2aba327c7b80dd882216e28e6be90f371c48c2a`. Existing 13 local commits are included in the push. No deployment or ticket-status changes in this checkpoint.

Fresh verification: `npm run check` passed; `APP_WEB_DIST=/tmp/renovation-commit-web-build npm run build:web` passed (large-chunk warning). `npm test` finished with 51 passed and 2 failed because `RENOVATION_MEDIA_FIXTURES` was unset. Rerunning `tests/media.test.ts` with existing `.runtime/new-ui-20260916T132021Z-f802da/fixtures` passed both tests. All 53 distinct tests passed across these runs; browser tests were not rerun. Logs: `/tmp/renovation-commit-tests.log`, `/tmp/renovation-commit-media-tests.log`, `/tmp/renovation-commit-build.log`. Existing CRLF/trailing-whitespace findings are retained unchanged. Private runtime data and ignored configuration remain excluded.

Production status and rollback references below are historical deployment receipts; this Git checkpoint does not change running services. Next action: verify remote push and a clean working tree; further feature work follows the existing ticket dependencies.

---

# Current — Canvas Chat popup published

Latest user-scoped 03/04 follow-up is published to **https://prod.huiyuanxp.com/new-ui** as of 2026-09-16 17:04 UTC. Active freeze `/opt/renovation-workbench/releases/chat-popup-20260916/app`; app PID 1553811. Chat is a lower-left popup, expands to half the desktop native canvas (full canvas width on phone), folds recorded choices, and renders agent-proposed choices with official Tool UI OptionList inside the actual assistant message. Original `/` retains Ticket 13 assets. New JS/CSS `index-Cjkhipff.js` / `index-tqovyLpN.css`.

Typecheck/build and six distinct focused browser scenarios passed in separate groups, including a real provider confirmation flow. Failures and reruns are retained. See `CHAT-POPUP-20260916.md` for scope, upstream component provenance and evidence. HEAD remains `b2aba327c7b80dd882216e28e6be90f371c48c2a`; unrelated dirty changes remain protected. Coding-tools-mcp remains PID 831281, with no reset/restart.

Immediate code fallback: `/opt/renovation-workbench/control/chat-popup-20260916/previous-release.conf` to new-ui-polish. Stopped-writer backup `/var/backups/renovation-workbench/chat-popup-20260916/owner-data.tar`; rollback retains current data. Local and public post-switch checks passed, including exact assets, half-canvas geometry, mobile/deep-link/reload, original entry and owner content. Receipt `.runtime/deploy-chat-popup-20260916/public-result.json`. Test port 4175 is closed; scoped request complete.

## Previous receipt — New UI visual follow-up

Paper UI visual follow-up was published to **`/new-ui` only**, per user instruction, on 2026-09-16 at 16:28 UTC. Active freeze: `/opt/renovation-workbench/releases/new-ui-polish-20260916/app`. `APP_NEW_UI_DIST` selects `apps/web/new-ui-dist` for `/new-ui`, `/new-ui/` and project queries; original `/` retains Ticket 13 assets. New JS/CSS: `index-EDKrB5Vf.js` / `index-IxAY2h_o.css`. Read `PAPER-UI-POLISH-20260916.md` for acceptance and deployment evidence. Existing owner content is unchanged; coding-tools-mcp remains PID 831281.

Immediate rollback configuration: `/opt/renovation-workbench/control/new-ui-polish-20260916/previous-release.conf` (Ticket 13). Consistent stopped-writer data archive: `/var/backups/renovation-workbench/new-ui-polish-20260916/owner-data.tar`. Roll back code with current data, never restore this archive over newer data. Prior Ticket 13 receipt follows for history.

Updated 2026-09-16 UTC. Ticket 13 is live at https://prod.huiyuanxp.com with the new frozen runtime `/opt/renovation-workbench/releases/ticket13-20260916T160000Z/app`. The service runs on the same 4173 listener with existing owner data and tunnel preserved. Public `index-BjMYqaR6.js` includes `设计师看板`; local and public health checks passed after cutover.

The consistent pre-switch owner-data archive is `/var/backups/renovation-workbench/ticket13-20260916T160000Z/owner-data.tar` (SHA-256 `4947db1e332b7e7b1e4cf768dc70dc56dffb9d9d59db9eea96463833b20a08b5`). The immediately preceding Paper UI release configuration is saved at `/opt/renovation-workbench/control/ticket13-20260916T160000Z/previous-release.conf`; code rollback retains current data.

## Previous receipt — Paper UI published and verified

Updated2026-09-16. Paper UI03/04/09 plus narrow07 extension is complete at https://prod.huiyuanxp.com/new-ui and127.0.0.1:4173/new-ui. Original `/`, `/todo`, existing data and tunnel remain. Frozen `/opt/renovation-workbench/releases/paper-ui-20260916T150735Z/app`, application PID1521186 at verification. Coding-tools-mcp remains831281; no reset/restart.

Read `PAPER-UI-20260916.md` for scope, accepted archive, exact checks/failures; `../design/PAPER-UI.md` for design; `../DEPLOYMENT.md` for current controls, private backup and code-only fallback to intake-v2. `PAPER-UI-HOST-PUBLISH.md` now records completed publication.

Fresh host verification:51/51 logic/API, typecheck, rebuild identical to accepted assets;7 distinct new UI browser cases passed in groups, retaining one navigation failure/recheck.8-project synthetic and isolated owner-copy old/new initialization preserve all existing data including optional model metadata.54 local/public groups and actual authenticated public-browser deep links/reload, dark/mobile and original route checks passed. Owner project and2attachments retained, no owner test mutations.

Receipt `.runtime/deploy-receipts/paper-ui-20260916T150735Z/result.json`; logs/snapshots `.runtime/deploy-paper-ui-20260916T150735Z/`. Publication source fingerprint `f7995e18431b6698fdef64e999ebfcb2fe9852ce1014980d9daa6e5ceb542ca5`, accepted archive hash in handoff. This release uses the accepted archive, not current dirty workspace.

Important remaining work: newer collaboration source/tests and app/store/contracts changes exist in the workspace and were not released or modified by this host task. Their status requires separate scoped review; do not mark Ticket13/Week3 done from this release. Preserve all working changes. No further Paper UI publication gate remains. Tests use isolated data;4176 used for this release is closed. Do not stop another workflow's4175 listener. Future releases need a new freeze and stopped-writer backup, never overwrite current data with an old archive.
