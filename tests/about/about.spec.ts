import { test, expect } from '../fixtures';
import { LoginPage } from '../login/login.page';
import { AboutPage } from './about.page';

test('1003 - Navigate to About screen', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const aboutPage = new AboutPage(page);
  //await page.goto('/inventory.html');
  await loginPage.clickMainHamburger();
  await loginPage.selectMainHamburgerOption('About');

  await expect(page).toHaveURL(aboutPage.expectedUrl);
});

