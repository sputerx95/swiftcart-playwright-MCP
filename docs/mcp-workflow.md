# Playwright MCP workflow

## Setup

1. Follow [cursor-local-setup.md](cursor-local-setup.md) — create `.cursor/mcp.json` locally (gitignored).
2. In **Cursor → Settings → MCP**, enable **playwright** and **context7**.
3. Optional: `npx ctx7 setup --cursor --mcp --project -y` for OAuth Context7.

## Flow (test plan → automated spec)

1. Read `testplan.md` scenario.
2. **Playwright MCP**: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type` on the live app.
3. Confirm locators and URLs from snapshots.
4. Map steps to POM methods in `poms/`.
5. Write or update `tests/*.spec.ts` with `test.step()` and scenario comments.
6. **Standard Playwright CLI**: `npm run test` (CI and local verification).

## What Playwright MCP is for

- Inspecting the app and exploring user flows
- Discovering stable locators (`data-testid`, roles)
- Supporting test generation and refactoring

## What runs in CI

`npx playwright test --project=chromium` — no MCP in GitHub Actions.
