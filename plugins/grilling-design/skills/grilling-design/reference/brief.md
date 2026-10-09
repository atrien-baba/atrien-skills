# Brief（企画）

One round. Ask what the request leaves open; record what it already states. In a hurry, the three starred rows shape the plan and roughs; everything else may close as 仮置き・要確認（担当・期日）.

| Field | Why it matters | Typical options |
|---|---|---|
| ★ Reader | vocabulary, and what counts as proof | the person with the problem / the approver / the engineer who checks specs / a distributor's end customer |
| Scene | text amount; whether it must work without a presenter | handed over at a booth / presented alongside / sent as PDF and read alone / web: found by search on a phone, linked from an ad, read at a desk |
| ★ One action afterwards | the hero of the last page | consult / request a demo / decide which variant fits / book a meeting |
| Format and production spec | grid, export route, and what the printer or browser will accept | print: trim size, 3 mm bleed, CMYK or profile, image resolution, paper, binding (saddle stitch needs page count ÷ 4), delivery format (PDF/X), data-in date / web: breakpoints to support, contrast ratio, alt text, image weight / deck: aspect ratio, delivery format (pptx, Slides, PDF), fonts available on the presenting machine |
| ★ Assets | photo-led or diagram-led is decided here, before anyone draws | real photos / CAD or 3D renders / diagrams / logo / brand values; for each missing one: who makes it, by when |
| Brand rules | logo clear space, minimum size, forbidden colors; an existing design system or template means Direction closes by inheritance | location of the brand book or design system |
| Copy | who writes headlines and body, who checks numbers and legal, by when; language of the deliverable and who reviews a translation | the maker / the client / a writer |
| Current version | what changes and what stays, page by page | contact sheet of the current PDF or site with keep/change marks |
| Approver and reviewers | one person makes the final call; others review | name the approver; list reviewers |
| Deadline, counted back | data-in or launch date, then the dates for Plan, Direction and Proof; what gets cut if they do not fit | dates |

When the job starts from someone's impression of an existing piece, open with the Feedback translation (where / what was seen / what is wanted) in this same round.

Show: when a current version exists, its contact sheet with keep/change marks drafted by you; otherwise the block list per face in the theme description (page-data.md). For a redesign, draft every row you can from the current piece and the brand guide, list the differences between the two, and ask only the rows that stay open.

## Artifact: `design/brief.md`

```markdown
# 企画：<piece>（YYYY-MM-DD）

| 項目 | 決めたこと | 状態 |
|---|---|---|
| 読み手 | | 確定／仮置き（担当・期日） |
| 読まれる場面 | | |
| 読後の行動 | | |
| 形式・製作仕様 | 判型／塗り足し／色／解像度／紙・綴じ／納品形式／入稿日 ｜ Web：画面幅／コントラスト／alt ｜ スライド：比率／納品形式／フォント | |
| 素材 | ある：… ／ ない：…（誰が・いつまでに） | |
| ブランド規定・既存の型 | 所在、または「なし」 | |
| 原稿 | 書く人／数値・法規の確認／言語と翻訳の確認者 | |
| 現行版 | 変えること／残すこと（ページごと） | |
| 承認者・審査者 | 最終決定：○○ ／ 審査：… | |
| 日程 | 入稿・公開日 → 校正／方向／台割の期日 ／ 入らなければ削るもの | |

## 感想の分解（あれば）
- どこ：
- 見えたこと：
- 期待：
```

Done when every row has a value, a named owner with a date, or a 仮置き label. Load-bearing choices go to `decisions.md` as **Chosen / Rejected / Revisit if / Decided by**. When every answer is 「担当者に確認する」, the brief stays open: draft the questions for that person in one message the maker can forward, proceed to the Plan skeleton on 仮置き values, and build nothing until the answers arrive.
