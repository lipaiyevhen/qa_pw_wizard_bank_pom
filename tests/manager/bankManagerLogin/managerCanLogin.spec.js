import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BankHomePage from '../../../src/pages/BankHomePage';
import BankManagerMainPage from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await expect(page).toHaveURL(/.*manager/);
  await expect(managerMainPage.addCustomerButton).toBeVisible();
  await expect(managerMainPage.openAccountButton).toBeVisible();
  await expect(managerMainPage.customersButton).toBeVisible();
});
