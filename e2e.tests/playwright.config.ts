import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const DEFAULT_BASE_URL = 'https://www.saucedemo.com/';

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: 2,
  workers: 4,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'html-report' }]
  ],

  timeout: 60000,

  use: {
    baseURL: process.env.BASE_URL || DEFAULT_BASE_URL,
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } }
  ],
});
