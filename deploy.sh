#!/usr/bin/env bash
# deploy.sh — commit + push allt till main och trigga Netlify-deploy.
# Kör: bash deploy.sh
#
# Detta gör:
#   1. Rensar ev. zombie-lock
#   2. Lägger till alla ändringar
#   3. Commit med auto-genererat meddelande
#   4. Push till origin/main (triggar Netlify-deploy automatiskt)
#
# Observera: kör från /svalla-app/ eller roten av repot.

set -e  # avbryt vid fel

# Gå till scriptets katalog
cd "$(dirname "$0")"

echo "→ Rensar ev. git lock…"
rm -f .git/index.lock .git/refs/heads/main.lock 2>/dev/null || true

echo "→ Status:"
git status --short

CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
if [ "$CHANGES" = "0" ]; then
  echo "Inget att committa. Kör bara push…"
  git push origin main
  echo "✓ Klart. Netlify kollar main."
  exit 0
fi

# Skapa commit-meddelande — tidsstämpel + kort sammanfattning
TS=$(date '+%Y-%m-%d %H:%M')
MSG="${1:-fix: Netlify build-fel + Svalla Wrapped + utökad sök ($TS)}"

echo "→ Commit: $MSG"
git add -A
git commit -m "$MSG"

echo "→ Push till origin/main…"
git push origin main

echo ""
echo "✓ Deploy pushad. Netlify bygger nu."
echo "  Följ bygget: https://app.netlify.com/projects/bucolic-gumdrop-7933c3/deploys"
