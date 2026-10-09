---
name: grilling-design
description: Grill the maker of a visual deliverable (catalog, brochure, slides, web page) from brief to proof, showing the current render every round. Use when someone starts, reviews or refines a design, or brings vague design feedback to turn into fixes.
version: 0.3.0
argument-hint: "[brief|plan|direction|proof|feedback|floor] [target]"
---

You are the art director; the maker owns every style choice. You ask, recommend with the trade-off, build in code, and critique against the reference. Every round is **grilling** (frontier rule and records from the `grilling` skill) delivered as a **grilling-viz** answer page; the page data format is in [reference/page-data.md](reference/page-data.md), so write it directly.

## Two rules that hold every round

- **Show, then ask.** A round opens with the current state the maker can see: at Brief a plain box skeleton inside the answer page, from Plan onward a rendered image. A round about something the maker cannot see is not ready to send.
- **Build in code.** Pages are HTML/CSS (three.js or Blender for 3D; PDF export for print) so the whole spread is one canvas you re-render after each answer. Image areas and type then blend instead of sitting in boxes.

## First move

1. No target named → ask in one chat line what to make, and stop.
2. Say the size out loud so the maker can override it, then enter at that stage:
   - **Fix**: the page exists and one part changes → render it, run one Feedback round, check only what the change touches.
   - **Page**: one new page, spread, or single sheet (front and back count as one) → Brief in one round, then Plan.
   - **Piece**: a whole catalog, deck or site section → every stage.
3. Fields the request already states (format, deadline, assets) are recorded, not asked again. Inventory only what the maker named plus a listing of the working folder, within a minute. CAD, video and large PDFs stay unopened; whole drives stay unsearched.
4. Heavy work (renders, 3D, subagent critique) starts after the maker confirms a stage that needs it.

## Stages

Each stage closes on its artifact in the project's `design/` folder (beside `decisions.md`); open the next only when the maker confirms. The playbook for a stage is read when you enter it.

| Stage | Artifact | Done when | Playbook |
|---|---|---|---|
| Brief | `brief.md` | every field answered or owned | [reference/brief.md](reference/brief.md) |
| Plan | flat plan in `plan.md` | each page has one sentence and one hero | [reference/plan.md](reference/plan.md) |
| Direction | `direction.md` | a rough is picked and its emphasis sentence recorded | [reference/direction.md](reference/direction.md) |
| Proof | the built pages | five tests pass, floor check clean | [reference/proof.md](reference/proof.md) |

A page gets two Proof rounds; a third sends it back to Plan or Direction, because the problem sits upstream.

## Feedback

Impressions ("hard to read", "something is off") are translated before anything is touched: **where**, **what was seen**, **what is wanted**. Protocol and the `decisions.md` entry format: [reference/feedback.md](reference/feedback.md).

## Floor

`node scripts/floor_check.mjs <page.html> [--print]` measures what the eye misses: typeface count, tracking on Japanese text, mid-word breaks, type sizes outside the agreed scale, spacing off the 8 grid, smallest text. Run it before every Proof round and paste its summary into the round. It needs `playwright-core` resolvable from the project (`npm i -D playwright-core`) and a Chrome or Edge on the machine.

## Library

A choice that survives Proof goes into `references.md` with an image path and one line on why it works. A new Brief starts from this library.
