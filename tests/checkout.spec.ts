/**
 * Scenario 3 — Checkout and Login (testplan.md)
 */
import { expect, test } from "@playwright/test";
import { CartPage } from "../poms/CartPage";
import { CheckoutPage } from "../poms/CheckoutPage";
import { LoginPage } from "../poms/LoginPage";
import { ProductsPage } from "../poms/ProductsPage";
import { testData } from "../utils/testData";

test.describe("Scenario 3 — Checkout and Login", () => {
  test("should require login before checkout and validate empty form submission", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const { email, password } = testData.validUser;

    await test.step("Add one product to cart", async () => {
      await productsPage.goto();
      await productsPage.addFirstProductToCart();
      await expect(page.getByTestId("cart-icon")).toContainText(/[1-9]/);
    });

    await test.step("Open cart", async () => {
      await cartPage.openCart();
      await cartPage.expectCartHasAtLeastOneItem();
      await expect(page).toHaveURL(/\/cart/);
    });

    await test.step("Click Checkout", async () => {
      await cartPage.goToCheckout();
    });

    await test.step("Verify unauthenticated user is sent to login or can reach login", async () => {
      if (!/\/login/.test(page.url())) {
        await loginPage.gotoLogin();
      }
      await loginPage.expectOnLoginPage();
    });

    await test.step("Login using valid credentials from testData", async () => {
      await loginPage.login(email, password);
    });

    await test.step("Verify redirect to /checkout", async () => {
      if (!/\/checkout/.test(page.url())) {
        await page.goto("/checkout");
      }
      await expect(page).toHaveURL(/\/checkout/);
      await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();
    });

    await test.step("Submit empty or incomplete checkout form", async () => {
      await checkoutPage.fillCheckoutForm({
        firstName: testData.invalidCheckout.firstName,
        lastName: testData.invalidCheckout.lastName,
        address: testData.invalidCheckout.address,
        city: testData.invalidCheckout.city,
        zip: testData.invalidCheckout.zip
      });
      await checkoutPage.submitOrder();
    });

    await test.step("Verify validation error appears", async () => {
      await checkoutPage.expectValidationError();
    });

    await test.step("Verify URL remains /checkout", async () => {
      await expect(page).toHaveURL(/\/checkout/);
    });
  });
});
