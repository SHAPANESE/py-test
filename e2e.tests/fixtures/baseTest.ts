import { test as baseTest, TestInfo } from '@playwright/test';
import { LandingPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { GlobalData } from '../utils/GlobalData';
import { TestUtils } from '../utils/TestUtils';

export type MyFixtures = {
  landingPage: LandingPage;
  cartPage: CartPage;
  globalData: GlobalData;
  utils: TestUtils;
  testInfo: TestInfo;
};

export const test = baseTest.extend<MyFixtures>({

  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  globalData: async ({ }, use) => {
    await use(GlobalData.getInstance());
  },

  utils: async ({ page }, use) => {
    await use(new TestUtils(page));
  },

  testInfo: [
    async ({}, use, testInfo) => {
      await use(testInfo);
    },
    { scope: 'test' }
  ]
});

export { expect } from '@playwright/test';

