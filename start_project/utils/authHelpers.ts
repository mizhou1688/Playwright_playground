// utils/authHelpers.js
import { Page } from '@playwright/test';

export async function loginUser(page: Page, email: string, password: string) {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
  await page.locator("//a[@data-toggle='dropdown']//span[contains(.,'My account')]").hover();
  await page.locator("text=Login").click();
  await page.locator("input[name='email']").fill(email);
  await page.locator("input[name='password']").fill(password);
  await page.locator("input[value='Login']").click();
}

