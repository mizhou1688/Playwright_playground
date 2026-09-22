import { test } from "@playwright/test";

test("Single-select dropdown", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    
    await page.selectOption("#select-demo", {
        index: 5 // alternatively, use label: "Tuesday" or value: "Friday"
    });
});
