#!/bin/bash
# push_b2b_dag3_aug11.sh
# Pushar B2B-CTA + dag-3-mail från ~/svalla-fresh (ren klon, inga iCloud-problem)
#
# Filer:
#   src/components/IslandB2BCTA.tsx          (ny komponent)
#   src/app/o/[slug]/page.tsx                (import + render av B2B CTA)
#   src/lib/email.ts                         (day3_newsletter-mall)
#   src/app/api/email/cron/route.ts          (dag-3 cron-logik)

set -e

REPO_DIR="$HOME/svalla-fresh"
BRANCH="feature/b2b-cta-dag3-email-aug11"

echo "════════════════════════════════════════════════════"
echo "SVALLA — B2B CTA + DAG-3 MAIL (aug 11, ren klon)"
echo "════════════════════════════════════════════════════"

cd "$REPO_DIR"

# Säkerställ att vi är på senaste main
git checkout main
git pull origin main

# Ta bort branchen om den redan finns lokalt
if git show-ref --verify --quiet refs/heads/$BRANCH; then
  git branch -D $BRANCH
fi

git checkout -b $BRANCH

echo "[1/3] Committar ändringar..."
git add \
  "src/components/IslandB2BCTA.tsx" \
  "src/app/o/[slug]/page.tsx" \
  "src/lib/email.ts" \
  "src/app/api/email/cron/route.ts"

git commit -m "feat: B2B-CTA på öprofiler + dag-3 Thorkel-mail"

echo "[2/3] Pushar branch..."
git push --force origin $BRANCH

echo "[3/3] Öppnar GitHub för att skapa PR..."
COMPARE_URL="https://github.com/tsinordin-cell/svalla-app/compare/$BRANCH"
open "$COMPARE_URL" 2>/dev/null || echo "Skapa PR manuellt: $COMPARE_URL"

echo ""
echo "════════════════════════════════════════════════════"
echo "KLART! 4 filer pushade från ren git-klon:"
echo "  IslandB2BCTA.tsx   — ny komponent"
echo "  o/[slug]/page.tsx  — rätt main-version + B2B CTA"
echo "  email.ts           — dag-3 Thorkel-mall"
echo "  cron/route.ts      — dag-3 cron-logik (null-säker)"
echo "════════════════════════════════════════════════════"
