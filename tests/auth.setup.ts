import { test as setup } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import { LoginPage } from './login/login.page';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

const config = {
  baseUrl: process.env.BASE_URL as string,
  username: process.env.LOGIN_STANDARD_USER as string,
  password: process.env.LOGIN_STANDARD_PASSWORD as string
};

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();

  await page.context().storageState({ path: authFile });
});
