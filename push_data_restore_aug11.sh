#!/bin/bash
# push_data_restore_aug11.sh
# Pushar:
#   1. IslandBeach-data (rika strandobj på 8 öar) + bad/page.tsx type guard
#   2. Dag-14 + dag-30 email-mallar i email.ts
#   3. Dag-14 + dag-30 cron-logik i route.ts

set -e

REPO_DIR="$HOME/svalla-fresh"
BRANCH="feature/data-restore-aug11"

echo "════════════════════════════════════════════════════"
echo "SVALLA — IslandBeach + dag-14/30 email (aug 11)"
echo "════════════════════════════════════════════════════"

cd "$REPO_DIR"

git checkout main
git pull origin main

if git show-ref --verify --quiet refs/heads/$BRANCH; then
  git branch -D $BRANCH
fi

git checkout -b $BRANCH

echo "[1/3] Committar ändringar..."
git add \
  "src/app/o/island-data.ts" \
  "src/app/o/[slug]/bad/page.tsx" \
  "src/lib/email.ts" \
  "src/app/api/email/cron/route.ts"

git commit -m "feat: IslandBeach-data på 8 öar + dag-14/dag-30 email-sekvens

- island-data.ts: rika IslandBeach-objekt på sandhamn, utö, vaxholm,
  grinda, finnhamn, möja, fjäderholmarna, dalarö
  (+ activity_meta.bad tillagd på finnhamn, fjäderholmarna, dalarö)
- bad/page.tsx: type guard för string | IslandBeach — renderar rikt
  kort med typ-label, djup, vägbeskrivning, insidertips
- email.ts: dag-14 (Min Skärgård + 3 öar) + dag-30 (återengagemang)
- cron/route.ts: dag-14 (12–16 dagar) + dag-30 (28–32 dagar) cron-logik"

echo "[2/3] Pushar branch..."
git push --force origin $BRANCH

echo "[3/3] Öppnar GitHub för PR..."
COMPARE_URL="https://github.com/tsinordin-cell/svalla-app/compare/$BRANCH"
open "$COMPARE_URL" 2>/dev/null || echo "Skapa PR manuellt: $COMPARE_URL"

echo ""
echo "════════════════════════════════════════════════════"
echo "KLART! 4 filer pushade:"
echo "  island-data.ts    — IslandBeach på 8 öar"
echo "  bad/page.tsx      — rikt strand-kort med type guard"
echo "  email.ts          — dag-14 + dag-30 mallar"
echo "  cron/route.ts     — dag-14 + dag-30 cron-logik"
echo "════════════════════════════════════════════════════"
