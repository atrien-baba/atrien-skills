#!/usr/bin/env node
// Floor check: measures what the eye misses on a rendered page.
//   node floor_check.mjs <page.html|url> [--print] [--sizes 11,13,16,22,34] [--min 9] [--grid 8] [--json]
// --print   A4 portrait viewport (794x1123) and print-size thresholds
// --sizes   agreed type scale in CSS px; sizes outside it are reported
// --min     smallest allowed font size in CSS px (print default 9 ≈ 7pt, web default 12)
// Needs playwright-core resolvable from the current project and a Chrome/Edge on the machine.
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const target = args.find(a => !a.startsWith('--'));
if (!target) { console.error('usage: floor_check.mjs <page.html|url> [--print] [--sizes a,b,c] [--min px] [--grid 8] [--json]'); process.exit(2); }
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const print = args.includes('--print');
const asJson = args.includes('--json');
const scale = (flag('--sizes', '') || '').split(',').map(Number).filter(Boolean);
const minPx = Number(flag('--min', print ? 9 : 12));
const grid = Number(flag('--grid', 8));

let chromium;
try { chromium = createRequire(resolve(process.cwd(), 'package.json'))('playwright-core').chromium; }
catch { try { chromium = createRequire(import.meta.url)('playwright-core').chromium; } catch { console.error('playwright-core not found. Run: npm i -D playwright-core'); process.exit(2); } }

const browsers = process.platform === 'win32'
  ? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']
  : process.platform === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']
    : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
const executablePath = process.env.FLOOR_CHECK_BROWSER || browsers.find(existsSync);
if (!executablePath) { console.error('No Chrome/Edge found. Set FLOOR_CHECK_BROWSER to a browser executable.'); process.exit(2); }

const url = /^https?:/.test(target) ? target : pathToFileURL(isAbsolute(target) ? target : resolve(target)).href;
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: print ? { width: 794, height: 1123 } : { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(800);

const report = await page.evaluate(({ scale, minPx, grid }) => {
  const JA = /[\u3040-\u30ff\u3400-\u9fff]/;
  const fonts = new Map(); const sizes = new Map(); const tracking = []; const breakRisk = []; const offGrid = new Map(); const tiny = [];
  const label = el => (el.id ? `#${el.id}` : el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/)[0]}` : el.tagName.toLowerCase());
  const snippet = t => t.trim().replace(/\s+/g, ' ').slice(0, 24);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.textContent; if (!text.trim()) continue;
    const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue;
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    fonts.set(fam, (fonts.get(fam) || 0) + text.trim().length);
    const px = Math.round(parseFloat(cs.fontSize) * 10) / 10;
    sizes.set(px, (sizes.get(px) || 0) + 1);
    if (px < minPx) tiny.push({ at: label(el), px, text: snippet(text) });
    if (JA.test(text)) {
      const ls = parseFloat(cs.letterSpacing); if (!Number.isNaN(ls) && ls > 0) tracking.push({ at: label(el), letterSpacing: cs.letterSpacing, text: snippet(text) });
      const lang = el.closest('[lang]')?.getAttribute('lang') || '';
      const wb = cs.wordBreak; const lb = cs.lineBreak;
      if (wb !== 'auto-phrase' && wb !== 'keep-all') breakRisk.push({ at: label(el), wordBreak: wb, lineBreak: lb, lang, text: snippet(text) });
    }
  }
  const boxes = Array.from(document.body.querySelectorAll('*')).slice(0, 4000);
  for (const el of boxes) {
    const cs = getComputedStyle(el); if (cs.display === 'none') continue;
    for (const p of ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'rowGap', 'columnGap']) {
      const v = parseFloat(cs[p]); if (!v || Number.isNaN(v)) continue;
      if (Math.abs(v / grid - Math.round(v / grid)) > 0.01) { const k = `${p}:${v}px`; offGrid.set(k, (offGrid.get(k) || 0) + 1); }
    }
  }
  const sizeList = [...sizes.entries()].sort((a, b) => b[1] - a[1]);
  const outOfScale = scale.length ? sizeList.filter(([px]) => !scale.some(s => Math.abs(s - px) < 0.6)) : [];
  return {
    fonts: [...fonts.entries()].sort((a, b) => b[1] - a[1]),
    sizes: sizeList, outOfScale, tracking: tracking.slice(0, 20), breakRisk: breakRisk.slice(0, 20),
    offGrid: [...offGrid.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15), tiny: tiny.slice(0, 20),
    breakRiskTotal: breakRisk.length, trackingTotal: tracking.length, tinyTotal: tiny.length,
  };
}, { scale, minPx, grid });
await browser.close();

const findings = [];
if (report.fonts.length > 2) findings.push(`typefaces: ${report.fonts.length} (${report.fonts.map(([f, n]) => `${f} ${n}字`).join(', ')}); the floor is 2`);
if (report.trackingTotal) findings.push(`tracking on Japanese text: ${report.trackingTotal} elements, e.g. ${report.tracking.slice(0, 3).map(t => `${t.at} ${t.letterSpacing} 「${t.text}」`).join(' / ')}`);
if (report.breakRiskTotal) findings.push(`mid-word break risk (no word-break:auto-phrase/keep-all): ${report.breakRiskTotal} elements, e.g. ${report.breakRisk.slice(0, 3).map(t => `${t.at} 「${t.text}」`).join(' / ')}`);
if (report.outOfScale.length) findings.push(`type sizes outside scale [${scale.join(',')}]: ${report.outOfScale.map(([px, n]) => `${px}px×${n}`).join(', ')}`);
if (report.tinyTotal) findings.push(`text under ${minPx}px: ${report.tinyTotal} elements, e.g. ${report.tiny.slice(0, 3).map(t => `${t.at} ${t.px}px 「${t.text}」`).join(' / ')}`);
if (report.offGrid.length) findings.push(`spacing off the ${grid} grid: ${report.offGrid.slice(0, 6).map(([k, n]) => `${k}×${n}`).join(', ')}`);

if (asJson) console.log(JSON.stringify({ target, print, findings, report }, null, 2));
else {
  console.log(`floor check — ${target}${print ? ' (print, A4)' : ''}`);
  console.log(`typefaces: ${report.fonts.map(([f, n]) => `${f} (${n}字)`).join(', ') || 'none'}`);
  console.log(`type sizes: ${report.sizes.map(([px, n]) => `${px}px×${n}`).join(', ')}`);
  if (findings.length) { console.log(`\n${findings.length} finding(s):`); for (const f of findings) console.log(`- ${f}`); }
  else console.log('\nclean');
}
process.exit(findings.length ? 1 : 0);
