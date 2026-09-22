import { test } from "@playwright/test";

test("Multi-select dropdown", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    
    await page.selectOption("#multi-select", [
        { label: "Texas" },
        { index: 2 },
        { value: "Washington" }
  ]);
});
