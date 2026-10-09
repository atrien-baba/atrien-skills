# Answer page data (grilling-viz)

Write this JSON yourself; do not read grilling-viz's scripts to learn it. Render with `node <grilling-viz folder>/scripts/render.mjs questions.json out.html` (add `--if-match <sha>` when updating a page the maker may have answered). Then open it in the default browser (Windows `Start-Process out.html`, macOS `open out.html`) and say the path in one line. Only rounds that ask the maker to decide become pages.

```json
{
  "schemaVersion": 1,
  "themes": [
    {
      "id": "brief",
      "name": "1. 企画（ブリーフ）",
      "description": "答えたら［回答をコピー］を押し、このチャットに貼り付けて送ってください。2回目以降はページを再読み込みし、［未回答］で絞り込んでください。\n\n規模は 1ページ として進めます。違えば言ってください。\n骨組み（表）：上から ロゴと見出し ／ 主役（写真か図） ／ 要点3つ ／ 連絡先\n骨組み（裏）：上から 仕様 ／ 導入の流れ ／ 問い合わせ",
      "questions": [
        {
          "id": "b1",
          "title": "誰が、どこで読みますか。",
          "options": [
            { "id": "a", "label": "展示会で手渡され、あとで一人で読む（推奨：説明なしで伝わる作りにすれば営業同行でも使える。ただし1面の量は減る）" },
            { "id": "b", "label": "営業が横で説明しながら使う" },
            { "id": "ask", "label": "担当者に確認する（名前と期日を自由入力に）" }
          ]
        }
      ]
    }
  ]
}
```

Conventions:

- The first line of every theme `description` is the fixed sentence above（コピーして貼る案内）. The page itself only says 「回答をコピーしました」, so this is the only place the maker learns the loop.
- One theme per stage; keep the page and update it in place across the stage's rounds. A Feedback translation round lives in the theme of the stage it reopens. Question IDs change only when a question's meaning changes.
- Each question: 1–4 options plus free text (one option 「自由入力に書く」 when only free text makes sense). Recommended option first, label ending `（推奨：理由。ただし trade-off）`. Where an owner may answer later, the option is `担当者に確認する（名前と期日を自由入力に）`, so the brief can close on a named owner and date rather than a blank.
- The Brief skeleton is a **block list per face** as above. Box characters do not align in the page's proportional font, so do not draw boxes with them; if proportions matter, render a small grayscale PNG and name it.
- From Plan onward, renders live in their own PNG or HTML next to the answer page; options name the file（`案A（rough-a.png）`）. A contact sheet of a current PDF comes from `pdftoppm -r 40 -png` (Poppler) or the PDF viewer's thumbnails, tiled with page numbers.
- Answers come back pasted as `選択：…` / `自由入力：…` lines; record them into the stage artifact before writing the next round.
