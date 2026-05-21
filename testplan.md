# Swiftcart End-to-End Test Plan

**Target URL:** `https://swiftcart-sanaev-dev.lovable.app`  
**Framework:** Playwright + TypeScript (MCP-assisted workflow)  
**Page Classes:** `poms/`  
**Test Files:** `tests/`

---

## Scenario 1 — Search Functionality

**Goal:** Validate product search filters results by keyword.

**Steps:**
1. Navigate to `/` (homepage).
2. In the header search box (`Search products...`), enter search term (e.g., `charger`).
3. Click the `Search` button or press Enter.
4. Verify URL updates to `/products?q=charger`.
5. Verify product grid displays matching results.
6. Verify result counter and product cards are visible.

**Page Methods:** `ProductsPage.gotoHome()`, `expectProductsVisible()`

---

## Scenario 2 — Add to Cart

**Goal:** Validate adding a product to cart from product detail page.

**Steps:**
1. Navigate to `/products`.
2. Verify product grid displays inventory.
3. Open first product detail (`/products/<id>`).
4. Verify name, price, description.
5. Click `Add to cart`.
6. Open cart via header.
7. Verify line item and price.

**Page Methods:** `ProductsPage.goto()`, `openFirstProductDetail()`, `addFirstProductToCart()`, `CartPage.openCart()`

---

## Scenario 3 — Checkout and Login

**Goal:** Validate checkout with login and form validation.

**Steps:**
1. Add product to cart.
2. Open cart → Checkout.
3. Reach `/login` if required; login with demo credentials.
4. Reach `/checkout`.
5. Submit incomplete form → validation error; URL stays `/checkout`.

**Page Methods:** `CartPage.goToCheckout()`, `LoginPage.login()`, `CheckoutPage.fillCheckoutForm()`, `expectValidationError()`
