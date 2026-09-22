import { test } from '@playwright/test';
import { loginUser } from '../utils/authHelpers';

test('Login test using utility function', async ({ page }) => {
  await loginUser(page, 'koushik350@gmail.com', 'Pass123$');
  await page.waitForSelector('#account-account');
});
