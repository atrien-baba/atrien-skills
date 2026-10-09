# Answer page data (grilling-viz)

Write this JSON yourself; do not read grilling-viz's scripts to learn it. Render with the command grilling-viz's SKILL.md gives (`node <grilling-viz>/scripts/render.mjs questions.json out.html`, and `--if-match <sha>` when updating a page the maker may have answered).

```json
{
  "schemaVersion": 1,
  "themes": [
    {
      "id": "brief",
      "name": "1. ブリーフ",
      "description": "いま分かっていること、見せたい骨組み、この回で決めることを 2〜4 行で。",
      "questions": [
        {
          "id": "b1",
          "title": "誰が、どこで読みますか。",
          "options": [
            { "id": "a", "label": "展示会で手渡され、あとで一人で読む（推奨：説明なしで伝わる作りにすれば営業同行でも使える。ただし1ページの量は減る）" },
            { "id": "b", "label": "営業が横で説明しながら使う" },
            { "id": "ask", "label": "担当者に確認する" }
          ]
        }
      ]
    }
  ]
}
```

Conventions:

- One theme per stage; keep the page and update it in place across the stage's rounds. Question IDs change only when a question's meaning changes.
- Each question: 2–4 options, free text is always available. Put the recommended option first, end its label with `（推奨：理由。ただし trade-off）`, and add `担当者に確認する` wherever an owner may answer later.
- A theme's `description` is the only place for the skeleton at Brief: draw it with box characters, e.g.

  ```
  ┌──────────────┐
  │ ロゴ／見出し     │
  │ 主役（写真か図）  │
  │ 要点3つ          │
  │ 連絡先           │
  └──────────────┘
  ```

- From Plan onward, renders live in their own PNG or HTML next to the answer page; options name the file (`案A（rough-a.png）`).
- Answers come back pasted into chat as `選択：…` / `自由入力：…` lines; record them into the stage artifact before writing the next round.
