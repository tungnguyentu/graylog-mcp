# Graylog MCP Server

A minimal MCP (Model Context Protocol) server in JavaScript that integrates with Graylog.

## Features

- JavaScript MCP server
- Tools: `fetch_graylog_messages` (query Graylog and return messages)
- Multi-instance support - query multiple Graylog servers from a single MCP server
- Auth support for either API token or username/password per Graylog instance

## Requirements

- Node.js 18+

## Configuration

Configure one or more Graylog instances using numbered env vars:

| Variable | Required | Description |
|---|---|---|
| `GRAYLOG_BASE_URL_INSTANCE_N` | yes | Graylog base URL for instance N |
| `GRAYLOG_API_TOKEN_INSTANCE_N` | conditional | API token for instance N |
| `GRAYLOG_USERNAME_INSTANCE_N` | conditional | Username for instance N |
| `GRAYLOG_PASSWORD_INSTANCE_N` | conditional | Password for instance N |
| `GRAYLOG_LABEL_INSTANCE_N` | no | Human-readable label (default: `instance_N`) |

Replace `N` with `1`, `2`, `3`, ... to register as many instances as needed. Each instance needs `BASE_URL` plus either `API_TOKEN` or `USERNAME` and `PASSWORD`. If both auth modes are present, the API token is used.

## Use with an MCP client

No installation needed - `npx` downloads and runs the server automatically.

### Recommended launch form

Use `npx --yes @tungnguyentu/graylog-mcp-server@latest` instead of a bare `npx` package argument. This avoids a startup failure some MCP clients surface as `calling "initialize": EOF`.

### Codex

Add the server from the CLI:

```bash
codex mcp add graylog-mcp npx --yes @tungnguyentu/graylog-mcp-server@latest \
  -e GRAYLOG_BASE_URL_INSTANCE_1=http://your-graylog-production.example.com:9000 \
  -e GRAYLOG_USERNAME_INSTANCE_1=your_production_user \
  -e GRAYLOG_PASSWORD_INSTANCE_1=your_production_password \
  -e GRAYLOG_LABEL_INSTANCE_1=production
```

Inspect the saved entry with:

```bash
codex mcp get graylog-mcp
```

### Claude Code

Add the server from the CLI:

```bash
claude mcp add graylog-mcp -e GRAYLOG_BASE_URL_INSTANCE_1=http://your-graylog-production.example.com:9000 \
  -e GRAYLOG_USERNAME_INSTANCE_1=your_production_user \
  -e GRAYLOG_PASSWORD_INSTANCE_1=your_production_password \
  -e GRAYLOG_LABEL_INSTANCE_1=production \
  -- npx --yes @tungnguyentu/graylog-mcp-server@latest
```

Or add it manually to `~/.claude.json`:

```json
{
  "mcpServers": {
    "graylog-mcp": {
      "command": "npx",
      "args": ["--yes", "@tungnguyentu/graylog-mcp-server@latest"],
      "env": {
        "GRAYLOG_BASE_URL_INSTANCE_1": "http://your-graylog-production.example.com:9000",
        "GRAYLOG_USERNAME_INSTANCE_1": "your_production_user",
        "GRAYLOG_PASSWORD_INSTANCE_1": "your_production_password",
        "GRAYLOG_LABEL_INSTANCE_1": "production"
      }
    }
  }
}
```

### Antigravity

Antigravity uses the same `mcpServers` JSON shape. Add the server to your Antigravity MCP config or user settings JSON:

```json
{
  "mcpServers": {
    "graylog-mcp": {
      "command": "npx",
      "args": ["--yes", "@tungnguyentu/graylog-mcp-server@latest"],
      "env": {
        "GRAYLOG_BASE_URL_INSTANCE_1": "http://your-graylog-production.example.com:9000",
        "GRAYLOG_USERNAME_INSTANCE_1": "your_production_user",
        "GRAYLOG_PASSWORD_INSTANCE_1": "your_production_password",
        "GRAYLOG_LABEL_INSTANCE_1": "production"
      }
    }
  }
}
```

### Other JSON-based MCP clients

Use the same JSON structure above for clients such as Cursor or Claude Desktop.

Claude Desktop config file locations:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/claude-desktop/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

---

## Use

Once configured, the `fetch_graylog_messages` tool becomes available and will be automatically called when needed. Example prompts:

```
Search for the latest 20 error logs of the example application in the last 15 minutes.
```

```
Search for the latest 20 error logs of the example application in the last 15 minutes.
Query the "staging" Graylog instance.
```

For a compact setup guide with both auth modes, see [docs/usage.md](docs/usage.md).

## Available tools

### fetch_graylog_messages

Fetch messages from Graylog.

Parameters:

- `query` (string, **required**): Search query. Example: `level:ERROR AND service:api`.
- `instance` (string, optional): Label of the Graylog instance to query. Defaults to the first configured instance.
- `searchTimeRangeInSeconds` (number, optional): Relative time range in seconds. Default: `900` (15 minutes).
- `searchCountLimit` (number, optional): Max number of messages. Default: `50`.
- `fields` (string, optional): Comma-separated fields to include. Default: `*` (all fields).

## Troubleshooting

- Ensure at least `GRAYLOG_BASE_URL_INSTANCE_1` and one auth mode are set.
- For username/password auth, set both `GRAYLOG_USERNAME_INSTANCE_N` and `GRAYLOG_PASSWORD_INSTANCE_N`.
- If both auth modes are set for one instance, the API token takes precedence.
- Verify Node.js 18+ is installed.
- Set `DEBUG=true` in the env to enable verbose logging to stderr.

## License

MIT
