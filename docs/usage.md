# Graylog MCP Usage

This server exposes one MCP tool, `fetch_graylog_messages`, and supports multiple Graylog instances behind one MCP process.

## Prerequisites

- Node.js 18+
- One or more Graylog base URLs
- For each instance, either:
  - an API token, or
  - a username and password

## Instance Configuration

Each instance is configured with a numbered suffix.

- `GRAYLOG_BASE_URL_INSTANCE_N`
- `GRAYLOG_LABEL_INSTANCE_N`
- `GRAYLOG_API_TOKEN_INSTANCE_N`
- `GRAYLOG_USERNAME_INSTANCE_N`
- `GRAYLOG_PASSWORD_INSTANCE_N`

Rules:

- `GRAYLOG_BASE_URL_INSTANCE_N` is always required.
- Auth can be either token-based or username/password-based.
- If both auth modes are set for the same instance, the API token is used.
- `GRAYLOG_LABEL_INSTANCE_N` is optional. The default label is `instance_N`.

## Example: Username and Password

```bash
GRAYLOG_BASE_URL_INSTANCE_1=http://graylog.example.com:9000
GRAYLOG_USERNAME_INSTANCE_1=your_username
GRAYLOG_PASSWORD_INSTANCE_1=your_password
GRAYLOG_LABEL_INSTANCE_1=production
node src/index.js
```

## Example: API Token

```bash
GRAYLOG_BASE_URL_INSTANCE_1=http://graylog.example.com:9000
GRAYLOG_API_TOKEN_INSTANCE_1=your_api_token
GRAYLOG_LABEL_INSTANCE_1=production
node src/index.js
```

## Example: Two Instances

```bash
GRAYLOG_BASE_URL_INSTANCE_1=http://graylog-prod.example.com:9000
GRAYLOG_USERNAME_INSTANCE_1=prod_user
GRAYLOG_PASSWORD_INSTANCE_1=prod_password
GRAYLOG_LABEL_INSTANCE_1=production

GRAYLOG_BASE_URL_INSTANCE_2=http://graylog-stage.example.com:9000
GRAYLOG_USERNAME_INSTANCE_2=stage_user
GRAYLOG_PASSWORD_INSTANCE_2=stage_password
GRAYLOG_LABEL_INSTANCE_2=staging

node src/index.js
```

## Claude Code

```bash
claude mcp add graylog-mcp npx @lcaliani/graylog-mcp-server@latest \
  -e GRAYLOG_BASE_URL_INSTANCE_1=http://graylog.example.com:9000 \
  -e GRAYLOG_USERNAME_INSTANCE_1=your_username \
  -e GRAYLOG_PASSWORD_INSTANCE_1=your_password \
  -e GRAYLOG_LABEL_INSTANCE_1=production
```

## Cursor / Claude Desktop

Use the JSON examples in [README.md](</Volumes/external/Projects 2/graylog-mcp/README.md:1>). The structure is the same: one MCP server entry plus env vars for each Graylog instance.

## Tool Parameters

`fetch_graylog_messages` accepts:

- `query`: Graylog search query, required
- `instance`: instance label, optional
- `searchTimeRangeInSeconds`: relative search range, optional
- `searchCountLimit`: max number of messages, optional
- `fields`: comma-separated fields to return, optional

## Common Failures

- No instances available: the base URL is set, but no valid auth mode is configured.
- Instance not found: the requested `instance` does not match any configured label.
- Graylog auth error: credentials are wrong or the user/token does not have access.
- Empty results: the query or time range does not match any message.
