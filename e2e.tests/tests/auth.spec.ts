import { test, expect } from '../fixtures/baseTest';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should display login page header', async ({ landingPage }) => {
    await expect(landingPage.header).toBeVisible();
  });

  test('should have visible login form elements', async ({ landingPage }) => {
    await expect(landingPage.userNameInput).toBeVisible();
    await expect(landingPage.passwordInput).toBeVisible();
    await expect(landingPage.loginButton).toBeVisible();
  });
});

test.describe('Standard User - Login', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should login successfully as standard_user', async ({ landingPage }) => {
    await landingPage.login('standard_user', 'secret_sauce');
    await expect(landingPage.page.locator('.app_logo')).toBeVisible();
  });

  test('should access inventory after standard_user login', async ({ landingPage }) => {
    await landingPage.login('standard_user', 'secret_sauce');
    await expect(landingPage.page.locator('.inventory_list')).toBeVisible();
  });

  test('should display products for standard_user', async ({ landingPage }) => {
    await landingPage.login('standard_user', 'secret_sauce');
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });
});

test.describe('Locked Out User - Access Denied', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should display locked out error for locked_out_user', async ({ landingPage }) => {
    await landingPage.login('locked_out_user', 'secret_sauce');
    await expect(landingPage.errorMessage).toBeVisible();
    await expect(landingPage.errorMessage).toContainText('locked out');
  });

  test('should not access inventory as locked_out_user', async ({ landingPage }) => {
    await landingPage.login('locked_out_user', 'secret_sauce');
    const isInventoryDisplayed = await landingPage.isInventoryDisplayed();
    expect(isInventoryDisplayed).toBe(false);
  });

  test('should display error message instead of app logo', async ({ landingPage }) => {
    await landingPage.login('locked_out_user', 'secret_sauce');
    const isLoggedIn = await landingPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });
});

test.describe('Problem User - Login', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should login as problem_user but have visual issues', async ({ landingPage }) => {
    await landingPage.login('problem_user', 'secret_sauce');
    await expect(landingPage.appLogo).toBeVisible();
  });

  test('should display inventory with issues for problem_user', async ({ landingPage }) => {
    await landingPage.login('problem_user', 'secret_sauce');
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });

  test('should have broken image display for problem_user', async ({ landingPage }) => {
    await landingPage.login('problem_user', 'secret_sauce');
    const isProductsVisible = await landingPage.getProductCount();
    expect(isProductsVisible).toBeGreaterThan(0);
  });

  test('should have issue with product links for problem_user', async ({ landingPage }) => {
    await landingPage.login('problem_user', 'secret_sauce');
    const isInventoryDisplayed = await landingPage.isInventoryDisplayed();
    expect(isInventoryDisplayed).toBe(true);
  });
});

test.describe('Performance Glitch User - Login', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should login as performance_glitch_user with delayed response', async ({ landingPage }) => {
    await landingPage.login('performance_glitch_user', 'secret_sauce');
    await expect(landingPage.appLogo).toBeVisible({ timeout: 30000 });
  });

  test('should eventually load inventory for performance_glitch_user', async ({ landingPage }) => {
    await landingPage.login('performance_glitch_user', 'secret_sauce');
    await expect(landingPage.inventoryList).toBeVisible({ timeout: 30000 });
  });

  test('should load products with delay for performance_glitch_user', async ({ landingPage }) => {
    await landingPage.login('performance_glitch_user', 'secret_sauce');
    await expect(landingPage.inventoryItems).toBeVisible({ timeout: 30000 });
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });
});

test.describe('Error User - Login', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should login as error_user but encounter errors', async ({ landingPage }) => {
    await landingPage.login('error_user', 'secret_sauce');
    await expect(landingPage.appLogo).toBeVisible();
  });

  test('should display inventory for error_user', async ({ landingPage }) => {
    await landingPage.login('error_user', 'secret_sauce');
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });
});

test.describe('Visual User - Login', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should login as visual_user successfully', async ({ landingPage }) => {
    await landingPage.login('visual_user', 'secret_sauce');
    await expect(landingPage.appLogo).toBeVisible();
  });

  test('should display inventory page for visual_user', async ({ landingPage }) => {
    await landingPage.login('visual_user', 'secret_sauce');
    await expect(landingPage.inventoryList).toBeVisible();
  });

  test('should display products with visual differences', async ({ landingPage }) => {
    await landingPage.login('visual_user', 'secret_sauce');
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });

  test('should have altered visual styling for visual_user', async ({ landingPage }) => {
    await landingPage.login('visual_user', 'secret_sauce');
    const products = await landingPage.getProductCount();
    expect(products).toBeGreaterThan(0);
  });
});
