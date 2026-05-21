# Prompts used (case study)

Examples that worked well in Cursor for this project:

## Exploration

- Execute Scenario 2 from testplan.md using Playwright MCP, then generate tests with test.step() and POMs.
- Run cart flow: navigate to /products, open first product, add to cart, open cart, verify line item.

## Documentation

- use context7: Playwright page object model best practices
- use context7: test.step reporting in HTML report

## Refactoring

- Move cart assertions into CartPage; keep checkout.spec.ts as orchestration only.
- Fix strict mode violation for product price on PDP (use product-detail-price test id).

## Rules

Project rules in `.cursor/rules/` enforce Playwright MCP for browser work and Context7 for library docs.
