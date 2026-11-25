#!/usr/bin/env bash
set -euo pipefail

# Использование: ./push_to_github.sh https://github.com/USERNAME/Backend-Systems-Engineer-Roadmap.git
if [ "${1:-}" = "" ]; then
  echo "Использование: $0 <URL_GITHUB_РЕПОЗИТОРИЯ>"
  exit 1
fi

REMOTE_URL="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d ".git" ]; then
  git init -b main
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "feat: update Backend Systems Engineer roadmap & labs (Core-37)"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git push -u origin main
echo "✅ Отправлено в $REMOTE_URL"
