#!/usr/bin/env bash
set -euo pipefail

# Get the repo root (works in CI and locally)
REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_DIR="$REPO_ROOT/public"
mkdir -p "$PUBLIC_DIR"

# Read templates.json and build each template
TEMPLATES=$(cat "$REPO_ROOT/templates.json" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for t in data['templates']:
    print(t['slug'] + ' ' + t['repo'])
")

while IFS=' ' read -r SLUG REPO; do
  echo "==> Building $SLUG from $REPO"
  WORK_DIR="/tmp/aumata-demos-$SLUG"

  # Clean up any previous attempt
  rm -rf "$WORK_DIR"

  # Clone the repo (use token auth if GITHUB_TOKEN is set)
  if [ -n "${GITHUB_TOKEN:-}" ]; then
    CLONE_URL="https://$GITHUB_TOKEN@github.com/$REPO.git"
  else
    CLONE_URL="https://github.com/$REPO.git"
  fi
  git clone --depth 1 "$CLONE_URL" "$WORK_DIR" || {
    echo "WARNING: Failed to clone $REPO, skipping"
    continue
  }

  cd "$WORK_DIR"

  # Install dependencies
  npm install --prefer-offline || npm install || {
    echo "WARNING: npm install failed for $SLUG, skipping"
    cd "$REPO_ROOT"
    continue
  }

  # Build with base path set to /{slug}/
  npx astro build --base="/$SLUG/" || {
    echo "WARNING: Build failed for $SLUG, skipping"
    cd "$REPO_ROOT"
    continue
  }

  # Rewrite absolute internal hrefs/srcs to be relative to /$SLUG/
  # Fixes nav links that Astro's --base flag doesn't rewrite automatically
  if [ -d "dist" ]; then
    python3 - "$SLUG" <<'PYEOF'
import sys, os, re
slug = sys.argv[1]
prefix = '/' + slug
pattern = re.compile(
    r'((?:href|src|action)=")(/(?!/)(?!' + re.escape(slug) + r'/)([^"]*))(")'
)
def rewrite(m):
    return m.group(1) + prefix + m.group(2) + m.group(4)
for root, dirs, files in os.walk('dist'):
    for f in files:
        if f.endswith('.html'):
            fpath = os.path.join(root, f)
            with open(fpath, encoding='utf-8') as fp:
                content = fp.read()
            new_content = pattern.sub(rewrite, content)
            if new_content != content:
                with open(fpath, 'w', encoding='utf-8') as fp:
                    fp.write(new_content)
PYEOF
  fi

  # Remove "Buy <Theme>" nav links that point to Lexington's purchase pages
  if [ -d "dist" ]; then
    python3 - <<'PYEOF'
import os, re
buy_pattern = re.compile(
    r'<a\s[^>]*?href="https://(?:lexingtonthemes\.com/templates/|buy\.polar\.sh/)[^"]*"[^>]*>[\s\S]*?</a>',
    re.IGNORECASE
)
for root, dirs, files in os.walk('dist'):
    for f in files:
        if f.endswith('.html'):
            fpath = os.path.join(root, f)
            with open(fpath, encoding='utf-8') as fp:
                content = fp.read()
            new_content = buy_pattern.sub('', content)
            if new_content != content:
                with open(fpath, 'w', encoding='utf-8') as fp:
                    fp.write(new_content)
PYEOF
  fi

  # Copy built output to public/{slug}/
  if [ -d "dist" ]; then
    mkdir -p "$PUBLIC_DIR/$SLUG"
    cp -r dist/. "$PUBLIC_DIR/$SLUG/"
    echo "OK Built $SLUG"
  else
    echo "WARNING: No dist/ output for $SLUG"
  fi

  cd "$REPO_ROOT"
  rm -rf "$WORK_DIR"

done <<< "$TEMPLATES"

echo "Build complete. Templates in public/:"
ls "$PUBLIC_DIR/"
