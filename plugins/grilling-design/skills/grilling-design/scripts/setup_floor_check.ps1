# floor_check の前提を一度だけ用意する（Windows）。プロジェクトやクライアントの repo には何も入れない。
# 実行: powershell -ExecutionPolicy Bypass -File setup_floor_check.ps1
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host 'Node.js がありません。先に  winget install OpenJS.NodeJS.LTS  を実行し、VS Code を開き直してください。'
  exit 2
}
$dir = Join-Path $HOME '.atrien-skills'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
if (-not (Test-Path (Join-Path $dir 'package.json'))) {
  Set-Content -Path (Join-Path $dir 'package.json') -Value '{ "name": "atrien-skills-tools", "private": true }' -Encoding UTF8
}
Push-Location $dir
try { npm install --no-audit --no-fund playwright-core@1.58.2 } finally { Pop-Location }
Write-Host "入りました: $dir\node_modules\playwright-core（ブラウザーは PC の Chrome か Edge を使います）"
