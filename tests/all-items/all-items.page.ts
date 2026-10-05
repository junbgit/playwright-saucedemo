import { type Page } from '@playwright/test';

export class AllItemsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addFirstItemToCart(): Promise<void> {
    await this.page.locator('[data-test^="add-to-cart-"]').first().click();
  }
}
