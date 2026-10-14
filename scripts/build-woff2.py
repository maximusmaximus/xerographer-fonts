#!/usr/bin/env python3
"""Build WOFF2 web fonts for every TTF/OTF in fonts/.

Output mirrors the repo layout under web/ (git-ignored), e.g.
  fonts/fancy/comic/funsized/FunSized.ttf -> web/fonts/fancy/comic/funsized/FunSized.woff2

Requires: pip install fonttools brotli
Usage:    python3 scripts/build-woff2.py [--out web] [--only-changed REF]
"""
import argparse, os, subprocess, sys
from concurrent.futures import ProcessPoolExecutor
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def convert(job):
    src, dst = job
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    f = TTFont(src)
    f.flavor = "woff2"
    f.save(dst)
    return os.path.getsize(src), os.path.getsize(dst)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="web")
    ap.add_argument("--only-changed", metavar="REF", help="only fonts changed since this git ref")
    a = ap.parse_args()
    if a.only_changed:
        names = subprocess.check_output(["git", "diff", "--name-only", a.only_changed, "--", "fonts"], cwd=ROOT, text=True).split("\n")
        srcs = [n for n in names if n.lower().endswith((".ttf", ".otf")) and os.path.exists(os.path.join(ROOT, n))]
    else:
        srcs = []
        for d, _, files in os.walk(os.path.join(ROOT, "fonts")):
            for n in files:
                if n.lower().endswith((".ttf", ".otf")):
                    srcs.append(os.path.relpath(os.path.join(d, n), ROOT))
    jobs = [(os.path.join(ROOT, s), os.path.join(ROOT, a.out, os.path.splitext(s)[0] + ".woff2")) for s in sorted(srcs)]
    tin = tout = 0
    with ProcessPoolExecutor() as ex:
        for i, o in ex.map(convert, jobs):
            tin += i; tout += o
    print(f"{len(jobs)} fonts: {tin/1e6:.1f} MB -> {tout/1e6:.1f} MB woff2 in {a.out}/")

if __name__ == "__main__":
    sys.exit(main())
