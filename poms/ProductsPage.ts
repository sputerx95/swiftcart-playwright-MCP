import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly filterDropdown: Locator;
  readonly categoryCheckbox: Locator;
  readonly productCard: Locator;
  readonly productLink: Locator;
  readonly productCountText: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page
      .getByTestId("search-input")
      .or(page.getByRole("searchbox"))
      .or(page.locator("input[placeholder*='Search']"));
    this.searchButton = page
      .getByTestId("search-submit")
      .or(page.getByRole("button", { name: /search/i }));
    this.filterDropdown = page
      .getByTestId("products-filter")
      .or(page.locator("select[data-testid='category-filter'], select"));
    this.categoryCheckbox = page
      .getByTestId("category-checkbox")
      .or(page.getByRole("checkbox"));
    this.productCard = page
      .getByTestId("product-card")
      .or(page.locator("[data-testid='product-item'], .product-card"));
    this.productLink = page
      .getByTestId("product-link")
      .or(page.locator('main a[href*="/products/"], [role="main"] a[href*="/products/"]'))
      .or(page.locator('a[href*="/products/"]'));
    this.productCountText = page
      .getByTestId("products-count")
      .or(page.getByText(/products?/i));
    this.addToCartButton = page
      .getByTestId("add-to-cart")
      .or(page.getByRole("button", { name: /add to cart/i }));
  }

  async dismissOverlays(): Promise<void> {
    const dismiss = this.page.getByRole("button", { name: /dismiss/i });
    if (await dismiss.isVisible().catch(() => false)) {
      await dismiss.click();
    }
  }

  async gotoHome(): Promise<void> {
    await this.page.goto("/");
    await this.dismissOverlays();
  }

  async goto(): Promise<void> {
    await this.page.goto("/products");
    await this.dismissOverlays();
  }

  async openFirstProductDetail(): Promise<void> {
    await this.dismissOverlays();
    const productDetailUrl = /\/products\/[^/?#]+/;
    if (productDetailUrl.test(this.page.url())) {
      return;
    }
    const listingLink = this.page.locator('main a[href^="/products/p"]').first();
    await expect(listingLink).toBeVisible({ timeout: 20_000 });
    await listingLink.click();
    await this.page.waitForURL(productDetailUrl, { timeout: 20_000 });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async addFirstProductToCart(): Promise<void> {
    await this.openFirstProductDetail();
    const addBtn = this.page
      .locator("main")
      .getByTestId("add-to-cart")
      .or(this.page.locator("main").getByRole("button", { name: /add to cart/i }));
    await expect(addBtn).toBeVisible({ timeout: 20_000 });
    await addBtn.click();
    await expect(this.page.getByTestId("cart-icon")).toContainText(/[1-9]/, { timeout: 10_000 });
  }

  async expectProductsVisible(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    if (/\/login/i.test(this.page.url())) {
      throw new Error("Landed on /login — check BASE_URL or guest access to /products.");
    }
    const card = this.productCard.filter({ visible: true }).first();
    const link = this.productLink.filter({ visible: true }).first();
    if (await card.isVisible().catch(() => false)) {
      await expect(card).toBeVisible();
      return;
    }
    await expect(link).toBeVisible();
  }
}
