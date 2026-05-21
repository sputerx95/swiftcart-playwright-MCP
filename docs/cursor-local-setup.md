# Cursor MCP setup (local only — not in git)

Create `.cursor/mcp.json` on your machine (this folder is **gitignored**):

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp/oauth"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Or copy from template:

```bash
mkdir -p .cursor
cp docs/cursor-mcp.template.json .cursor/mcp.json
```

Enable **playwright** and **context7** in **Cursor → Settings → MCP**.

Optional rules: copy prompts from [docs/prompts-used.md](prompts-used.md) into **Cursor Settings → Rules**, or run `npx ctx7 setup --cursor --mcp --project`.

Do **not** commit `.cursor/mcp.json` if it contains API keys.
