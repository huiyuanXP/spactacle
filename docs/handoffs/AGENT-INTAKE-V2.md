# Agent / intake v2 — deployed and verified, 2026-09-15

Release `intake-v2-20260915T083433Z` is live at https://prod.huiyuanxp.com; `/todo` is preserved. This completes the authorized03/04/05/09 extension and narrow07 correction. It does not complete whole-house geometry, wall/WASD work or Ticket14. Existing scope and hardware/provider limitations still apply.

- Production: `/opt/renovation-workbench/releases/intake-v2-20260915T083433Z/app`, systemd `renovation-workbench.service`, application PID1298869 at verification; userubuntu, port4173 and original.data remain. Coding-tools-mcp retained PID831281 without reset/restart; tunnel and credentials were not changed.
- Verification: typecheck and web build passed;48/48 unit/API tests. Full14-browser run12passed/2failed; focused01 and09-microphone recheck2/2passed. All14 distinct scenarios have passing evidence, including the previously unrun modal draft/conflict case, but this is **not a single clean14/14 full-suite run**.
- Initial browser01 hit a bridge timeout during mode switching; unchanged test passed focused in56.5s. Microphone permission test matched two simultaneous alerts; only its locator was narrowed to the permission-denied text, preserving the assertion; focused pass16.3s. Original traces remain. Runtime product source was not changed during deployment.
- Frozen package:51,536 regular files, complete API/contracts/web/Node24.21.0 and both dependency trees including parsers;645 engine files match the accepted Week2 build. Frozen startup, exact web,60-question and owner/designer delivery reads and16-ticket board passed on4175.83 synthetic projects passed old/new initialization with all existing fields, v2 answers, attachments, rows and sequences preserved; only established missing reference_plans/object_messages/brief_version defaults are allowed.
- Pre-cutover packaging checks initially caught inherited0700 Node directory permissions and an overly strict synthetic comparison rejecting those historical defaults. Public frozen code/dependency permissions were corrected; exact default-only differences were independently verified and a fresh isolated check passed. All occurred before production stop; no failed production cutover.
- Consistent backup: writer stopped08:53:04 UTC; all1001 files matched restored copy and unchanged source. Owner-copy new→old→new initialization preserved rows and sequences. New process healthy08:53:23, verification completed08:53:40 UTC.
- 42 recorded local/public verification groups passed: exact current frontend and engine assets, health/process identity, session continuity, preserved owner project set/content, actual existing attachment bytes including original variant when present, new intake/delivery reads, auth/private-file checks and/todo. Owner baseline:1project,1attachment,73commands,122events,8sessions. No owner test project or model call was created.

Evidence: `.runtime/deploy-intake-v2-20260915T083433Z/` (logs, original/final source fingerprints, narrow test change, package and frozen-smoke receipts); `.runtime/codex-runs/deploy-intake-v2-20260915T083433Z/` and sibling `-recheck` (browser JSON/screenshots/traces); sanitized `.runtime/deploy-receipts/intake-v2-20260915T083433Z/result.json`. Baseline HEAD remains `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`; protected dirty work remains uncommitted. Root-private backup/controller details and code-only rollback: `docs/DEPLOYMENT.md`.

---

## Historical implementation and blocked release record — superseded by verified release above

# Agent / intake v2 — implementation and isolated acceptance; release blocked

Date: 2026-09-14. Run: `agent-intake-v2-20260914T110418Z-0583bb`.
Actual baseline HEAD: `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`, confirmed from this run's `baseline.json`. No commit was created. The old source tree was already dirty and was preserved; no reset, clean, credential inspection or owner-data operation occurred.

## Scope and state

User authorized real implementation of the Agent, full questionnaire/delivery checklist and a unified chat composer. Primary tickets: week1/step3–5 = 03/04/05, week2/step4 = 09. During the full regression, a narrow existing07 object-agent proposal-scope defect was found and corrected. This is not a new Ticket17 and does not change README's fixed numbering.

**Implemented and exercised in the isolated workbench:** text/image/audio/document composer; actual voice transcription and existing image-candidate processing; 60-question catalogue and real persistent answers; evidence-grounded A+B/C/D plus free response; exact-quote pending extraction; owner/designer delivery views, versioned JSON/Markdown snapshots and effective sharing filters. No engine, wall editing, WASD or full-house reconstruction implementation. No Ticket14 final PDF/native-reimport/scene-image bundle completion claim.

**Not published:** production is still the accepted frozen Week2 release. Last direct health read after the full browser run was `renovation-workbench`, application PID990931 on127.0.0.1:4173;4175 had no listener. The existing public tunnel and /todo were not changed. The candidate UI is not what current public visitors will see.

**Remaining execution gates:** production service/release control is not available through the present MCP privilege policy. A read-only sudo capability attempt was rejected as `privileged_executable`; no sudo command ran. The final combined additional draft-browser/check/source-capture call was also blocked before execution with an indeterminate safety result. It was not resubmitted through another executable, encoding or sandbox. Treat these as distinct gates, not a recurrence of the historical Chromium/WebGL problem.

## What changed

| Area | Implementation |
|---|---|
| Contracts | `packages/contracts/intake.ts`, optional extensions in `packages/contracts/index.ts` |
| Questionnaire API | `apps/api/intake.ts`:60 definitions, project/room isolation, explicit choice/free answer, exact-quote extraction, source checks, optimistic concurrency and idempotency |
| Agent | `apps/api/agent-intake-tools.ts`, `intake-question-guard.ts`, `chat.ts`, `provider.ts`:cohesive v2 instructions, real structured tool output, bounded detail/excerpt reads and postcondition check |
| Document input | `apps/api/documents.ts`, `document-worker.mjs`, `document-routes.ts`:safe bounded PDF/DOCX/text extraction and original preservation |
| Delivery | `apps/api/delivery.ts`:owner/designer views, pending actions, separate budget target/ceiling, versioned downloads and revocable export scope |
| Routing / persistence | `business-routes.ts`, `store.ts`:new owner-bound endpoints and appropriate brief-version invalidation; no SQL schema migration for new project JSON fields |
| Composer / UI | `ChatWindow.tsx`, `ComposerMedia.tsx`, `IntakeCard.tsx`, `QuestionnairePanel.tsx`, `DeliveryPanel.tsx`, `Workbench.tsx`, `intake-v2.css`, `question-deck.css` |
| Dependencies | Exact `pdfjs-dist@6.3.289`, `mammoth@1.12.3`, `fflate@0.8.3`; package manifest and lock updated |
|07 regression only | `object-agent.ts` drops unchanged patch keys, including case-equivalent hex colors; existing exact width-only browser assertion retained |
| Tests / receipts | New intake, context, guard, document and browser tests; existing09 media/microphone selectors adapted to the actual toolbar, without weakening provenance/approval assertions |

The existing `apps/api/media.ts` processing service was reused, not silently replaced. The old16-field side panel and old independent review remain compatible; new60-field delivery lives in **问卷与交付**, not in a falsely relabelled old16-field audit.

The operational guide is `docs/AGENT-INTAKE-V2.md`. Original v1 research remains under `docs/research/intake-delivery-v1/`; its README now identifies the old16-field boundary as historical. The current spec has a bounded2026-09-14 consultation-layer addendum. Historical CURRENT was copied unchanged to `docs/handoffs/CURRENT-before-AGENT-INTAKE-V2.md` before this closeout.

## Verified results

Private command logs live in `.runtime/agent-intake-v2-20260914T110418Z-0583bb/`.
Private browser evidence lives in `.runtime/codex-runs/agent-intake-v2-20260914T110418Z-0583bb/`.

| Verification | Actual result | Receipt |
|---|---|---|
| TypeScript after guard and object correction | Passed | `check-release.log` |
| Full logic/API regression after correction | **48/48 passed**, zero skipped | `unit-release.log` |
| Web build | Passed; existing >500KB chunk-size warning remains | `build-final.log`; candidate under `web/` |
| PDF/DOCX/text parser tests |3/3 passed, including originals and failure preservation | `documents-third.log`; included again in48-test run |
| Structured-output postcondition positive/negative cases |2/2 passed | `guard-unit-second.log`; included again in48-test run |
| Actual-provider ordinary-language consultation, no tool names or question IDs in user message | All7 checks passed; generated a realQ31 choice card with four distinct options and existing evidence; no user-confirmed answer or scene change | `natural-third.log`, `natural-third/natural-language-result.json` |
| Full browser suite,13 scenarios, one worker, no retries | **12 passed,1 failed** in6.8min; the sole failure was07 unchanged property echoes | `browser-final.log`, `browser-final/browser-results.json` |
|07 focused real-provider revalidation after unchanged-key filter | **1/1 passed**, exact width-only scope, preview/cancel/adopt/reload | `browser-object-recheck.log`, `browser-object-recheck/` |

The13 distinct browser scenarios now each have a passing receipt, but there was **not** a clean whole13-scenario rerun after the07-only correction. Do not rewrite the full-suite12/13 result as13/13 in one run.

Passed browser coverage includes actual OpenPlan3D rendering/native save/reload/navigation; unchanged scene while answering; desktop/mobile layout and unobscured mobile chat entry; old side-panel persistence; streaming/cancellation/reconnect; object06 editing;08 real reference proposals;09 image pixels and public speech transcription;09 simulated microphone with real MediaRecorder/WebAudio conversion, original WebM preservation, cancellation and denied permission;10 geometry marker behavior; full60-question navigation and structured budget; sharing-filtered JSON download; two real text-document uploads; attachment reference removal without deleting originals; room-specific chat drafts/attachments; unsupported HTML feedback; real model choice generation and explicit single-option adoption.

Inspected visual evidence includes composer desktop, questionnaire desktop, recommended question, mobile attachments and designer delivery screenshots. The new dedicated question deck was introduced after the first composer screenshot revealed the old message viewport scrolling into the bottom of an oversized form. The full browser run exercised the adjusted layout.

## Failed attempts retained and why

- Initial PDF text extraction failed because the installed PDF.js loading-task API needed `task.destroy()`, not `pdf.destroy()`; fixed and real PDF/DOCX tests passed. Original document bytes were retained even on failure.
- An early unit run also lacked the expected media-fixture environment; prepared public/synthetic fixtures and supplied the actual path rather than treating those tests as passed.
- The first natural-language probe used raw JSON serialization to compare a PostgreSQL JSONB scene with the pre-insert object; key-order differences gave a false geometry mismatch. The probe now compares canonical values while preserving array order.
- The next real probe revealed a genuine failure: the model claimed a card existed after rejected tool calls. The v1/v2 prompt conflict was removed, question IDs became an enum, rejected calls gained safe diagnostics and fresh eligible IDs, and a bounded postcondition formatting pass was added. The negative test now requires failure plus an explicit correction if no real card is saved; the third real ordinary-language probe passed.
- An early media/browser run retained a failed final consultation message after successful media processing. The final full-suite09 test passed the complete pipeline after the consultation changes.
- Full-suite07 failed on unchanged keys in a model patch. Only no-op keys were filtered; the browser assertion was not relaxed. Focused actual-provider07 revalidation passed.

## Explicitly NOT run / not produced

- `tests/browser/intake-v2-draft.spec.ts` was added for the final extra modal unsaved-navigation and concurrent-answer UI case. Its execution was blocked before launch. The main browser suite verifies ordinary draft/room behavior and the API suite verifies CAS protection, but this additional browser case has **no passing receipt**.
- The combined final check/source-capture command did not execute. `check-handoff.log`, `browser-draft-final.log`, `candidate-fingerprint.json` and `candidate-source/` were confirmed absent with a read-only file listing. The preceding `check-release.log` and48-test run are valid, but do not claim a later final check or a captured aggregate source fingerprint.
- `scripts/capture-intake-v2-source.py` exists as a non-secret recovery snapshot helper only. It has not run and is not a complete deployable-release installer. A supported execution channel must first be available; do not use a renamed/wrapped command to evade the last block.
- No new production package, stopped-writer owner-data backup, migration/rollback-on-owner-copy test, production cutover, real owner-content continuity or public new-asset check was performed. Old Week2 deployment evidence does not certify this new candidate.
- No physical microphone-device or Safari-specific validation, universal model reliability, designer interview, engineering validation, full visual report generation or independent60-field model audit is claimed.

## Resume and safe operations

Project workdir: `renovation-consultation`.
Node: `.runtime/node-v24.21.0-linux-x64/bin`.
Candidate web: `.runtime/agent-intake-v2-20260914T110418Z-0583bb/web`.
Accepted reused engine: `.runtime/week2-release/engine`.
Browser fixture data: `.runtime/browser-test-data`; public/synthetic media fixtures: this run's `fixtures/`. Existing `scripts/run-workbench.sh` is the actual application startup entry, with4175 used by the existing Playwright webServer. The public writer on4173 must never share its database with another process.

After a supported execution/administrative channel is available, inspect current HEAD/dirty work, this handoff and exact logs first. Run the still-unrun focused draft UI check and final source identity capture on a **new** attempt path, without overwriting failed evidence. Then prepare and validate a new complete frozen release including the new parser dependencies, API/contracts, frontend and reused engine resources. Do not invoke the old Week2-only release controller to install an unvalidated candidate.

For any eventual production change, follow `docs/DEPLOYMENT.md` principles: verify actual current service identity, preserve /todo and tunnel, stop the sole data writer for a verified private full-data backup, validate new-code compatibility on an isolated copy, install a complete frozen release, and verify both authenticated continuity and exact new assets before declaring success. Existing rollback procedure is historical guidance, not a new ready-made rollback package for v2.

Original whole-home planning archive is a separate unfinished documentation import at `docs/planning/whole-home-v0.3/README.md`; the original ZIP/visual assets still need the previously documented approved transfer. Do not silently substitute this implementation for that archive transfer or proceed to new whole-home geometry tickets.

## Recovery / rollback of this work

Pre-existing source and all tickets were copied under `.runtime/agent-intake-v2-20260914T110418Z-0583bb/baseline/`, with recordedSHA256 and dirty status in `baseline.json`. Product source changes are uncommitted. Use those scoped copies and actual diffs to undo only this run's hunks if requested; preserve any later edits, source evidence, all original work and private data. No production rollback is currently needed because no public service was changed. Never restore an old owner database over later writes.
