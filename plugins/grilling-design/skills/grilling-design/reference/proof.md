# Proof（校正）

Build the chosen direction on **one representative spread** first; only when it passes, extend to the rest. Fixes made after the whole piece exists ripple into every page.

## Before each round

1. Render at actual size in the medium's own terms: print at A4 scale (794×1123 CSS px per page), and when possible print the page on paper; web at desktop and phone widths, and look at it on a phone; deck on the screen it will be shown on. Add a close-up of any area the round is about.
2. Run the floor check with the 型 from `direction.md`（`--sizes`, `--fonts`, `--grid`）and keep its summary; if it cannot run, write 「床チェック：未測定（理由）」.
3. Place the render **side by side** with the reference or the previous version at the same angle and scale.

## Critique in a fresh context

The session that built the page never grades it (a Fix-size job may use a short self-check instead). Hand a subagent or a new session the render, the comparison, the emphasis sentence, the plan row and the floor summary, and ask these in order:

| Test | Question | Fails when |
|---|---|---|
| Five-second | After five seconds: what did the eye land on, whose page is it, what should the reader do next? | the answers are not the hero, the brand, the one action |
| Squint | Reduced to 25% and blurred (or seen from 3 m), does exactly one hero survive? | zero or several, unless a second focus is declared in the emphasis sentence |
| Actual size | Is the smallest text, including text inside images, at or above the minimum the brief set, at arm's length (print) or on a phone (web)? | anything smaller |
| Content | Does the page say its plan row's sentence? No 仮画像, typos, wrong numbers or units? | any |
| Alignment and consistency | Elements on the grid; running elements (folios, logos, headers) in the same place on every page; the same spacing values repeated? | drift |
| Production | Does it meet the brief's spec: bleed and CMYK for print, breakpoints and contrast for web, aspect ratio and fonts for a deck? | any miss |

The critic returns, per test, pass/fail and the **where / what was seen / what is wanted** line for each failure, in the maker's language. The builder fixes only those lines.

## Two kinds of rounds

- **Composition rounds** (five-second or squint failed): two per page. A third means the problem is upstream. Plan row lists two heroes → reopen Plan; one hero but the page is flat → reopen Direction. Say which and why; after the upstream fix, counting restarts.
- **Correction rounds**（赤字：text, photo swaps, numbers）: not counted. Keep a numbered list（番号・内容・対応／見送りの理由）and return it with each round.

## Approver sign-off and handoff

The approver signs the final proof (name, date) in `handoff.md`. Then write the deliverables:

```markdown
# 納品：<piece>（YYYY-MM-DD）承認：○○
| 納品物 | 形式 | 版 | 置き場所 |
|---|---|---|---|
| 入稿データ | PDF/X-1a, CMYK, 塗り足し 3 mm | v3 | … |
| 編集用 | HTML/CSS（または pptx） | v3 | … |
残った仮置き・次版送り：…
```
