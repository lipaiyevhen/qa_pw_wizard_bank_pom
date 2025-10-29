import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true, // Змінено на true для швидкості
  workers: undefined,  // Видалено обмеження на кількість воркерів (за замовчуванням)
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.globalsqa.com/angularJs-protractor/BankingProject', // КРИТИЧНЕ ВИПРАВЛЕННЯ

    // testIdAttribute: 'id' можна видалити або залишити, якщо це ваш стандарт
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Рекомендується також додати webkit для повного покриття
  ],
});
