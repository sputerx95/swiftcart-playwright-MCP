# Lessons learned

1. **MCP for exploration, CLI for CI** — Playwright MCP is ideal for walking flows on the live app; GitHub Actions runs standard `npx playwright test`.

2. **Guest checkout vs login** — Swiftcart may allow guest checkout; tests explicitly open `/login` when the app skips redirect.

3. **Cursor terminal vs Terminal.app** — `PLAYWRIGHT_BROWSERS_PATH` from Cursor sandbox breaks local runs; use `env -u PLAYWRIGHT_BROWSERS_PATH` or macOS Terminal.

4. **`--debug` pauses at about:blank** — Click **Resume** in Playwright Inspector; prefer `npm run test:ui` for visual debugging.

5. **Chromium-only in this repo** — Faster CI and clearer case study vs multi-browser matrix in [swiftcart-automation](https://github.com/sputerx95/swiftcart-automation).

6. **Do not commit `.cursor/mcp.json`** — Use `mcp.example.json`; OAuth/API keys stay local.
