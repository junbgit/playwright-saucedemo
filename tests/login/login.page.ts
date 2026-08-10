import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly mainHamburger: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.mainHamburger = page.getByRole('button', { name: 'Open Menu' });
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async enterUsername(user: string) {
    await this.usernameInput.fill(user);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }  

  async clickLoginButton() {
    await this.loginButton.click();
  } 

  get expectedLandingUrl(): string {
    return 'https://www.saucedemo.com/inventory.html';
  }

  async clickMainHamburger() {
    await this.mainHamburger.click();    
  }

  async selectMainHamburgerOption(optionName: string): Promise<void> {
  
    if (optionName === 'All Items') {
      await this.page.getByRole('link', { name: optionName }).click();
    } else if (optionName === 'About') {
      await this.page.getByRole('link', { name: optionName }).click();
    } else if (optionName === 'Logout') {
      await this.page.getByRole('link', { name: optionName }).click();
    } else if (optionName === 'Reset App State') {
      await this.page.getByRole('link', { name: optionName }).click();      
    } else {
      console.warn('Warning: Menu option "$(optionName)" does not exist.' );
    }
  }
}

