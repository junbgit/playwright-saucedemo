import { type Locator, type Page } from '@playwright/test';

export class AboutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get expectedUrl(): RegExp {
    return /saucelabs\.com/;
  }
}
