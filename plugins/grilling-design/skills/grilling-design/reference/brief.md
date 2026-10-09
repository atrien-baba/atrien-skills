# Brief

One round. Fields, in frontier order (ask all that do not depend on each other):

| Field | Why it matters | Typical options |
|---|---|---|
| Reader | sets vocabulary and what counts as proof | the person with the problem / the approver / the engineer who checks specs |
| Scene | sets text amount and whether it must work without a presenter | handed over at a booth / presented alongside / sent as PDF and read alone |
| One action afterwards | sets the hero of the last page | consult / request a demo / decide which variant fits |
| Format | sets grid and export | A4 single, A4 duplex, spread, deck, web section |
| Assets that exist | decides photo-led vs diagram-led before anyone draws | real photos, CAD renders, diagrams, logo, brand values |
| Reviewer and deadline | decides how many rounds fit | one approver / several; date |

When the job starts from someone's impression of an existing piece, open with the Feedback translation (where / what was seen / what is wanted) in this same round.

Skeleton: a box layout in the theme description (see page-data.md). Nothing is rendered yet.

## Artifact: `design/brief.md`

```markdown
# ブリーフ：<piece>（YYYY-MM-DD 確定）

| 項目 | 決めたこと |
|---|---|
| 読み手 | |
| 読まれる場面 | |
| 読後の行動 | |
| 形式 | |
| 素材 | ある：… ／ ない：… ／ 確認中（担当）：… |
| 確認者・期限 | |

## 感想の分解（あれば）
- どこ：
- 見えたこと：
- 期待：
```

Done when every row has a value or a named owner. Record load-bearing choices in `decisions.md` as **Chosen / Rejected / Revisit if**.
