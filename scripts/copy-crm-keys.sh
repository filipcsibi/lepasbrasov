#!/usr/bin/env bash
# Copies the SalesPartner keys (CRM_*_LEPAS) from another LEPAS Vercel project to this one,
# and into .env.local. Usage: bash scripts/copy-crm-keys.sh [source-project-dir]   (default: ../lepassibiu)
set -euo pipefail

SRC="${1:-../lepassibiu}"
HERE="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$(cd "$HERE/$SRC" && pwd)"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
VARS=(CRM_WEBHOOK_URL_LEPAS CRM_API_KEY_LEPAS CRM_API_SECRET_LEPAS)

echo "Reading production env of $(basename "$SRC")…"
(cd "$SRC" && vercel env pull "$TMP" --environment=production --yes >/dev/null)

cd "$HERE"
[ -f .vercel/project.json ] || vercel link --yes --project lepasbrasov
touch .env.local

for v in "${VARS[@]}"; do
  val="$(grep -E "^$v=" "$TMP" | head -1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//')"
  if [ -z "$val" ]; then
    echo "✗ $v is empty in the source project (Vercel does not return Sensitive variables) — add it by hand." >&2
    exit 1
  fi
  for env in production preview development; do
    vercel env rm "$v" "$env" --yes >/dev/null 2>&1 || true
    printf '%s' "$val" | vercel env add "$v" "$env" >/dev/null
  done
  grep -v "^$v=" .env.local > .env.local.tmp || true
  printf '%s="%s"\n' "$v" "$val" >> .env.local.tmp
  mv .env.local.tmp .env.local
  echo "✓ $v"
done
echo "Done. Redeploy for production to pick the variables up: vercel --prod"
