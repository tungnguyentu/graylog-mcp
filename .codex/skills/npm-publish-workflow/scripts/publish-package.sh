#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../" && pwd)"
cd "$ROOT_DIR"

echo "==> package"
node -p 'const pkg=require("./package.json"); `${pkg.name}@${pkg.version}`'

echo "==> npm test"
npm test

echo "==> syntax"
node --check src/index.js
node --check src/graylog-auth.js

echo "==> npm auth"
npm whoami

echo "==> npm pack --dry-run"
npm pack --dry-run

cat <<'EOF'
Verification passed.

Next step:
  npm publish --access public
EOF
