import { test, expect } from '@playwright/test';
import { LoginPage } from '../login/login.page';    
import { AllItemsPage } from './all-items.page';    

test('1005 - Verify that user can add an item to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const allItemsPage = new AllItemsPage;

            

});
