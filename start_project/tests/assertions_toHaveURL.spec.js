import { test, expect } from '@playwright/test';

test('Test Assertions: toHaveURL, toBeVisible, toHaveTitle ', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  await page.locator('input[name="email"]').fill('koushik350@gmail.com');
  await page.locator('input[name="password"]').fill('Pass123$');
  await page.locator('input[value="Login"]').click();

  await expect(page).toHaveURL(/account/);
  await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
  await expect(page).toHaveTitle(/My Account/);
});

