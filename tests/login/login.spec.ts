import { test, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { URLS } from './../utils/constants';

const config = {
  baseUrl: process.env.BASE_URL as string,
  username: process.env.LOGIN_STANDARD_USER as string,
  lockeduser: process.env.LOGIN_LOCKED_OUT_USER as string,
  password: process.env.LOGIN_STANDARD_PASSWORD as string
};

// OPTION 1 - Encapsulated
test('1001 - Verify that standard user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL(loginPage.expectedLandingUrl); //OPTION1: I did this intentionally to show that the URL is hardcoded inside the POM. 
  //This way, you avoid duplication and if the URL changes, you only need to change it in the POM. However, the test requirement isn't 
  //clear. You have to open the POM to find out what is being verified. The other option is to hardcode the URL here which is
});

// OPTION 2 - Hardcoded
test('1002 - Verify that standard user can logout successfully OPTION 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  await loginPage.clickMainHamburger();
  await loginPage.selectMainHamburgerOption('Logout');
  await expect(page).toHaveURL('https://www.saucedemo.com'); //OPTION2: This is the other option where the URL is hardcoded here.
  //This clearly shows what the test requirement is, that the url is https://www.saucedemo.com.
});

// OPTION 3 - Centralized
test('1003 - Verify that standard user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  await expect(page).toHaveURL(URLS.landingPage); //OPTION3: This option stores all constants in a central area (utils\constants) 
  //It also shows you the url value by hovering over .landingPage
});

//
test('1004 - Verify that standard user can login successfully using authentication', async ({ page }) => {
  const loginPage = new LoginPage(page);  
  await page.goto('/inventory.html');
  await loginPage.clickMainHamburger();
  await loginPage.selectMainHamburgerOption('Logout');
   
});


test('1005 - Verify that locked out user is not able to login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const expectedError = 'Epic sadface: Sorry, this user has been locked out.'
  await loginPage.goto(config.baseUrl);
  await loginPage.enterUsername(config.lockeduser);
  await loginPage.enterPassword(config.password);
  await loginPage.clickLoginButton();
  await expect(loginPage.lockedOutLoginMessage).toContainText(expectedError);
});


