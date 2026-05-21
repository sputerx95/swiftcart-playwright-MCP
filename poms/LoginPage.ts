import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page
      .getByTestId("login-email")
      .or(page.locator('input[type="email"], input[name="email"]'));
    this.passwordInput = page
      .getByTestId("login-password")
      .or(page.locator('input[type="password"], input[name="password"]'));
    this.loginButton = page
      .getByTestId("login-submit")
      .or(page.getByRole("button", { name: /log in|login|sign in/i }));
  }

  async gotoLogin(): Promise<void> {
    await this.page.goto("/login");
    await this.dismissOverlays();
  }

  async dismissOverlays(): Promise<void> {
    const dismiss = this.page.getByRole("button", { name: /dismiss/i });
    if (await dismiss.isVisible().catch(() => false)) {
      await dismiss.click();
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.first().fill(email);
    await this.passwordInput.first().fill(password);
    await this.loginButton.first().click();
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.emailInput.first()).toBeVisible();
    await expect(this.passwordInput.first()).toBeVisible();
  }
}
