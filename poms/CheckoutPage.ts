import { expect, Locator, Page } from "@playwright/test";

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  zip: string;
  country?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
};

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly placeOrderButton: Locator;
  readonly validationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page
      .getByTestId("checkout-first-name")
      .or(page.locator("input[name='firstName'], input[placeholder*='First']"));
    this.lastNameInput = page
      .getByTestId("checkout-last-name")
      .or(page.locator("input[name='lastName'], input[placeholder*='Last']"));
    this.addressInput = page
      .getByTestId("checkout-address")
      .or(page.locator("input[name='address'], input[placeholder*='Address']"));
    this.cityInput = page
      .getByTestId("checkout-city")
      .or(page.locator("input[name='city'], input[placeholder*='City']"));
    this.zipInput = page
      .getByTestId("checkout-zip")
      .or(page.locator("input[name='zip'], input[placeholder*='Zip']"));
    this.placeOrderButton = page
      .getByTestId("place-order")
      .or(page.getByRole("button", { name: /place order|submit|pay/i }));
    this.validationMessage = page
      .getByTestId("checkout-validation-error")
      .or(page.locator(".error, .text-red-500, [role='alert']"));
  }

  async fillCheckoutForm(data: CheckoutFormData): Promise<void> {
    await this.firstNameInput.first().fill(data.firstName);
    await this.lastNameInput.first().fill(data.lastName);
    await this.addressInput.first().fill(data.address);
    await this.cityInput.first().fill(data.city);
    await this.zipInput.first().fill(data.zip);
  }

  async submitOrder(): Promise<void> {
    await this.placeOrderButton.first().click();
  }

  async expectValidationError(): Promise<void> {
    const generalError = this.page.getByText(/please fix the highlighted fields and try again/i);
    if (await generalError.first().isVisible().catch(() => false)) {
      await expect(generalError.first()).toBeVisible({ timeout: 7000 });
      return;
    }
    await expect(this.validationMessage.first()).toBeVisible({ timeout: 7000 });
  }
}
