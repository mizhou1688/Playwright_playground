import { test, expect } from '@playwright/test';

test("Checkbox", async ({ page }) => {
    await page.goto("https://www.testmuai.com/selenium-playground/checkbox-demo/")
    let singleCheckbox = page.getByLabel('Click on check box');
    // singleCheckbox = page.getByRole('checkbox', {name: 'Click on check box'});
    await expect(singleCheckbox).not.toBeChecked();
    await singleCheckbox.check();
    await expect(singleCheckbox).toBeChecked();
})