import { test } from "@playwright/test";
test("Handle tabs in Playwright", async ({ page }) => {
    // Navigate to the demo page
    await page.goto("https://www.testmuai.com/selenium-playground/window-popup-modal-demo");
    console.log("Main page URL: " + page.url());
    // Click the "Follow On Twitter" link and wait for new tab
    const [newWindow] = await Promise.all([    
        page.waitForEvent("popup"),    
        page.locator("a[title='Follow Twitter & Facebook']").click()]);

    // Log the URL of the new tab
    console.log("New tab URL: " + newWindow.url());
});
