import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/inventory.html');  // This is the main landing page
    await use(page);
  }
});

export { expect } from '@playwright/test';