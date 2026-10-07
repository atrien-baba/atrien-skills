---
name: grilling-design
description: Grill the maker of a visual deliverable (catalog, brochure, slides, web page) through the stages an editorial studio uses, from brief to proof. Use when someone starts or reviews a design, or turns vague design feedback into fixes.
---

Interview the maker relentlessly, stage by stage, the way an editorial studio moves a job from brief to proof. Run every stage as **grilling** rounds: same frontier rule, same records (`grilling` skill). Deliver every round as a **grilling-viz** answer page: invoke the `grilling-viz` skill and follow it for the question data, rendering, updates and checks. Mark your recommendation by ending that option's label with （推奨） and its trade-off; offer 「担当者に確認する」 wherever an owner may answer later. The maker answers in the page and pastes the copied answers back. Keep one page per stage and update it in place across that stage's rounds. Thumbnails and proofs live in their own images or pages; the round's options name them.

The maker owns every style choice. You ask, recommend, and critique; each recommendation names its trade-off. A stage closes on its **artifact**; open the next stage only when the artifact exists and the maker confirms it.

## Stages

1. **Brief**: who reads it, the scene where it is read (handed over at a booth, explained by a salesperson, sent as PDF), the one action the reader takes afterwards, format and page count, the assets that exist (photos, diagrams, their resolution), the reviewer and the deadline. Done when every field has an answer or a named owner.
2. **Flat plan**: one row per page or spread, with its message in one sentence, its single **hero** (the element the eye lands on first), the supporting items, and the assets it uses. Done when every page has one sentence and one hero. A page that needs two sentences becomes two pages, or loses one.
3. **References**: three references the maker admires. For each, grill out what exactly to borrow, in observable terms: share of the page given to the image, number of type sizes, margin width. Ask again whenever the answer is a feeling.
4. **Thumbnails**: two or three small grayscale layouts that differ on one declared axis (image-led, diagram-led, type-led). The maker picks one and states why. Done when the pick and its reason are in `decisions.md`.
5. **Proof**: the maker builds the comp; you critique a rendered image at actual size, always side by side with the previous version or the chosen reference. Run the critique in a fresh context (a subagent, or a new session) so the session that built the page never grades it. Ask, in this order:
   - **Five-second test**: after five seconds, what did the eye land on, whose page is it, and what should the reader do next?
   - **Squint test**: when the page is blurred, does exactly one hero survive?
   - **Actual size**: is the smallest text, including text inside images, readable at arm's length?
   - **Consistency**: how many typefaces appear, is tracking added to Japanese text, does any line break inside a word (`word-break: auto-phrase` with `lang="ja"` fixes most), and do spacing values repeat?

   Done when every question has a passing answer. Give each page two proof rounds at most. A third round sends the page back to its flat-plan row or its thumbnail, because the problem sits upstream.

## Feedback

When anyone answers with an impression ("hard to read", "something is off"), translate it before acting on it: grill the impression into **where** on the page, **what was seen**, and **what was expected**. Put the questions to whoever gave the impression, or to the maker as their proxy. Fix only the translated items. When the job itself starts from feedback, translate it in the first Brief round.

## Library

When a choice works in proof, append it to `references.md` beside the project's `decisions.md`, with a link or image path and one line on why it works. A future brief starts from this library before searching for new references.
