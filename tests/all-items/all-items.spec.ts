import { test, expect } from '@playwright/test';
import { LoginPage } from '../login/login.page';
import { AllItemsPage } from './all-items.page';

const config = {
  baseUrl: process.env.BASE_URL as string,
  username: process.env.LOGIN_STANDARD_USER as string,
  password: process.env.LOGIN_STANDARD_PASSWORD as string,
};

test('1008 - Verify that user can add an item to the cart', async ({ page }) => {
  const allItemsPage = new AllItemsPage(page);
  const loginPage = new LoginPage(page);

  await page.goto('/inventory.html');

  if (await page.getByRole('button', { name: 'Login' }).isVisible().catch(() => false)) {
    console.log("Yes");
    await loginPage.goto(config.baseUrl);
    await loginPage.enterUsername(config.username);
    await loginPage.enterPassword(config.password);
    await loginPage.clickLoginButton();
  }

  await expect(page).toHaveURL(/inventory\.html/);
  await allItemsPage.addFirstItemToCart();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
