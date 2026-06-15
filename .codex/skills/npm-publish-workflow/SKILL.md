---
name: npm-publish-workflow
description: Use when publishing this repo's npm package after feature changes. Runs package verification, dry-run packaging, validates npm auth wiring, and publishes `@tungnguyentu/graylog-mcp-server` without doing version bumps, commits, or pushes.
---

# NPM Publish Workflow

This skill handles npm publishing for this repository only.

## When to Use

- The package code or docs changed and a new npm release is intended.
- The repo already has the correct package name and version in `package.json`.
- The goal is publish only. This skill does not bump versions, edit files, commit, or push.

## Preconditions

- Run from the repo root.
- `package.json` already contains the target version.
- `~/.npmrc` should use `${NPM_TOKEN}` instead of a literal token:

```text
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

- `NPM_TOKEN` must be exported in the login shell.

## Workflow

1. Verify package state:
   - `npm test`
   - `node --check src/index.js`
   - `node --check src/graylog-auth.js`
2. Verify package contents:
   - `npm pack --dry-run`
3. Confirm auth:
   - `npm whoami`
4. Publish:
   - `npm publish --access public`

Use the bundled script for the verification sequence:

```bash
bash .codex/skills/npm-publish-workflow/scripts/publish-package.sh
```

The script stops before publish and tells you whether the package is ready.

## Known Failure Modes

- `EOTP`: token is valid for auth but not allowed to bypass publish-time 2FA.
- `E403`: wrong scope permission or wrong token.
- `404` right after first publish: npm propagation delay can briefly hide the package even after publish succeeds.

## Publish Step

After the script passes, run:

```bash
npm publish --access public
```

If publish succeeds, then handle git commit/push separately.
