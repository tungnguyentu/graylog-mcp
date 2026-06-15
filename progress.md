# Session Progress Log

## Current State
**Last Updated:** 2026-06-15
**Branch:** `fix/graylog-basic-auth` — **Last commit:** `14c7199`
**Active Feature:** none

## Completed Features

- Added Graylog username/password auth alongside existing API token auth.
- Published scoped package `@tungnguyentu/graylog-mcp-server@1.0.5`.
- Added repo-local npm publish workflow skill for future releases.

## What's Next

- Merge `fix/graylog-basic-auth` after review or continue feature work from this branch.

## Baseline Evidence

- `npm test`
- `node --check src/index.js`
- `node --check src/graylog-auth.js`
- `npm pack --dry-run`
- `npm publish --access public`

## Architecture Notes

- Auth/env parsing lives in `src/graylog-auth.js` so it can be tested without loading MCP runtime dependencies.
- npm package contents are restricted with the `files` field in `package.json` to avoid publishing local session metadata.

## Known Risks

- Fresh scoped npm publishes can briefly return `404` on registry lookup before propagation finishes.
