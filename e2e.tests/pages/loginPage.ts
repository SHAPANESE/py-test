import { Page, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;

  readonly header: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly errorMessage: Locator;
  readonly loginButton: Locator;

  readonly appLogo: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly addToCartButton: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.getByText('Swag Labs', { exact: true });
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.errorMessage = page.locator('.error-message-container');
    this.loginButton = page.locator('[data-test="login-button"]');

    this.appLogo = page.locator('.app_logo');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.appLogo.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addFirstItemToCart() {
    await this.addToCartButton.click();
  }

  async getCartItemCount(): Promise<string | null> {
    return await this.shoppingCartBadge.textContent();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async isInventoryDisplayed(): Promise<boolean> {
    return await this.inventoryList.isVisible();
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

}
