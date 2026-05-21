/**
 * Scenario 2 — Add to Cart (testplan.md)
 */
import { expect, test } from "@playwright/test";
import { CartPage } from "../poms/CartPage";
import { ProductsPage } from "../poms/ProductsPage";

test.describe("Scenario 2 — Add to Cart", () => {
  test("should add first product to cart from product detail page", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    let productName = "";
    let productPrice = "";

    await test.step("Navigate to /products (products list)", async () => {
      await productsPage.goto();
      await expect(page).toHaveURL(/\/products\/?$/);
    });

    await test.step("Verify product grid displays inventory", async () => {
      await productsPage.expectProductsVisible();
      await expect(page.getByText(/\d+\s+products?/i)).toBeVisible();

      const firstCard = page.locator('main a[href^="/products/p"]').first();
      await expect(firstCard).toBeVisible();
      productName = (await firstCard.getByRole("heading").innerText()).trim();
      productPrice = (await firstCard.locator("p").filter({ hasText: /\$/ }).innerText()).trim();
    });

    await test.step("Click the first product card to open product detail page", async () => {
      await productsPage.openFirstProductDetail();
      await expect(page).toHaveURL(/\/products\/[^/?#]+/);
    });

    await test.step("Verify product details load (name, price, description)", async () => {
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(productName);
      await expect(page.getByTestId("product-detail-price")).toHaveText(productPrice);
      await expect(page.getByTestId("product-detail-description")).toBeVisible();

      const addBtn = page
        .locator("main")
        .getByTestId("add-to-cart")
        .or(page.locator("main").getByRole("button", { name: /add to cart/i }));
      await expect(addBtn).toBeVisible();
    });

    await test.step("Click the Add to cart button", async () => {
      await productsPage.addFirstProductToCart();
      await expect(page.getByTestId("cart-icon")).toContainText(/[1-9]/);
    });

    await test.step("Navigate to /cart via header Cart link", async () => {
      await cartPage.openCart();
      await expect(page).toHaveURL(/\/cart/);
      await expect(page.getByRole("heading", { name: /shopping cart/i })).toBeVisible();
    });

    await test.step("Verify cart displays the added product with quantity and price", async () => {
      await cartPage.expectCartHasAtLeastOneItem();

      const cartLine = page.locator("main").filter({
        has: page.getByTestId("cart-item-name").filter({ hasText: productName })
      });
      await expect(cartLine.getByTestId("cart-item-name")).toHaveText(productName);
      await expect(cartLine.getByTestId("cart-item-price")).toHaveText(productPrice);
      await expect(cartLine.getByRole("button", { name: /^remove$/i })).toBeVisible();
      await expect(page.getByTestId("cart-icon")).toContainText(/[1-9]/);
    });
  });
});
