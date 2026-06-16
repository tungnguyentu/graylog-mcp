# Session Progress Log

## Current State
**Last Updated:** 2026-06-16
**Branch:** `fix/graylog-basic-auth` — **Last commit:** `99102f9`
**Active Feature:** none

## Completed Features

- Added Graylog username/password auth alongside existing API token auth.
- Published scoped package `@tungnguyentu/graylog-mcp-server@1.0.5`.
- Added repo-local npm publish workflow skill for future releases.
- Added MCP client setup docs for Codex, Claude Code, and Antigravity, including the `npx --yes` launch form.

## What's Next

- Commit and push the MCP client documentation update, or continue feature work from this branch.

## Baseline Evidence

- `npm test`
- `node --check src/index.js`
- `node --check src/graylog-auth.js`
- `npm pack --dry-run`
- `npm publish --access public`
- `git diff -- README.md docs/usage.md`

## Architecture Notes

- Auth/env parsing lives in `src/graylog-auth.js` so it can be tested without loading MCP runtime dependencies.
- npm package contents are restricted with the `files` field in `package.json` to avoid publishing local session metadata.

## Known Risks

- Fresh scoped npm publishes can briefly return `404` on registry lookup before propagation finishes.
