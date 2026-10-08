# atrien-skills

Atrien で使っている Claude Code スキルを、プラグインとして入れられるようにしたものです。

| プラグイン | できること |
|---|---|
| `grilling` | 計画や方針を、推奨案つきの質問を一巡ずつ重ねて詰める |
| `grilling-viz` | grilling の質問を、選択肢と自由入力で回答できる HTML にする |
| `grilling-design` | カタログ・資料・Webページなどの制作を、毎回いまの成果物を見せながら、企画から校正まで段階ごとの質問で詰める。質問は grilling-viz の回答用HTMLで出す |

grilling-viz と grilling-design は grilling の質問の組み立て方を前提にしているので、grilling と一緒に入れてください。grilling-design は質問を grilling-viz で表示するので、3つとも入れてください。

## 入れ方

Claude Code で次を実行します。

```
/plugin marketplace add https://github.com/atrien-baba/atrien-skills.git
/plugin install grilling@atrien-skills
/plugin install grilling-viz@atrien-skills
/plugin install grilling-design@atrien-skills
```

`atrien-baba/atrien-skills` という短い書き方でも追加できますが、GitHub の SSH 鍵を設定していない PC では失敗するため、上の HTTPS の URL を使ってください。

grilling-viz の HTML 生成には Node.js が必要です。

## 出典とライセンス

どちらも MIT ライセンスの公開スキルを元にしています。各プラグインのフォルダに元の LICENSE を同梱しています。

| プラグイン | 元にしたもの | 変更点 |
|---|---|---|
| `grilling` | [mattpocock/skills](https://github.com/mattpocock/skills) `3cca18b` | 記録の書き方の節を追加。個人環境向けの記述を一般化 |
| `grilling-viz` | [mathbullet/skills](https://github.com/mathbullet/skills) `5ab997f` | なし（そのまま同梱） |

元リポジトリが更新されても自動では追従しません。

`grilling-design` は Atrien の自作です（MIT）。
