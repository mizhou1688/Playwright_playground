import { test } from "@playwright/test";
import { chromium } from "@playwright/test";

test("Handle windows with load state", async ({  }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.testmuai.com/selenium-playground/window-popup-modal-demo/");
    // Waits until the button passes all actionability checks
    await page.locator("a[title='Follow Twitter & Facebook']").click({ trial: true });
    const [multiPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator("a[title='Follow Twitter & Facebook']").scrollIntoViewIfNeeded(),
        page.locator("a[title='Follow Twitter & Facebook']").click()
    ])
    await multiPage.waitForLoadState();

    const pages = multiPage.context().pages();
    console.log('No.of tabs: ' + pages.length);

    // Print URL of each open tab
    pages.forEach(tab => console.log(tab.url()));

    /*
    // Identify the Facebook page
    let facebookPage;
    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url();
        if (url === "https://www.facebook.com/testmuai/") {
            facebookPage = pages[index];
        }
    }

    // Extract text from the Facebook page
    //const text = await facebookPage?.textContent("//h1");
    const text = await facebookPage?.locator("xpath=//h1").textContent()
  */

    // Identify the Facebook page
    const facebookPage = pages.find((p) => p.url().includes('facebook.com/testmuai'));
    const text = facebookPage ? await facebookPage.locator('h1').textContent() : null;
    console.log(text);
    await page.waitForTimeout(3000);

});
