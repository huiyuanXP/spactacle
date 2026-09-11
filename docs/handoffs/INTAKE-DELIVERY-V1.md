> 2026-09-11 本机续验补记：正常系统 Chromium 依赖已安装。`node scripts/test-intake-ui.mjs` 在专用 4175 完成五组组件检查并产出桌面/375px 截图；真实模型也通过了当前提示词的双字段建议浏览器走查。工作台已上线，见 CURRENT、DEPLOYMENT 及 WEEK1-VALIDATION。下文为早前历史记录。

# Intake & delivery v1 — 2026-09-11

## Scope and status

User requested industry research, filled delivery examples, reverse-mapped intake questions and a one-recommendation + three-alternatives + free-input interaction. Modified the existing consultation implementation; did not implement a new 60-field data model or later-week media/export features.

Research artifacts are delivered as conversation attachments: four documents in PDF/Markdown/HTML, 60-question JSON, original SVG functional diagrams, and an implementation receipt. Server reference: `docs/research/intake-delivery-v1/README.md` and its delivery contract and question catalogue. All sample households, amounts, quotations and dimensions are fictional. No interviews conducted; no actual OpenPlan3D export is claimed for the diagrams.

Baseline and final observed HEAD: `388e26a02294643681a947f964d3c319e8b5c478`. Existing untracked Week 1 work was protected. No commit, reset, cleanup, tunnel change or production restart.

## Source changes

- `packages/contracts/ask-question.ts`: current question DTO, single-field conversion, genuinely free discussion for text that cannot safely become a numeric/currency value.
- `apps/api/question-options.ts`: A/B/C/D/E construction, evidence scope filtering, existing proposal adoption ID, scenario-aware recommendations and appended Agent policy.
- `apps/api/questions.ts`: existing 16-field next-question endpoint now returns enriched cards, still at most two questions.
- `apps/api/chat.ts`: adds the recommendation policy to the existing Pi Agent; existing original-quote extraction and suggestion tools retained.
- `apps/web/src/QuestionCard.tsx`, `question-card.css`: no preselection; explicit confirmation; free text; unknown/skipped/not-applicable; preserved draft and visible version conflict; existing proposal adoption uses its original route.
- `apps/web/src/ChatWindow.tsx`, `Workbench.tsx`: connect cards to existing form save/adoption and chat flows; keep dirty cards on refresh and cap the displayed queue at two.
- `tests/intake-v1.test.ts`: six new logic/API tests. Updated the old nursery test to use scoped evidence and the new four-option contract rather than an automatic crib recommendation.
- `scripts/test-intake-ui.mjs`: isolated component test fixture, not a product feature and not connected to production data.

A currently uses a relevant existing Agent proposal when available; otherwise it uses a transparent scenario rule or exploration starting point. B/C/D are bounded field alternatives, not a claim that an LLM freshly generated every option. No basis is invented for fact fields. Arbitrary E text remains discussable even when it cannot be saved as a single amount/dimension/currency.

## Verification

Final `npm run check`: passed.
Final `npm test`: 15 tests, 15 passed, zero failed/skipped (six new intake tests plus nine existing tests). Includes field conversion, missing-fact handling, free numerical discussion detection, no cross-room or unscoped legacy evidence leakage, read-only question generation, proposal identity, explicit per-field persistence, idempotency, version-conflict protection and existing business behavior.
Final `npm run build:web -- --outDir ../../.runtime/intake-v1-web-build`: passed. Non-blocking >500 kB chunk warning remains. Isolated output did not replace deployed assets.
Receipts: `docs/evidence/intake-v1/typecheck.log`, `unit-tests.log`, `build.log`.

Browser component test attempt failed before page creation: Chromium could not load `libXrender.so.1`. No UI assertions or screenshots passed. The prior Week 1 handoff also records execution-environment restrictions; use a normally supported browser environment, not a loader-policy workaround. Actual card interaction, responsive layout, draft behavior in a browser, and the latest prompt against a real model remain unverified in this scope.

Final local health check on 4173 returned `{ "ok": true, "service": "renovation-taskboard" }`. Public cutover was not performed. Ticket 04 and the Week 1 browser gate remain blocked; passing API tests do not complete the UI criteria.

## Resume and rollback

Read CURRENT and the relevant tickets first. In a supported browser environment run the existing Week 1 suites and `node scripts/test-intake-ui.mjs`; then inspect real desktop/mobile screenshots and specifically test free text for numeric fields, proposed-A adoption, room switching and conflict re-confirmation. Only then consider the documented 4173 cutover, preserving `/todo`.

Pre-change comparison copies are under `.runtime/intake-v1-before/`. They predate other concurrent formatting/work and must NOT be copied wholesale over the project. Roll back only this scope's imports/wiring/helper/components/tests, preserving unrelated Week 1 changes. No production rollback is needed because this scope did not replace a live service.
