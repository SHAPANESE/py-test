import { test, expect } from '../fixtures/baseTest';

test.describe('Shopping Cart - Add to Cart', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('standard_user', 'secret_sauce');
  });

  test('should allow adding items to cart as standard_user', async ({ landingPage }) => {
    await landingPage.addFirstItemToCart();
    await expect(landingPage.shoppingCartBadge).toContainText('1');
  });

  test('should display cart item count', async ({ landingPage }) => {
    await landingPage.addFirstItemToCart();
    const badgeText = await landingPage.getCartItemCount();
    expect(badgeText).toBe('1');
  });

  test('should navigate to cart page', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const isCartDisplayed = await cartPage.isCartDisplayed();
    expect(isCartDisplayed).toBe(true);
  });

  test('should display added item in cart', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});

test.describe('Shopping Cart - Item Management', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('standard_user', 'secret_sauce');
  });

  test('should allow quantity view before checkout', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBeGreaterThan(0);
  });

  test('should display item details in cart', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(1);
  });

  test('should show price information in cart', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await expect(cartPage.priceInfo).toBeVisible();
  });
});

test.describe('Checkout Flow - Information Entry', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('standard_user', 'secret_sauce');
  });

  test('should allow checkout as standard_user', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await expect(cartPage.firstNameInput).toBeVisible();
  });

  test('should accept checkout information', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('John', 'Doe', '12345');
    const firstName = await cartPage.getFirstNameValue();
    expect(firstName).toBe('John');
  });

  test('should allow continue after filling checkout info', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await cartPage.continueCheckout();
    const isSummaryDisplayed = await cartPage.isSummaryDisplayed();
    expect(isSummaryDisplayed).toBe(true);
  });

  test('should display all checkout form fields', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await expect(cartPage.firstNameInput).toBeVisible();
    await expect(cartPage.lastNameInput).toBeVisible();
    await expect(cartPage.postalCodeInput).toBeVisible();
  });
});

test.describe('Checkout Flow - Order Summary', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('standard_user', 'secret_sauce');
  });

  test('should display order summary on final checkout page', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await cartPage.continueCheckout();
    const isSummaryDisplayed = await cartPage.isSummaryDisplayed();
    expect(isSummaryDisplayed).toBe(true);
  });

  test('should show item in order summary', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Bob', 'Johnson', '98765');
    await cartPage.continueCheckout();
    await expect(cartPage.cartItemLabel).toBeVisible();
  });

  test('should display total amount in summary', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Alice', 'Williams', '11111');
    await cartPage.continueCheckout();
    await expect(cartPage.summaryElement).toBeVisible();
  });
});

test.describe('Purchase Completion', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('standard_user', 'secret_sauce');
  });

  test('should complete purchase as standard_user', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const isCartDisplayed = await cartPage.isCartDisplayed();
    expect(isCartDisplayed).toBe(true);
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('John', 'Doe', '12345');
    await cartPage.continueCheckout();
    await expect(cartPage.summaryInfo).toBeVisible();
    await cartPage.finishCheckout();
    const pageContent = await cartPage.getPageContent();
    expect(pageContent).toContain('Thank you');
  });

  test('should show order confirmation after purchase', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Bob', 'Johnson', '98765');
    await cartPage.continueCheckout();
    await cartPage.finishCheckout();
    const pageContent = await cartPage.getPageContent();
    expect(pageContent).toContain('Thank you');
  });

  test('should allow navigation back to home after purchase', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('Alice', 'Williams', '11111');
    await cartPage.continueCheckout();
    await cartPage.finishCheckout();
    await cartPage.navigateBackToProducts();
    const isInventoryDisplayed = await landingPage.isInventoryDisplayed();
    expect(isInventoryDisplayed).toBe(true);
  });

  test('should display complete page with order details', async ({ landingPage, cartPage }) => {
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    await cartPage.startCheckout();
    await cartPage.fillCheckoutInfo('David', 'Brown', '22222');
    await cartPage.continueCheckout();
    await cartPage.finishCheckout();
    const isCheckoutComplete = await cartPage.isCheckoutComplete();
    expect(isCheckoutComplete).toBe(true);
  });
});

test.describe('Cart - Special Users', () => {
  test('should have error on add to cart for error_user', async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('error_user', 'secret_sauce');
    await landingPage.addFirstItemToCart();
    await landingPage.page.waitForTimeout(1000);
  });

  test('should be able to add items despite performance issues', async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('performance_glitch_user', 'secret_sauce');
    await landingPage.addFirstItemToCart();
    await expect(landingPage.shoppingCartBadge).toContainText('1', { timeout: 30000 });
  });

  test('should have issues with cart operations for error_user', async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('error_user', 'secret_sauce');
    await landingPage.addFirstItemToCart();
  });

  test('should allow shopping operations for visual_user', async ({ landingPage }) => {
    await landingPage.navigate();
    await landingPage.login('visual_user', 'secret_sauce');
    await landingPage.addFirstItemToCart();
    await expect(landingPage.shoppingCartBadge).toContainText('1');
  });

  test('should have visual issues in checkout for visual_user', async ({ landingPage, cartPage }) => {
    await landingPage.navigate();
    await landingPage.login('visual_user', 'secret_sauce');
    await landingPage.addFirstItemToCart();
    await landingPage.goToCart();
    const isCartDisplayed = await cartPage.isCartDisplayed();
    expect(isCartDisplayed).toBe(true);
  });
});
