#!/bin/bash
set -e

cd ~/svalla-fresh

# Ta bort eventuell index.lock
rm -f .git/index.lock

# Commita fixes
git add src/app/o/island-data.ts scripts/verify-claims.baseline.json
git commit -m "fix: ta bort klockslag från insider_tips + uppdatera verify-claims baslinje"

# Merga in main så branchen är uppdaterad
git fetch origin main
git merge origin/main --no-edit

# Pusha
git push origin feature/data-restore-aug11

echo "✓ Klart! PR #111 borde nu byggas utan fel."
