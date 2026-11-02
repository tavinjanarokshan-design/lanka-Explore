#!/usr/bin/env python3
"""Replace the current student name and GitHub username throughout this submission."""
import sys
from pathlib import Path

if len(sys.argv) < 2:
    print('Usage: python3 set-name.py "Rukshan Udugamasooriya" [ROKSHAN TAVINJANA UDUGAMASOORIYA]')
    raise SystemExit(1)

new_name = sys.argv[1]
new_user = sys.argv[2] if len(sys.argv) > 2 else 'lanka-Explore'
root = Path(__file__).resolve().parent
text_suffixes = {'.html', '.css', '.js', '.json', '.md', '.txt', '.yml', '.yaml', '.sh', '.py', '.svg'}
skip_files = {'set-name.py', 'CHANGE-NAME.md', 'CHANGE-NAME-SINHALA.md'}
old_names = ['Your Name', 'Lanka Explorer Student', 'ROKSHAN TAVINJANA']
old_users = ['YOUR-USERNAME', 'lanka-Explore']
changed = 0

for path in root.rglob('*'):
    if not path.is_file() or '.git' in path.parts or path.name in skip_files:
        continue
    if path.suffix.lower() not in text_suffixes:
        continue
    try:
        original = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    updated = original
    for old in old_names:
        updated = updated.replace(old, new_name)
    for old in old_users:
        updated = updated.replace(old, new_user)
    if updated != original:
        path.write_text(updated, encoding='utf-8')
        changed += 1
        print('updated', path.relative_to(root))

print(f'Updated {changed} files. Re-zip the submission folder afterwards.')
print('Remember to add your student ID in STUDENT-DETAILS.txt if required.')
