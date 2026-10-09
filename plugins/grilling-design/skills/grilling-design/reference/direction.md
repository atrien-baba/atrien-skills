# Direction（方向）

Direction is decided before any typographic rule is applied. Applying the floor first produces an average-looking piece; the floor cleans a direction, it does not find one.

## Inherit when a system exists

If the brief names a brand book, a design system, a template, or a piece this one must sit beside, Direction closes by **inheritance**: record the 型 below from that source, decide only what the source leaves open (tables, photo treatment, minimum text size) with a recommendation each, and set one representative page in it. The approver sees that page instead of roughs. References and roughs are skipped unless the maker asks for an alternative. This is the normal case for a page added to an existing catalog or site.

## Otherwise: references, then roughs

**References (one round).** Three the maker admires, from the library first, then outside. For each, grill out what to borrow in observable terms, never as a feeling: image share of the page, number of type sizes, margin width relative to the page, what is loud and what is quiet.

**Roughs (one round).** Two or three roughs **built in code**, same content and size, differing on one declared axis (photo-led / diagram-led / type-led, or dark / light, or dense / sparse), rendered to one comparison image. The maker picks one and may combine（「A をベースに B の写真の大きさ」）. The approver sees this comparison too: it is the cheapest point to reverse a direction.

In both cases the maker then writes the **emphasis sentence** in their own words (after seeing the representative page when inherited):

> 肝は＜何＞なので＜何＞をいちばん大きく。＜何＞は引いて小さく静かに。ただし引く所も細部は丁寧に。

A deliberate second focus is declared here, or the squint test will fail it later. The sentence is the brief for every later round; read it back before building.

## Artifact: `design/direction.md`

```markdown
# 方向：<piece>（YYYY-MM-DD）承認者が見た：○○（YYYY-MM-DD）

## 出どころ
継承：＜ブランド規定／デザインシステム／既存の号＞ ／ または 新規（参考とラフから）

## 参考（新規のとき）
| 参考 | 借りること（数値で） | 借りないこと |
|---|---|---|

## ラフ（新規のとき）
軸：＜写真が主役／図が主役／言葉が主役＞
選んだ案：＜A＞（＜B の○○＞を取り入れる）
画像：rough-a.png, rough-b.png, rough-c.png

## 型（floor_check の基準になる）
書体：和文 ＜名前＞ ／ 欧文 ＜名前＞（上限 2）
文字サイズの段階：11 / 13 / 16 / 22 / 34 px（印刷なら pt も併記）
グリッドと余白の単位：8 px（印刷なら mm）
色：主 / 強調 / 地（値）
和文の字間：0（見出しの例外があれば書く）

## 肝と抜く所
＜一文＞

Revisit if：承認者が異議を出したとき／台割の主役が変わったとき
```
