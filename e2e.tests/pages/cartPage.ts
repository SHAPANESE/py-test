import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly shoppingCartContainer: Locator;
  readonly cartItems: Locator;
  readonly cartItemLabel: Locator;
  readonly priceInfo: Locator;
  readonly checkoutButton: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly summaryInfo: Locator;
  readonly summaryElement: Locator;
  readonly finishButton: Locator;

  readonly completeContainer: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.shoppingCartContainer = page.locator('.shopping_cart_container');
    this.cartItems = page.locator('.cart_item');
    this.cartItemLabel = page.locator('.cart_item_label');
    this.priceInfo = page.locator('[class*="price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.summaryInfo = page.locator('.summary_info');
    this.summaryElement = page.locator('[class*="summary"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeContainer = page.locator('[class*="complete"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async isCartDisplayed(): Promise<boolean> {
    return await this.shoppingCartContainer.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async isPriceInfoVisible(): Promise<boolean> {
    return await this.priceInfo.isVisible();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zipCode);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async getPostalCodeValue(): Promise<string> {
    return await this.postalCodeInput.inputValue();
  }

  async areAllCheckoutFieldsVisible(): Promise<boolean> {
    const firstNameVisible = await this.firstNameInput.isVisible();
    const lastNameVisible = await this.lastNameInput.isVisible();
    const postalCodeVisible = await this.postalCodeInput.isVisible();
    return firstNameVisible && lastNameVisible && postalCodeVisible;
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async isSummaryDisplayed(): Promise<boolean> {
    return await this.summaryElement.isVisible();
  }

  async isSummaryInfoDisplayed(): Promise<boolean> {
    return await this.summaryInfo.isVisible();
  }

  async isSummaryItemVisible(): Promise<boolean> {
    return await this.cartItemLabel.isVisible();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.completeContainer.isVisible();
  }

  async getPageContent(): Promise<string | null> {
    return await this.page.textContent('body');
  }

  async navigateBackToProducts() {
    await this.backToProductsButton.click();
  }

  async completePurchase(firstName: string, lastName: string, zipCode: string) {
    await this.startCheckout();
    await this.fillCheckoutInfo(firstName, lastName, zipCode);
    await this.continueCheckout();
    await this.finishCheckout();
  }
}
