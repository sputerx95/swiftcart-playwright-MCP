# SwiftCart Playwright MCP-Assisted Automation

**AI-assisted QA case study** for [Swiftcart](https://swiftcart-sanaev-dev.lovable.app) using **Cursor**, **Playwright MCP**, and **Context7 MCP**.

> **Related repo:** [swiftcart-automation](https://github.com/sputerx95/swiftcart-automation) — main Playwright TypeScript E2E framework (multi-browser, full suite).  
> **This repo** — focused on the **modern MCP-assisted workflow** (explore → POM → spec → CI).

---

## Positioning

| Tool | Role |
|------|------|
| **Playwright MCP** | Inspect the app, explore user flows, discover locators, support test generation/refactoring |
| **Context7 MCP** | Up-to-date Playwright documentation inside Cursor |
| **Playwright CLI** | Final test execution (`npm run test`) |
| **GitHub Actions** | Runs `npx playwright test --project=chromium` on push/PR |

---

## Test coverage

| Scenario | Spec | Flow |
|----------|------|------|
| **Search** | `tests/search.spec.ts` | Homepage search → filtered `/products?q=charger` |
| **Add to cart** | `tests/cart.spec.ts` | Products → PDP → add to cart → cart verification |
| **Checkout / login** | `tests/checkout.spec.ts` | Cart → login → checkout → empty form validation |

Aligned with `testplan.md`.

---

## Project structure

```text
swiftcart-playwright-mcp/
├── tests/              # Scenario specs (test.step + comments)
├── poms/               # Page Object Model
├── utils/testData.ts
├── docs/               # MCP workflow, Context7, local Cursor setup template
├── screenshots/        # Add report/UI captures for README
├── .github/workflows/playwright.yml
└── testplan.md
```

---

## MCP setup (local only — not pushed to GitHub)

The `.cursor/` folder stays on your machine only (see `.gitignore`).

Setup: [docs/cursor-local-setup.md](docs/cursor-local-setup.md)  
Workflow: [docs/mcp-workflow.md](docs/mcp-workflow.md) · Context7: [docs/context7-usage.md](docs/context7-usage.md)

---

## Commands

```bash
npm install
npx playwright install
npm run test
npm run test:headed
npm run test:ui
npm run report
```

**macOS Terminal** (if Cursor injects a broken browser path):

```bash
env -u PLAYWRIGHT_BROWSERS_PATH npm run test
```

---

## Target application

Default `baseURL`: `https://swiftcart-sanaev-dev.lovable.app`

```bash
export BASE_URL="https://your-deploy.example.com"
npm run test
```

Demo login (public): `demo@swiftcart.com` / `password123`

---

## CI

GitHub Actions (`.github/workflows/playwright.yml`):

- Triggers on `push` and `pull_request`
- `npm ci` → install Chromium → `npx playwright test --project=chromium`
- Uploads `playwright-report` artifact

---

## Documentation

- [MCP workflow](docs/mcp-workflow.md)
- [Context7 usage](docs/context7-usage.md)
- [Prompts used](docs/prompts-used.md)
- [Before / after refactor](docs/before-after-refactor.md)
- [Lessons learned](docs/lessons-learned.md)
- [Cursor local setup](docs/cursor-local-setup.md) (template only — `.cursor/` not in repo)

---

## Author

**Muhammad Sanaev** — QA Automation Engineer  
[GitHub](https://github.com/sputerx95) · [LinkedIn](https://www.linkedin.com/in/muhammadjonsanaev)
