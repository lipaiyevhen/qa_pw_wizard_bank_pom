import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BankHomePage from '../../../src/pages/BankHomePage';
import AddCustomerPage from '../../../src/pages/manager/AddCustomerPage';
import CustomersListPage from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode('#####');

  const bankHomePage = new BankHomePage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersListPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await addCustomerPage.open();
  // attach dialog handler BEFORE action in test
  page.once('dialog', dialog => dialog.accept());
  await addCustomerPage.addCustomer(firstName, lastName, postCode);

  // ensure list is updated
  await page.reload();
  await customersPage.open();
  await customersPage.searchCustomer(firstName);
  await customersPage.verifyCustomerIsPresent(`${firstName} ${lastName}`);
});
