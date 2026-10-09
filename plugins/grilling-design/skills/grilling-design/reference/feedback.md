# Feedback

An impression cannot be fixed; a translated note can. Translate first, act second.

## Translation

For each impression ("見づらい", "なんか変", "もっと派手に"), ask the person who said it, or the maker as their proxy:

| Ask | Example answer |
|---|---|
| **どこ** (where on the page) | P.07 の上半分 |
| **何が見えたか** (what they saw, as observation) | 製品名より先に導入ステップが目に入った |
| **どうしたいか** (what they want to be true) | 製品名が先に目に入ってほしい |

If the person cannot be asked, offer the maker the quickest observation: show the page for five seconds and ask only what they saw first and what they would do next.

Several small notes are collected and handled in one batch rather than one by one.

## Writing the fix request

When handing a fix to a builder (human or AI), send three things together: the translated note, the intent, and the concrete change, plus how much freedom they have and what to keep:

> 右上の画像が小さく中の文字が読めない／製品の動きが一目で伝わってほしい／画像を版面の半分に広げ、中の文字は図の外に出す。配置は任せます。見出しの位置は今のまま。

Avoid sending: 「いい感じに」「本気で」「前の方がよかった」「なんか違う」.

## Artifact: entry in `design/decisions.md`

```markdown
## YYYY-MM-DD <title>
**From**: <who said it> — 「<impression>」 → どこ：… ／ 見えたこと：… ／ 期待：…
**Chosen**: <what changed and why>
**Rejected**: <alternatives and why they lost>
**Revisit if**: <condition that reopens it>
```

For a Fix-size job, one line is enough: `YYYY-MM-DD P.07 ロゴ：ボタン右へ、幅はボタン直径の4倍（写真の比率）`.
