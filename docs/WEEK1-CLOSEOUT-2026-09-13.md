# Week 1 closeout audit — 2026-09-13

## Decision

Week 1 tickets 01–05 remain accepted/done: 29/29 recorded acceptance items. Existing acceptance artifacts and product source still match HEAD `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`. This audit found no new product regression in the checks actually executed. This is not a full security, load, real-device or professional engineering certification.

The Codex automation environment is only partly connected. The executable and ChatGPT authentication now work, and an actual model run produced a structured completion report. Its inner command sandbox failed before any delegated check could execute. Do not treat this as a new Week 1 browser acceptance, nor as a demonstrated product failure.

## Fresh verification

Private evidence root: `.runtime/codex-runs/audit-20260913T093409Z/evidence/`.

| Check | Actual result | Evidence |
|---|---|---|
| `npm run check` | exit 0 | `typecheck.log`, `test-exits.json` |
| `npm test` | 16 passed, 0 failed/skipped | `unit-tests.log`, `test-exits.json` |
| Python Codex receipt unit tests | 13 passed; synthetic receipt tests, not real Codex task execution | `python-tests.log` |
| Local and public HTTP | 18/18 passed: shell, health, board, board API, current React asset, anonymous project denial, private-path denial and disabled upstream handoff endpoint | `http-and-evidence.json` |
| Actual configured provider integration | passed; isolated synthetic fixture, model `gemini-3-flash`, one tool execution and one text-delta event | `provider-probe.json` |
| Populated fixture service restart | 10/10 passed; four requirements and five revisions, with persistent full snapshot, room isolation, unknown budget, object ID/color, session, idempotency and stale-version protection | `populated-restart.json`, `restart-service.log`; reproducible script `../restart-check.py` relative to the evidence directory |

The restart probe owned only its own Node subprocesses on 127.0.0.1:4175, with data in `.runtime/codex-runs/audit-20260913T093409Z/restart-data`. It did not launch a browser or reuse `.runtime/browser-test-data`. It did not open the production database or restart the 4173/systemd service. The provider probe used a separate private `provider-data` directory and did not modify owner data or old provider evidence.

## Current production and code

At audit start `renovation-workbench.service` was active/running and enabled, `NRestarts=0`, systemd MainPID 676378; `/healthz` reported application PID 676393. The main PID and application PID are different processes, not evidence of a restart. Local and public paths responded successfully during this audit.

Git HEAD remains `5d77da1`. The pre-existing uncommitted files concern delegation, evidence routing, tests and documentation; no product change appeared under apps/packages/vendor, and `git diff HEAD -- docs/evidence` was empty. This audit adds this document and updates current handoff/instruction status, but does not commit, rebuild, deploy or change product code, ticket status, tunnel, authentication configuration or security policy.

Historical browser results from 2026-09-11 remain 2 passed, 0 failed/skipped. Historical real-provider browser adoption/cancel/reconnect, engine ID/color restore, component checks, independent review and production restart artifacts still exist. SHA-256 values for the reviewed JSON artifacts are recorded in the fresh HTTP/evidence inventory. Those are historical results, not fresh browser runs.

## Actual Codex delegation

Run: `20260913T093409Z-81b457b7` under `.runtime/codex-runs/`.

- Current MCP resolves the configured Codex and Node in `/home/ubuntu/.nvm/versions/node/v24.21.0/bin/`.
- `codex --version`: codex-cli 0.154.0.
- `codex login status`: Logged in using ChatGPT. No credentials were printed.
- Wrapper invocation: `python3 scripts/codex_acceptance.py run --run-id 20260913T093409Z-81b457b7 --timeout 420`.
- `exit.json`: Codex exit 0, not timed out. The model returned `report.json` with outcome `blocked`; all six delegated checks were blocked and no test evidence was created.
- Validator receipt: `needs_attention`, `accepted=false`, no structural validation errors. Wrapper exit 2 correctly signals that tests are not accepted.
- Exact reported command blocker: `bwrap: Can't read /proc/sys/kernel/overflowuid: Permission denied.`
- Do not disable or route around the sandbox. Operator configuration must make the normal sandbox initialize; executable discovery and authentication no longer need the old CODEX_NOT_ON_PATH diagnosis.
- Use a NEW run ID for any rerun; never overwrite this completed run's evidence. The model's suggestion to reuse its completed directory must not override the wrapper's fresh-run contract.

## Remaining checks and next action

1. Development automation: after the operator repairs authorized sandbox initialization, rerun the two core browser suites and one real-provider browser suite, inspect fresh screenshots and logs, then review the receipt. This is an automation/regression-environment gap, not a newly discovered Week 1 feature defect.
2. Before a substantive live demo: repeat natural-language multi-field consultation across several synthetic scenarios. The fresh provider probe proves connectivity, streaming and one tool call only; earlier three-field model failures mean it is not evidence of general extraction/recommendation reliability.
3. Before real-client rollout: test an actual mobile browser/soft keyboard and backup restore into a separate database; current coverage is desktop Chromium responsive layouts and controlled process restart, not physical-device testing, machine reboot or backup-restore certification.

No broad rebuild or repeat of every accepted test is required to begin authorized Week 2 work. Ticket 06 (Week 2 / step 1) is the next planned implementation frontier. No Week 2 work was started. Commit the reviewed delegation/test/document changes separately when authorized; do not reset or clean the existing worktree.
