# atrien-skills

Atrien で使っている Claude Code スキルを、プラグインとして入れられるようにしたものです。

| プラグイン | できること |
|---|---|
| `grilling` | 計画や方針を、推奨案つきの質問を一巡ずつ重ねて詰める |
| `grilling-viz` | grilling の質問を、選択肢と自由入力で回答できる HTML にする |
| `grilling-design` | デザイン制作を、毎回いまの成果物を見せながら、企画・台割・方向・校正・納品の段階ごとの質問で詰める。段階ごとの手引き（reference/）と、書体・字間・改行・余白を測る `scripts/floor_check.mjs` を同梱 |

grilling-viz と grilling-design は grilling の質問の組み立て方を前提にしているので、grilling と一緒に入れてください。grilling-design は質問を grilling-viz で表示するので、3つとも入れてください。

## 入れ方

**初めての方**（Claude Code のチャット欄に1行ずつ）

```
/plugin marketplace add https://github.com/atrien-baba/atrien-skills.git
/plugin install grilling@atrien-skills
/plugin install grilling-viz@atrien-skills
/plugin install grilling-design@atrien-skills
```

**すでに atrien-skills を追加している方**は、先に更新してから入れます。

```
/plugin marketplace update atrien-skills
/plugin install grilling-design@atrien-skills
```

入れたあとは `/reload-plugins` を実行するか、Claude Code を開き直すと使えます。`claude plugin list` に `grilling-design@atrien-skills` が出ていれば完了です。

- `atrien-baba/atrien-skills` という短い書き方は、GitHub の SSH 鍵を設定していない PC で失敗します。上の https の URL を使ってください。
- grilling-viz を `mathbullet/skills` から入れてある場合は、そのままで構いません（同じものです）。両方入れると同名のプラグインが2つになります。
- Claude アプリの「ワーク」では、「カスタマイズ」→「プラグイン」→「追加」→「マーケットプレイスを追加」で同じ URL を登録し、一覧から入れます。

**前提**

- grilling-viz の HTML 生成と grilling-design の floor_check には Node.js が要ります（Windows: `winget install OpenJS.NodeJS.LTS`。入れたら VS Code を開き直す）。
- floor_check はさらに、一度だけ `scripts/setup_floor_check.ps1`（Windows）か `.sh`（macOS/Linux）を実行して `~/.atrien-skills` に playwright-core を入れ、PC に Chrome か Edge があれば動きます。プロジェクトや客先の repo には何も入れません。

## 使い方

チャット欄で作りたいものを一言伝えてから `/grilling-design` と入力します（Claude Code では `/grilling-design:grilling-design` と出ます）。

例：「会社案内の P.3 を作り直したい」→ `/grilling-design`

最初に、仕事の大きさ（直し／1ページ／一式）の見立てと、答える用の HTML ページが出ます。ページで答えて［回答をコピー］を押し、チャットに貼り付けて送ると次に進みます。

## 出典とライセンス

どちらも MIT ライセンスの公開スキルを元にしています。各プラグインのフォルダに元の LICENSE を同梱しています。

| プラグイン | 元にしたもの | 変更点 |
|---|---|---|
| `grilling` | [mattpocock/skills](https://github.com/mattpocock/skills) `3cca18b` | 記録の書き方の節を追加。個人環境向けの記述を一般化 |
| `grilling-viz` | [mathbullet/skills](https://github.com/mathbullet/skills) `5ab997f` | なし（そのまま同梱） |

元リポジトリが更新されても自動では追従しません。

`grilling-design` は Atrien の自作です（MIT）。
