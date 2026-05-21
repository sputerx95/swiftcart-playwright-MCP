import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartItem: Locator;
  readonly proceedToCheckoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId("cart-icon");
    this.cartItem = page
      .getByTestId("cart-item")
      .or(page.locator("main").getByRole("button", { name: /^remove$/i }));
    this.proceedToCheckoutLink = page.getByRole("link", { name: /proceed to checkout/i });
  }

  async dismissOverlays(): Promise<void> {
    const dismiss = this.page.getByRole("button", { name: /dismiss/i });
    if (await dismiss.isVisible().catch(() => false)) {
      await dismiss.click();
    }
  }

  async openCart(): Promise<void> {
    await this.dismissOverlays();
    await this.cartIcon.click();
    await this.page.waitForURL(/\/cart/, { timeout: 15_000 });
    await expect(this.page.getByRole("heading", { name: /shopping cart/i })).toBeVisible();
  }

  async expectCartHasAtLeastOneItem(): Promise<void> {
    const removeButton = this.page.locator("main").getByRole("button", { name: /^remove$/i }).first();
    if (await removeButton.isVisible().catch(() => false)) {
      await expect(removeButton).toBeVisible({ timeout: 10_000 });
      return;
    }
    await expect(this.cartItem.first()).toBeVisible({ timeout: 10_000 });
  }

  async goToCheckout(): Promise<void> {
    await this.dismissOverlays();
    const proceed = this.proceedToCheckoutLink;
    if (await proceed.isVisible().catch(() => false)) {
      await proceed.click();
      return;
    }
    await this.page.goto("/checkout");
  }
}
