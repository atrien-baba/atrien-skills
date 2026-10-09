#!/usr/bin/env sh
# floor_check の前提を一度だけ用意する（macOS / Linux）。プロジェクトやクライアントの repo には何も入れない。
set -e
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js がありません。先に入れてください（macOS: brew install node）。"; exit 2
fi
dir="$HOME/.atrien-skills"
mkdir -p "$dir"
[ -f "$dir/package.json" ] || printf '{ "name": "atrien-skills-tools", "private": true }\n' > "$dir/package.json"
( cd "$dir" && npm install --no-audit --no-fund playwright-core@1.58.2 )
echo "入りました: $dir/node_modules/playwright-core（ブラウザーは PC の Chrome か Edge を使います）"
