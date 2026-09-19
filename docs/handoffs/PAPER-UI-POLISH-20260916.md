# Paper UI visual and interaction follow-up — 2026-09-16

Scope: user-reported information ownership, outside dismissal, overlapping lower-left controls, and resizable right content. Baseline HEAD `b2aba327c7b80dd882216e28e6be90f371c48c2a`; existing uncommitted Paper UI and Ticket 13 changes were preserved.

Implementation:
- User statements use blue surfaces, adviser replies green, and pending question cards warm sand, retaining role/confirmation labels and dark-theme equivalents. Requirements have an explicit heading and a separate surface. In the docked New UI, generated questions start as summaries rather than expanding a full form over the latest reply.
- Questionnaire, delivery, brief, collaboration and furniture dialogs support outside dismissal. Questionnaire dismissal goes through the existing unsaved-draft confirmation. Geometry details, attachment library, question folds and requirements support outside dismissal; menus keep their existing Radix behavior. Interacting with dialogs and portaled menus no longer collapses the underlying chat.
- The right conversation column and requirements drawer expose pointer-captured resize handles and keyboard left/right adjustment. Desktop widths are bounded by the viewport; phone layouts use the available width without a drag handle.
- Scene actions, selection and notices use one vertical stack. Geometry history and view controls occupy separate positions. Closing chat preserves its mounted composer and draft.

Validation uses only dedicated port 4175 and `.runtime/browser-test-data`. Evidence root: `.runtime/codex-runs/ui-polish-20260916/`.
- TypeScript and production web build passed. Final build: `index-EDKrB5Vf.js` / `index-IxAY2h_o.css`.
- `sheets/`: desktop and iPhone 13 questionnaire/delivery, both themes, 2/2 passed.
- `interactions-v2/`: desktop and phone resize/dismiss/draft/layout checks, 2/2 passed.
- `final/`: existing desktop and phone chat regressions and expanded desktop selection/furniture/geometry checks passed (3); the phone case hit an obscured test click target.
- `phone-live/`: corrected phone selection/furniture/geometry checks and real model streaming/model binding/cancellation passed (2/2).
- `compact-final/`: final generated-question summary behavior and distinct real user/adviser colors, plus desktop keyboard/IME/confirmation regression, passed (2/2). Final real-response screenshot was visually reviewed.
- Logic/API run: 50/52 initially passed; both failures were missing `RENOVATION_MEDIA_FIXTURES`. The two media cases passed when rerun with `.runtime/new-ui-20260916T132021Z-f802da/fixtures`. This is a split rerun, not a clean single 52-case invocation.
- Screenshots were visually inspected for form hierarchy, light/dark colors and scene controls, in addition to DOM geometry assertions.

Acceptance complete for this scoped local follow-up: seven distinct browser scenarios have passing records across these groups, with failures retained. iPhone checks are browser emulation, not physical-device Safari. Final UI source, browser specs and web build are preserved in `.runtime/codex-runs/ui-polish-20260916/visual-source-and-web-final.tgz` (UI evidence archive, not a complete deployable server release).

Final JS SHA-256: `4f05c232db6a69102b455eaf72477d690fceacfb558ed3a5f94416d49b43e9db`; CSS SHA-256: `b2e9b2d1b585b8d0c9ba8acb91c2cf49676670e3e23a91eedc550bf1c9084e8b`.

Retained failures: the first invocation lacked a Playwright browser; Chromium was installed. A subsequent invocation pointed at the legacy default web dist and did not load Paper UI; later runs explicitly set `APP_WEB_DIST=apps/web/dist`. The first new test attempted to fill an unselected questionnaire item and timed out; corrected by selecting Q38. The expanded phone geometry test clicked a heading covered by the open dialog; the rerun clicks an exposed header area. These attempts are not counted as passes.

Initial acceptance boundary: visual changes were not published in the implementation turn. Ticket 13 was published by another workflow and its receipt was preserved. The user then explicitly requested publication to New UI first; that publication is complete as recorded below.

## New UI-only publication — completed 16:28 UTC

- Active release `/opt/renovation-workbench/releases/new-ui-polish-20260916/app` clones the actual Ticket 13 runtime. Only the optional `APP_NEW_UI_DIST` entry selector, accepted UI source and new hashed assets were added. Engine, dependencies and business/data logic remain from Ticket 13.
- `/new-ui`, `/new-ui/` and project query links serve `index-EDKrB5Vf.js` / `index-IxAY2h_o.css`; original `/` still serves `index-BjMYqaR6.js` / `index-DKw538SU.css`. Public bytes match the accepted hashes.
- Frozen-runtime desktop and phone interaction tests passed 2/2: `.runtime/codex-runs/new-ui-polish-publish-20260916/browser-results.json`. Entry routing/anonymous API protection test passed, as did TypeScript. One test expectation initially assumed anonymous unknown API routes return 404; corrected to the existing authentication-first 401 behavior.
- Service stopped 16:28:28 UTC and was healthy 16:28:37 UTC. App PID 1545778; coding-tools-mcp PID 831281 unchanged. Existing owner project JSON before/after is identical; no owner test projects or model requests were created. No tunnel change.
- Root-private consistent backup `/var/backups/renovation-workbench/new-ui-polish-20260916/owner-data.tar`, SHA-256 `c3e6ebf1e98621b09c1acbee124e27c1b3b12dc74e27691fa1218edb42f5899c`. Receipt and immediate Ticket 13 fallback configuration are under `/opt/renovation-workbench/control/new-ui-polish-20260916/`. Rollback uses current data.
- Authenticated public browser verification passed: exact JS/CSS, desktop deep link/reload/resize/outside dismissal, phone scene without horizontal overflow, original UI, taskboard, health and unchanged owner content. Result and private screenshots: `.runtime/deploy-new-ui-polish-20260916/public-result.json`, `public-desktop.png`, `public-phone.png`. Desktop screenshot visually reviewed. Initial Playwright API-client login received an edge 403; ordinary browser same-origin fetch succeeded and all public checks were completed through the browser. The initial 403 is not counted as a pass.
