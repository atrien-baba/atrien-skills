# Feedback

An impression cannot be fixed; a translated note can. Translate first, act second.

## Running a review

- Decide the medium first: a print piece is reviewed on paper, a web page on a phone and a desktop, a deck on the screen it will use.
- Open by naming what is **approved and not up for change** (the keep list), so the review spends itself on what is open.
- A reviewer who is not the approver gives notes; the approver decides when notes conflict. Record **Decided by**.
- A request that changes what a page says is a Plan change, not a correction: reopen the row, do not patch the layout.

## Translation

For each impression（「見づらい」「なんか変」「安っぽい」「もっと派手に」）, ask the person who said it, or the maker as their proxy:

| Ask | Example answer |
|---|---|
| **どこ** (where on the page) | P.07 の上半分 |
| **何が見えたか** (what they saw, as observation) | 製品名より先に導入ステップが目に入った |
| **どうしたいか** (what they want to be true) | 製品名が先に目に入ってほしい |
| **優先度** | 校了までに必須 ／ できれば ／ 次版 |

For adjectives（安っぽい、古い、重い）, offer cause candidates as options instead of asking the person to introspect: too many typefaces or colors, low-resolution or stretched photos, cramped margins, shadows and gradients, misalignment. Or show two or three variants and let them point; comparison beats introspection. The floor check gives the objective part of 「安っぽい」.

If the person cannot be asked, the quickest observation is the five-second test with a third person; the maker's own eye is already trained on the page.

Several small notes are collected and handled in one batch.

## Writing the fix request

When handing a fix to a builder (human or AI), send three things together: the translated note, the intent, and the concrete change, plus how much freedom they have and what to keep:

> 右上の画像が小さく中の文字が読めない／製品の動きが一目で伝わってほしい／画像を版面の半分に広げ、中の文字は図の外に出す。配置は任せます。見出しの位置は今のまま。

Avoid sending: 「いい感じに」「本気で」「前の方がよかった」「なんか違う」.

## Artifact: entry in `design/decisions.md`

```markdown
## YYYY-MM-DD <title>
**From**: <who> — 「<impression>」 → どこ：… ／ 見えたこと：… ／ 期待：… ／ 優先度：必須
**Keep**: <what stays>
**Chosen**: <what changed and why>
**Rejected**: <alternatives and why they lost>
**Decided by**: <approver>
**Revisit if**: <condition that reopens it>
```

For a Fix-size job one line is enough: `YYYY-MM-DD P.07 ロゴ：ボタン右へ、幅はボタン直径の4倍（写真の比率）— 決定：○○`.
