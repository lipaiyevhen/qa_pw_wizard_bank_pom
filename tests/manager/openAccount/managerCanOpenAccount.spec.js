import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BankHomePage from '../../../src/pages/BankHomePage';
import AddCustomerPage from '../../../src/pages/manager/AddCustomerPage';
import OpenAccountPage from '../../../src/pages/manager/OpenAccountPage';

let firstName, lastName, postCode;

test.beforeEach(async ({ page }) => {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode('#####');

  const bankHomePage = new BankHomePage(page);
  const addCustomerPage = new AddCustomerPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await addCustomerPage.open();
  page.once('dialog', dialog => dialog.accept());
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
  await page.reload();
});

test('Assert manager can open account for new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  // select the newly added customer (select by label)
  const options = await openAccountPage.customerDropdown.locator('option').allTextContents();
  const last = options[options.length - 1];
  await openAccountPage.selectCustomer(last);
  await openAccountPage.selectCurrency('Dollar');
  page.once('dialog', dialog => dialog.accept());
  await openAccountPage.clickProcess();
});
