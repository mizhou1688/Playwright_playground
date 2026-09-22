import { expect, test } from "@playwright/test";

test("Prompt alert", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on("dialog", async (alert) => {
        console.log(alert.message());
        await alert.accept("koushik");
    });

    // the 3rd “Click Me” button on the page
    await page.locator("button:has-text('Click Me')").nth(2).click();
    await expect(page.locator("#prompt-demo")).toContainText("'koushik'");
});
