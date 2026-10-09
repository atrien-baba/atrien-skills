# Proof

Build the chosen direction on **one representative spread** first; only when that spread passes, extend to the rest. Fixes made after the whole piece exists ripple into every page.

## Before each round

1. Render at actual size (print: A4 at 96 dpi = 794×1123 CSS px per page, plus a close-up of any area the round is about; web: desktop and phone widths).
2. Run `node scripts/floor_check.mjs <page.html> [--print]` and keep its summary.
3. Place the render **side by side** with the reference or the previous version at the same angle and scale.

## Critique in a fresh context

The session that built the page never grades it. Hand a subagent (or a new session) the render, the comparison, the emphasis sentence and the floor summary, and ask these in order:

| Test | Question | Fails when |
|---|---|---|
| Five-second | After five seconds: what did the eye land on, whose page is it, what should the reader do next? | the answers are not the hero, the brand, the one action |
| Squint | Blurred, does exactly one hero survive? | zero or several |
| Actual size | Is the smallest text, including text inside images, readable at arm's length (print) or on a phone (web)? | anything under the agreed minimum |
| Floor | Does the floor check pass? | any finding |
| Measured | Logos, buttons and photos placed by ratios taken from the reference? | positions were eyeballed |

The critic returns, per test, pass/fail and the **where / what was seen / what is wanted** line for each failure. The builder fixes only those lines.

## Round cap

Two Proof rounds per page. A third round means the problem is upstream: reopen the Plan row or the Direction pick, say so, and do not keep polishing.
