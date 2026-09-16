# Current — Paper UI extension in progress

Run `new-ui-20260916T132021Z-f802da`; HEAD `5d77da130167e9e7e40a022ad8dd36e1a6a6361a`, all pre-existing dirty source protected in `.runtime/new-ui-20260916T132021Z-f802da/baseline/`.

Target: week1/step3,step4 (03/04), week2/step4 (09), narrow week2/step2 (07) shared UI. User authorized /new-ui and chat/ask-question refactor using uploaded design.md. No geometry or Week3 extension.

Production remains accepted intake-v2 release; prior operational evidence: docs/handoffs/AGENT-INTAKE-V2.md and docs/DEPLOYMENT.md. Current MCP systemctl check cannot reach host systemd; no production change or namespace bypass.

Next: implement paper tokens and same-workbench /new-ui, shared composer/model selection and inline question flow; validate using4175 and dedicated synthetic data, never owner.data. Capture per-run evidence and package only after passing gates. Roll back scoped hunks from baseline, never reset/clean or restore owner DB.
