# Before / after refactor

## Before (exploration-only)

- Ad-hoc locators in specs (`page.locator('div').nth(5)`)
- Flat tests without `test.step()`
- Mixed debug via CLI in Cursor sandbox (blank `about:blank` browser)

## After (this repo)

| Area | Change |
|------|--------|
| Structure | POMs in `poms/`, scenarios in `tests/` |
| Reporting | `test.step()` per test plan step |
| Discovery | Playwright MCP snapshots → stable `data-testid` locators |
| Docs | Context7 for current Playwright APIs |
| CI | Chromium-only, HTML report artifact |
| MCP config | `mcp.example.json` (no committed secrets) |

## Example locator improvement

**Before:** `page.getByText('$29.99', { exact: true })` (strict mode: 2 matches)

**After:** `page.getByTestId('product-detail-price')` and `cart-item-price` scoped to cart line
