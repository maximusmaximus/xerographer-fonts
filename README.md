# Xerographer Fonts

Original typefaces by **Max Infeld**. This repository is the font library: every face, and every variation that ships with it, in one place that can be updated and extended.

**Copyright © Max Infeld.** All rights reserved.

Personal use is donationware. Commercial use is not included — write to [maxinfeld@gmail.com](mailto:maxinfeld@gmail.com).

## The library

| | |
| --- | --- |
| Typefaces | 1,376 |
| Font files | 1,516 |
| Faces with more than one file | 46 |
| DaFont downloads | 44,200,610 |
| FontSpace downloads | 924,199 |
| WebFontFree downloads | 466,709 |
| Listed downloads | 45,591,518 |

Drawn since 2012: eroded, cartoon, script, horror, stencil, and the rest of the photocopy cabinet.

- **Basic** — 6
- **Dingbats** — 8
- **Fancy** — 958
- **Foreign look** — 4
- **Gothic** — 7
- **Holiday** — 10
- **Script** — 357
- **Techno** — 26

The full list, with a link back to every face on the catalog, is in [FONTS.md](FONTS.md). Machine-readable metadata is in [catalog.json](catalog.json). Each folder also has a `font.json`.

## On the catalog

Every face has a page on the Xerographer Fonts catalog, where you can set type, share a composition, and license commercial use:

- Catalog: https://fonts.grok.me
- A face: https://fonts.grok.me/font/funsized
- Every face: [FONTS.md](FONTS.md)

## Sources

The same library is listed, in whole or in part, on:

- [DaFont](https://www.dafont.com/max-infeld.d3584) — Canonical personal downloads. 1,376 faces.
- [FontSpace](https://www.fontspace.com/xerographer-fonts) — 184 faces.
- [BlogFonts](https://blogfonts.com/user/424.htm) — 315 faces.
- [WebFontFree](https://www.webfontfree.com/en/designers/859) — 64 faces.
- [Hey Fonts](https://www.heyfonts.com/designer/max-infeld-xerographer-fonts/) — 28 faces.
- [FFonts](https://www.ffonts.net/tag/infeld) — Linked on every face.
- [Fonts2u](https://fonts2u.com/search.html?q=xerographer) — Linked on every face.
- [FontGet](https://www.fontget.com/?s=xerographer) — Linked on every face.
- [WhatFontIs](https://www.whatfontis.com/) — Linked on every face.
- [1001 Free Fonts](https://www.1001freefonts.com/designer-xerographer-fonts-fontlisting.php) — Designer listing.
- [Designer](https://maxi.grok.me) — Max Infeld.

Files in this repository are the designer’s own copies of those releases, including alternate cuts when the original zip had more than one font file.

## Copyright

These typefaces and font files are **Copyright © Max Infeld** (Xerographer Fonts).

Max Infeld publishes them here. You may download them for **personal, non-commercial** use. A donation is appreciated and not required.

You may **not**:

- sell, sublicense, or redistribute the font files (as fonts, as a pack, on a marketplace, or as a competing listing)
- modify, convert, reverse-engineer, or create derivative typefaces

without prior written permission from Max Infeld.

## Commercial licensing

Unlimited commercial use — embedding in documents, sites, apps, video, merchandise, and other commercial work, without a further royalty — is a separate license:

- **US$95** per typeface, one licensee
- **US$65,000** for the entire catalog, one licensee

Contact **[maxinfeld@gmail.com](mailto:maxinfeld@gmail.com)**, or license on the catalog at https://fonts.grok.me.

One license is personal to one human or one agent. It is not transferable. It does not include the right to resell the font files or to make derivative fonts.

## Updating or extending the library

A typeface is a folder:

```
fonts/<category>/<subcategory>/<slug>/
  FontName.ttf
  FontName-Bold.ttf
  font.json
```

To add a variation, put the new `.ttf` / `.otf` / `.woff` in that folder and add it to the `files` array in `font.json`.

To add a typeface, create a new folder and a `font.json` with `name`, `slug`, `category`, `subcategory`, `files`, and `catalog` (`https://fonts.grok.me/font/<slug>`).

Then rebuild the index:

```
node scripts/rebuild-index.mjs
```

That rewrites `catalog.json` and `FONTS.md` from the `font.json` files. Do not edit those two by hand.
