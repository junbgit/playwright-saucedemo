import {test, expect } from '@playwright/test';
import path from 'path/win32';
import dotenv from 'dotenv';
import { LoginPage } from './login.page';

dotenv.config({ path: path.resolve(__dirname, '../.env') });  

const config = {
  baseUrl: process.env.BASE_URL as string,
  username: process.env.LOGIN_STANDARD_USER as string,
  password: process.env.LOGIN_STANDARD_PASSWORD as string
};

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL(loginPage.expectedLandingUrl);
});

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  //await expect(page).toHaveURL(loginPage.expectedLandingUrl);
  await loginPage.clickMainHamburger();
  await loginPage.selectMainHamburgerOption('Logout');
  await expect(page).toHaveURL(config.baseUrl);
});
