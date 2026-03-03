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

  # Clone the repo
  git clone --depth 1 "https://github.com/$REPO.git" "$WORK_DIR" || {
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
