# Playwright E2E Test Framework

A comprehensive end-to-end test suite for the Sauce Labs demo application using Playwright with TypeScript and Page Object Model (POM) pattern.

## Project Overview

This project contains automated E2E tests for the Sauce Labs demo application (`https://www.saucedemo.com/`). It uses Playwright as the testing framework and implements the Page Object Model pattern for maintainable and scalable test code.

## Features

- **Page Object Model (POM)** - Organized test structure for better maintainability
- **TypeScript Support** - Full type safety and better developer experience
- **Parallel Execution** - Tests run in parallel for faster execution
- **Multiple Browsers** - Tests run on Chromium and Firefox
- **HTML Reports** - Detailed test reports with screenshots and traces
- **CI/CD Integration** - GitHub Actions workflow for automated testing

## Prerequisites

- Node.js 20 or higher
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm ci
```

2. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### View test reports
```bash
npm run report
```

### Run specific test file
```bash
npx playwright test e2e.tests/tests/auth.spec.ts
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed --config=e2e.tests/playwright.config.ts
```

## Project Structure

```
.
├── e2e.tests/
│   ├── fixtures/
│   │   └── baseTest.ts              # Base test configuration with custom fixtures
│   ├── pages/
│   │   ├── loginPage.ts             # Login page objects
│   │   └── cartPage.ts              # Cart page objects
│   ├── tests/
│   │   ├── auth.spec.ts             # Authentication tests
│   │   └── cart.spec.ts             # Shopping cart tests
│   ├── utils/
│   │   ├── GlobalData.ts            # Global test data
│   │   └── TestUtils.ts             # Utility functions
│   ├── playwright.config.ts          # Playwright configuration
│   └── testdata.json                 # Test data
├── .github/workflows/
│   └── playwright.yml                # CI/CD workflow
└── README.md                          # This file
```

## Test Coverage

### Authentication Tests (`auth.spec.ts`)
- Login page visibility and elements
- Standard user login flow
- Locked out user access denial
- Problem user scenarios
- Performance glitch user handling
- Error user scenarios
- Visual user testing

### Shopping Cart Tests (`cart.spec.ts`)
- Add items to cart
- Remove items from cart
- Cart checkout flow
- Cart item validation


