#!/usr/bin/env bash
set -euo pipefail

USERNAME="${1:-tavinjanarokshan-design}"
REPO_NAME="${2:-lanka-explorer}"
STUDENT_NAME="${3:-ROKSHAN TAVINJANA}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/.." && pwd)/lanka-explorer-git"

echo "Preparing $REPO ..."
rm -rf "$REPO"
mkdir -p "$REPO"
git -C "$REPO" init -b main >/dev/null
git -C "$REPO" config user.name "$STUDENT_NAME"
git -C "$REPO" config user.email "student@example.com"

commit_week() {
  local week="$1"
  local message="$2"
  find "$REPO" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  cp -a "$HERE/Week${week}/." "$REPO/"
  git -C "$REPO" add -A
  git -C "$REPO" commit -m "$message" >/dev/null
  echo "  ✓ $message"
}

commit_week 01 "Week 01: semantic HTML skeleton and destinations data"
commit_week 02 "Week 02: responsive CSS theme and mobile menu"
commit_week 03 "Week 03: dynamic cards, filters and form validation"
commit_week 04 "Week 04: weather, currency and map APIs"
commit_week 05 "Week 05: trip planner, dark mode and final polish"

git -C "$REPO" remote add origin "https://github.com/${USERNAME}/${REPO_NAME}.git" 2>/dev/null || \
  git -C "$REPO" remote set-url origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
git -C "$REPO" branch -M main

echo
git -C "$REPO" --no-pager log --oneline --decorate
echo
echo "Next: create the public repository on GitHub, then run:"
echo "  git -C \"$REPO\" push -u origin main"
