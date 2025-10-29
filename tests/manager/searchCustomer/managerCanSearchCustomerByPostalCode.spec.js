import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BankHomePage from '../../../src/pages/BankHomePage';
import AddCustomerPage from '../../../src/pages/manager/AddCustomerPage';
import CustomersListPage from '../../../src/pages/manager/CustomersListPage';

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

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const customersPage = new CustomersListPage(page);

  await customersPage.open();
  await customersPage.searchCustomer(postCode);
  await customersPage.verifyCustomerIsPresent(`${firstName} ${lastName}`);
});
