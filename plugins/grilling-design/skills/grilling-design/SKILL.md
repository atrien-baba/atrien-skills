---
name: grilling-design
description: Grill the maker of a visual deliverable (catalog, brochure, slides, web page) from brief to proof, showing the current render every round. Use when someone starts, reviews or refines a design, or brings vague design feedback to turn into fixes.
argument-hint: "[brief|plan|direction|rough|proof|feedback] [target]"
---

Interview the maker relentlessly, the way an art director moves a job from brief to proof. The maker owns every style choice; you ask, recommend with the trade-off, build, and critique. Run every round as **grilling** (frontier rule and records from the `grilling` skill) and deliver it as a **grilling-viz** answer page (invoke `grilling-viz`; follow it for data, rendering, updates and checks). Mark your recommendation by ending that option's label with （推奨） and its trade-off; offer 「担当者に確認する」 wherever an owner may answer later. Keep one page per stage and update it in place.

**Show, then ask.** Every round opens with the current state as an image: at Brief, the inventory of what exists and an empty skeleton of the format; from Plan onward, the flat plan, the roughs, the page. Put renders in their own image or page and let the round's options name them. A round that asks about something the maker cannot see is not ready to send.

**Build in code.** Lay pages out as HTML/CSS (three.js or Blender for 3D, export to PDF for print) so the whole spread is one canvas you can re-render after every answer. Image areas and type then blend instead of sitting in boxes.

## Size the job first

Before the first question, say which size this is so the maker can override it, then enter at that stage:

- **Fix**: the page already exists and one part needs changing → render the current page first, then run one Feedback round only. Proof checks only what the change touches, and `decisions.md` gets one line.
- **Page**: one new page, spread, or single sheet front and back → Brief in one round, then Plan.
- **Piece**: a whole catalog, brochure, deck or site section → every stage.

Facts are your job: before asking, inventory what exists (current pages, photos, logos, CAD, brand values, the site) and show the list.

## Stages

Each stage closes on its artifact, saved beside the project's `decisions.md` (create a `design/` folder in the working directory when the project has none); open the next only when the maker confirms it.

1. **Brief** → `brief.md`: reader, the scene where it is read (handed over, presented, sent as PDF), the one action afterwards, format, assets that exist, reviewer, deadline. Done when every field has an answer or a named owner.
2. **Plan** (flat plan): one row per page with its message in one sentence, its single **hero**, and its assets, rendered as small page skeletons. Done when every page has one sentence and one hero; a page needing two sentences splits or cuts.
3. **Direction** → `direction.md`: three references with what exactly to borrow (image share of the page, number of type sizes, margins); then two or three roughs in code that differ on one declared axis (photo-led, diagram-led, type-led). The maker picks one and writes the **emphasis and rest** in one sentence: what is loud, what stays quiet, and that the quiet parts are still finished with care. Done when the pick and that sentence are recorded.
4. **Proof**: build the chosen direction on one representative spread first, then the rest. Critique the render in a fresh context (a subagent or new session), side by side with the reference or previous version, including close-ups at the same angle. Ask, in order:
   - **Five-second test**: what did the eye land on, whose page is it, what next?
   - **Squint test**: blurred, does exactly one hero survive?
   - **Actual size**: is the smallest text, including text inside images, readable?
   - **Floor**: at most two typefaces, no tracking on Japanese text, no line break inside a word (`word-break: auto-phrase` with `lang="ja"`), only the agreed type sizes, spacing on an 8 grid.
   - **Measured, not eyeballed**: positions and sizes of logos, buttons and photos taken as ratios from the reference.

   Done when every question passes. Give a page two proof rounds; a third sends it back to Plan or Direction, because the problem sits upstream.

## Feedback

When anyone answers with an impression ("hard to read", "something is off", "make it pop"), translate it before acting: grill it into **where** on the page, **what was seen**, and **what is wanted**, asking whoever gave it or the maker as proxy. Collect small notes and handle them in one batch. Fix only translated items, and record what changed in `decisions.md`.

## Library

When a choice works in proof, append it to `references.md` with an image path and one line on why it works. A new brief starts from this library before searching for fresh references.
