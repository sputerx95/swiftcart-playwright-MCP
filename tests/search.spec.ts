/**
 * Scenario 1 — Search Functionality (testplan.md)
 */
import { expect, test } from "@playwright/test";
import { ProductsPage } from "../poms/ProductsPage";
import { testData } from "../utils/testData";

test.describe("Scenario 1 — Search Functionality", () => {
  test("should filter products by search keyword from homepage", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const query = testData.searchQuery;

    await test.step("Navigate to / (homepage)", async () => {
      await productsPage.gotoHome();
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('Enter search term in header search box ("Search products...")', async () => {
      await expect(productsPage.searchInput.first()).toBeVisible();
      await productsPage.searchInput.first().fill(query);
    });

    await test.step("Click Search or press Enter", async () => {
      await productsPage.searchInput.first().press("Enter");
    });

    await test.step(`Verify URL updates to /products?q=${query}`, async () => {
      await expect(page).toHaveURL(new RegExp(`/products\\?q=${query}`, "i"));
    });

    await test.step("Verify product grid displays matching results", async () => {
      await productsPage.expectProductsVisible();
      await expect(page.getByRole("heading", { name: /65W GaN Wall Charger/i })).toBeVisible();
      await expect(page.getByRole("heading", { name: /MagSafe Wireless Pad/i })).toBeVisible();
    });

    await test.step("Verify result counter and product cards are visible", async () => {
      await expect(productsPage.productCountText.first()).toBeVisible();
      await expect(page.getByText(/2\s+products?/i)).toBeVisible();
      const productLink = productsPage.productLink.filter({ visible: true }).first();
      await expect(productLink).toBeVisible();
    });
  });
});
