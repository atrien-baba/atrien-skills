#!/usr/bin/env node
// 床チェック：描画したページで、目が見落とす崩れを測る。
//   node floor_check.mjs <page.html|url> [--print | --phone | --width N] [--sizes 11,13,16,22,34]
//                        [--fonts 2] [--min px] [--grid 8|off] [--tracking off] [--json]
// --print     A4 縦（794×1123 CSS px）で描画し、最小文字の既定を 9px（約 7pt）にする
// --phone     幅 390px で描画する（Web のスマホ確認）
// --sizes     direction.md の「型」で決めた文字サイズの段階。外れたサイズを報告する
// --fonts     書体の上限（既定 2。和欧＋等幅なら 3 にする）
// --grid      余白の単位（既定 8。印刷の mm 単位や Tailwind の 4px なら数値を変える。off で測らない）
// --tracking  off で和文の字間を測らない（見出しに字間を使う型のとき）
// 終了コード：0 = 指摘なし、1 = 指摘あり、2 = 実行できなかった（理由を1行で出す）
// 前提：Node、playwright-core（setup_floor_check.ps1 / .sh で ~/.atrien-skills に入る）、Chrome か Edge
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { resolve, isAbsolute, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

const args = process.argv.slice(2);
const VALUED = new Set(['--sizes', '--fonts', '--min', '--grid', '--tracking', '--width']);
const target = args.find((a, i) => !a.startsWith('--') && !VALUED.has(args[i - 1]));
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : d; };
const fail = (msg) => { console.error(`床チェック：未測定（${msg}）`); process.exit(2); };

if (!target) fail('対象のページが指定されていません。使い方: floor_check.mjs <page.html|url> [--print|--phone] [--sizes a,b,c]');
const isUrl = /^https?:/.test(target);
const filePath = isUrl ? null : (isAbsolute(target) ? target : resolve(target));
if (!isUrl && !existsSync(filePath)) fail(`ファイルが見つかりません: ${filePath}`);

const print = args.includes('--print');
const phone = args.includes('--phone');
const asJson = args.includes('--json');
const width = Number(flag('--width', print ? 794 : phone ? 390 : 1280));
const height = print ? 1123 : phone ? 844 : 900;
const scale = String(flag('--sizes', '')).split(',').map(Number).filter(Boolean);
const maxFonts = Number(flag('--fonts', 2));
const minPx = Number(flag('--min', print ? 9 : 12));
const gridArg = flag('--grid', '8');
const grid = gridArg === 'off' ? 0 : Number(gridArg);
const tracking = flag('--tracking', 'on') !== 'off';

// playwright-core の探し方：①実行場所のプロジェクト ②~/.atrien-skills ③このスキルのフォルダ
function loadChromium() {
  const places = [
    join(process.cwd(), 'package.json'),
    join(homedir(), '.atrien-skills', 'package.json'),
    import.meta.url,
  ];
  for (const p of places) {
    try { return createRequire(p)('playwright-core').chromium; } catch { /* next */ }
  }
  return null;
}
const chromium = loadChromium();
if (!chromium) fail('playwright-core がありません。scripts/setup_floor_check.ps1（Windows）または .sh を一度実行してください');

const local = process.env.LOCALAPPDATA || '';
const candidates = process.platform === 'win32'
  ? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
     join(local, 'Google/Chrome/Application/chrome.exe'),
     'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe']
  : process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'];
const executablePath = process.env.FLOOR_CHECK_BROWSER || candidates.find(p => p && existsSync(p));

let browser;
try {
  browser = await chromium.launch(executablePath ? { executablePath } : {});
} catch (e) {
  fail(`ブラウザーを起動できません（Chrome か Edge を入れるか、FLOOR_CHECK_BROWSER に実行ファイルを指定）: ${String(e.message || e).split('\n')[0]}`);
}

let report;
try {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(isUrl ? target : pathToFileURL(filePath).href, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  report = await page.evaluate(({ scale, minPx, grid, tracking }) => {
    const JA = /[\u3040-\u30ff\u3400-\u9fff]/;
    const fonts = new Map(); const sizes = new Map(); const trackingHits = []; const breakRisk = []; const offGrid = new Map(); const tiny = [];
    const label = el => (el.id ? `#${el.id}` : el.className && typeof el.className === 'string' && el.className.trim() ? `.${el.className.trim().split(/\s+/)[0]}` : el.tagName.toLowerCase());
    const snippet = t => t.trim().replace(/\s+/g, ' ').slice(0, 24);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent; if (!text.trim()) continue;
      const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue;
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      fonts.set(fam, (fonts.get(fam) || 0) + text.trim().length);
      const px = Math.round(parseFloat(cs.fontSize) * 10) / 10;
      sizes.set(px, (sizes.get(px) || 0) + 1);
      if (px < minPx) tiny.push({ at: label(el), px, text: snippet(text) });
      if (JA.test(text)) {
        if (tracking) { const ls = parseFloat(cs.letterSpacing); if (!Number.isNaN(ls) && ls > 0) trackingHits.push({ at: label(el), letterSpacing: cs.letterSpacing, text: snippet(text) }); }
        const wb = cs.wordBreak;
        if (wb !== 'auto-phrase' && wb !== 'keep-all') breakRisk.push({ at: label(el), wordBreak: wb, text: snippet(text) });
      }
    }
    if (grid) {
      const boxes = Array.from(document.body.querySelectorAll('*')).slice(0, 4000);
      for (const el of boxes) {
        const cs = getComputedStyle(el); if (cs.display === 'none') continue;
        for (const p of ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'rowGap', 'columnGap']) {
          const v = parseFloat(cs[p]); if (!v || Number.isNaN(v)) continue;
          if (Math.abs(v / grid - Math.round(v / grid)) > 0.01) { const k = `${p}:${v}px`; offGrid.set(k, (offGrid.get(k) || 0) + 1); }
        }
      }
    }
    const sizeList = [...sizes.entries()].sort((a, b) => b[1] - a[1]);
    const outOfScale = scale.length ? sizeList.filter(([px]) => !scale.some(s => Math.abs(s - px) < 0.6)) : [];
    return {
      fonts: [...fonts.entries()].sort((a, b) => b[1] - a[1]), sizes: sizeList, outOfScale,
      tracking: trackingHits.slice(0, 20), trackingTotal: trackingHits.length,
      breakRisk: breakRisk.slice(0, 20), breakRiskTotal: breakRisk.length,
      offGrid: [...offGrid.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15),
      tiny: tiny.slice(0, 20), tinyTotal: tiny.length,
    };
  }, { scale, minPx, grid, tracking });
} catch (e) {
  await browser.close().catch(() => {});
  fail(`ページを測れませんでした: ${String(e.message || e).split('\n')[0]}`);
}
await browser.close();

const findings = [];
const eg = (arr, f) => arr.slice(0, 3).map(f).join(' ／ ');
if (report.fonts.length > maxFonts) findings.push(`書体が ${report.fonts.length} 種類（上限 ${maxFonts}）：${report.fonts.map(([f, n]) => `${f} ${n}字`).join('、')}`);
if (report.trackingTotal) findings.push(`和文に字間：${report.trackingTotal} 箇所。例 ${eg(report.tracking, t => `${t.at} ${t.letterSpacing}「${t.text}」`)}`);
if (report.breakRiskTotal) findings.push(`語の途中で改行するおそれ（word-break が auto-phrase / keep-all でない）：${report.breakRiskTotal} 箇所。例 ${eg(report.breakRisk, t => `${t.at}「${t.text}」`)}`);
if (report.outOfScale.length) findings.push(`決めた文字サイズ [${scale.join(',')}] 以外：${report.outOfScale.map(([px, n]) => `${px}px×${n}`).join('、')}`);
if (report.tinyTotal) findings.push(`${minPx}px 未満の文字：${report.tinyTotal} 箇所。例 ${eg(report.tiny, t => `${t.at} ${t.px}px「${t.text}」`)}`);
if (report.offGrid.length) findings.push(`余白が ${grid} の倍数でない：${report.offGrid.slice(0, 6).map(([k, n]) => `${k}×${n}`).join('、')}`);

const mode = print ? '印刷 A4' : phone ? `スマホ幅 ${width}px` : `幅 ${width}px`;
if (asJson) console.log(JSON.stringify({ target, mode, findings, report }, null, 2));
else {
  console.log(`床チェック（${mode}）— ${target}`);
  console.log(`書体：${report.fonts.map(([f, n]) => `${f}（${n}字）`).join('、') || 'なし'}`);
  console.log(`文字サイズ：${report.sizes.map(([px, n]) => `${px}px×${n}`).join('、')}`);
  if (!scale.length) console.log('文字サイズの段階：未指定（--sizes を付けると段階外を報告）');
  if (findings.length) { console.log(`\n指摘 ${findings.length} 件：`); for (const f of findings) console.log(`- ${f}`); }
  else console.log('\n指摘なし');
}
process.exit(findings.length ? 1 : 0);
